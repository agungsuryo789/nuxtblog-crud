export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore();

  if (authStore.isAuthenticated && to.path === "/login") {
    return navigateTo(from.path !== "/login" ? from.path : "/");
  }
});
