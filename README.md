# Description

This is a simple demo project showing how to use NATS WebSockets with React.

Start NATS server:

`nats-server -c server.conf`

To send messages to React UI install NATS command line utility:

`brew tap nats-io/nats-tools`

`brew install nats-io/nats-tools/nats`

Then you can send messages with the following command:

`nats pub [subject] [msg]`

Ex: 

`nats pub Chat1 Hello1`

React UI will show 10 last messages on the screen.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
