export default defineOAuthGitHubEventHandler({
  async onSuccess(event, { user }) {
    await setUserSession(event, {
      user: {
        githubId: user.id,
      },
    });
    return sendRedirect(event, "/");
  },
});
