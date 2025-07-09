export default defineNuxtRouteMiddleware((to) => {
  const { loggedIn } = useUserSession();

  if (!loggedIn.value && to.name !== "auth" && to.meta.auth !== false) {
    return navigateTo({ name: "auth" });
  }
});
