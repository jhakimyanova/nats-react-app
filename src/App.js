import { useState, useEffect } from 'react'
import { connect, StringCodec} from 'nats.ws'
import Messages from './Messages';

const sc = StringCodec();

function App() {
  const [nc, setConnection] = useState(undefined);
  const [lastError, setError] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (nc === undefined) {
      try {
        (async () => {
          const nc = await connect({ servers: "ws://127.0.0.1:9090" });
          setConnection(nc);
          const sub = nc.subscribe(">");
          let key = 0;
          for await (const msg of sub) {
            key++;
            const { subject, reply } = msg
            const data = sc.decode(msg.data)
            const m = { subject, reply, data, key, time: new Date().toUTCString() }
            messages.unshift(m)
            const a = messages.slice(0, 10)
            setMessages(a)
            console.log(subject, messages)
          }
        })();
      } catch (err) {
          setError("error connecting")
          console.error(err)
      }
    }
  }, [nc, messages]);
    

  const state = nc ? "connected" : "not yet connected";
  return (
    <div className="App">
      <h1 className="header">{state}</h1>
      <h3>{lastError ? lastError : ""}</h3>
      {messages.length > 0 && lastError === '' ?
        <Messages messages={messages} />
        : ("No messages")
      }
    </div>
  );
}

export default App;
