export default defineNuxtRouteMiddleware((to) => {
  const { loggedIn } = useUserSession();

  if (!loggedIn.value && to.name !== "auth") {
    return navigateTo({ name: "auth" });
  }
});
