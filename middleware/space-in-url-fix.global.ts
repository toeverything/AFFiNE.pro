export default defineNuxtRouteMiddleware((to) => {
  if (to.fullPath.includes("+"))
    to.fullPath = to.fullPath.replace(/\+/g, "%20");
});
