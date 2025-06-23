export default defineWebSocketHandler({
  open(peer) {
    // We subscribe to the 'visitors' channel
    peer.subscribe("visitors");
    // We publish the number of connected users to the 'visitors' channel
    peer.publish("visitors", peer.peers.size);
    // We send the number of connected users to the client
    peer.send(peer.peers.size);
  },
  close(peer) {
    peer.unsubscribe("visitors");
    // Wait 500ms before sending the updated locations to the server
    setTimeout(() => {
      peer.publish("visitors", peer.peers.size);
    }, 500);
  },
});
