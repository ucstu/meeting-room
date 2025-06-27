export default defineWebSocketHandler({
  async upgrade(request) {
    await requireUserSession(request);
  },
  async open(peer) {
    const { user } = await requireUserSession(peer);
    console.log(`WebSocket connection opened for user: ${user}`);
  },
});
