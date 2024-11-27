export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore();

  if (authStore.isAuth && to.path === "/login") {
    return navigateTo(from.path || "/");
  }
});
