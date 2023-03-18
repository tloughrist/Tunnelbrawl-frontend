import { createConsumer } from "@rails/actioncable"

function createSocket(gameId) {
  let cable = createConsumer('ws://localhost:3000/cable');
  const gameConnection = cable.subscriptions.create({
    channel: 'GameChannel',
    id: gameId
  }, {
    connected: () => {
      console.log("Connected to the channel:");
    },
    disconnected: () => {
      console.log("Disconnected");
    },
    received: async (data) => {
      console.log("Received some data:");
      console.log(typeof data)
      console.log(data)
    }
  });
};

export default createSocket