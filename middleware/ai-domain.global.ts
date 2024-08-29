export default defineNuxtRouteMiddleware((to, from) => {
  const nuxtApp = useNuxtApp();
  let host = '';
  if (process.server) {
    host = nuxtApp.ssrContext?.event.node.req.headers.host || '';
  } else {
    host = window.location.host;
  }
  if (host.includes('ai.affine.pro')) {
    navigateTo(`https://affine.pro/ai`, {
      external: true,
    });
  }
});
