export default defineNuxtPlugin(() => {

  const mixpanel = useMixpanel()

  addRouteMiddleware('track-pageview', () => {
    try {
      mixpanel.track_pageview()
    } catch (error) {}
  }, { global: true })
})
