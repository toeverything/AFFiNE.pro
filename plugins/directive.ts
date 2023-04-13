import { DirectiveBinding, VNode } from "vue"

export default defineNuxtPlugin((nuxtApp) => {
  const { isMobile } = useDevice()
  const store = useStore()

  const clickInterceptHandler = (e: Event) => {
    if (isMobile) {
      e.preventDefault()
      store.ui.isShowMobileInterceptModal = true
    }
  }

  nuxtApp.vueApp.directive('mobile-intercept', {
    mounted (el: HTMLElement, binding: DirectiveBinding, vnode: VNode) {
      el.addEventListener('click', clickInterceptHandler)
    },
    unmounted (el: HTMLElement) {
      el.removeEventListener('click', clickInterceptHandler)
    }
  })
})
