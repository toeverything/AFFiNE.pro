export default defineNuxtRouteMiddleware((to, from) => {
  const store = useStore()

  store.context.lastPath = from.path

  if (to.fullPath.includes("+"))
    to.fullPath = to.fullPath.replace(/\+/g, "%20");
});
