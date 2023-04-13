<template lang="pug">
.overview-live-demo(
  ref="el"
  :class="[ `mode-${mode}` ]"
  :style="{ '--scale': scale }"
)
  .onboarding
    svg-icon-drawing( :isShow="onboardingDrawing.isShowCircle" )
      nuxt-icon.onboarding-circle.icon-stroke-gradient(
        ref="onboardingCircle"
        filled name="onboarding-circle"
      )
    svg-icon-drawing( :isShow="onboardState.isShowLeftArrow" )
      nuxt-icon.onboarding-left-arrow.icon-stroke-gradient(
        filled name="onboarding-left-arrow"
      )
    svg-icon-drawing( :isShow="onboardState.isShowTopArrow" duration="0.5s" )
      nuxt-icon.onboarding-top-arrow.icon-stroke-gradient(
        filled name="onboarding-top-arrow"
      )
  client-only
    .demo-tab-bar.flex.gap-30px
      .tab-handler( :class="{ 'is-active': mode === 'page' }" @click="() => mode = 'page'" )
        lottie-hover-icon(
          animationLink="/lottie-files/page-hover.json"
        )
      .tab-handler( :class="{ 'is-active': mode === 'edgeless' }" @click="() => mode = 'edgeless'" )
        lottie-hover-icon(
          animationLink="/lottie-files/edgeless-hover.json"
        )
  .demo-sidebar
  .demo-content
    .demo-bg
    hover-spotlight-card.demo-content-welcome-card.border-card(
      :lightSize="params.lightSize"
      :enableHover="mode === 'edgeless'"
    )
      .demo-content-welcome
    hover-spotlight-card.demo-content-checklist-card.border-card(
      :lightSize="params.lightSize"
      :enableHover="mode === 'edgeless'"
    )
      .demo-content-checklist
    .demo-content-logo-wrapper(
    )
      .demo-content-logo(
        ref="contentLogo"
        :style="contentLogoVarStyle"
      )
        .image-label
          nuxt-icon( name="Image" )
        .logo-image
  .demo-mode-button(
    @click="toggleMode"
  ) {{ mode === 'page' ? $t('overviewPage.pageMode') : $t('overviewPage.edgelessMode') }}

t-pane( title="Overview" )
  t-folder( title="Live Demo" )
    t-input( v-model="params.lightSize" name="hoverLightSize" :opt-params="{min: 10, max: 1000}" )
    t-input( v-model="params.rotateFactor" name="logoRotateFactor" :opt-params="{min: 1, max: 100}" )
    //- t-input( v-model="params.iconLottieSpeed" name="iconLottieSpeed" :opt-params="{min: 1, max: 10}" )

</template>

<script setup lang="ts">
import { gsap } from 'gsap'
import { useMouseInElement, useResizeObserver, useScroll } from '@vueuse/core'

type DemoMode = 'page' | 'edgeless'

const { isMobile } = useDevice()
const el = ref(null)
const contentLogo = ref(null)
const onboardingCircle = ref(null)
const BASE_WIDTH = 1147
const mode = ref<DemoMode>('page')
const scale = ref(1)
const onboardState = reactive({
  isShowLeftArrow: false,
  isShowTopArrow: false
})
const scrollState = reactive({
  y: 0
})
const params = reactive({
  iconLottieSpeed: 4,
  lightSize: 400,
  rotateFactor: 35,
})
const onboardingDrawing = reactive({
  isShowCircle: false
})

const toggleMode = () => {
  mode.value = mode.value === 'page' ? 'edgeless' : 'page'
}

const contentLogoMouse = useMouseInElement(contentLogo, { handleOutside: false })
const contentLogoVarStyle = computed(() => {
  const x = contentLogoMouse.elementX.value - contentLogoMouse.elementWidth.value / 2
  const y = contentLogoMouse.elementY.value - contentLogoMouse.elementHeight.value / 2
  const mousePX = x / contentLogoMouse.elementWidth.value
  const mousePY = y / contentLogoMouse.elementHeight.value
  const rx = mousePX * params.rotateFactor
  const ry = mousePY * params.rotateFactor

  return {
    transform: (contentLogoMouse.isOutside.value || mode.value === 'page') ? null : `rotateY(${rx}deg) rotateX(${ry}deg)`
  }
})

const setupOnboardTimeline = () => {
  const tl = gsap.timeline({ paused: true })

  tl
    .to(onboardState, { delay: 0.3, duration: 0.1, onComplete: () => {
      onboardState.isShowLeftArrow = true
    }})
    .to(onboardState, { delay: 1.3, duration: 0.1, onComplete: () => {
      onboardState.isShowTopArrow = true
    }})

  watch(mode, () => {
    if (mode.value === 'edgeless') {
      tl.play(0)
    } else {
      tl.pause()
      onboardState.isShowLeftArrow = false
      onboardState.isShowTopArrow = false
    }
  })
}

const setupScrollTrigger = () => {
  const startViewport = isMobile ? 400 : Math.min(500, window.innerHeight / 2)
  gsap.to(onboardingCircle.value, {
    scrollTrigger: {
      start: `top ${startViewport}`,
      end: "bottom center",
      trigger: '.onboarding',
      onEnter: () => {
        onboardingDrawing.isShowCircle = scrollState.y > 0 && true
      },
      onEnterBack: () => {
        onboardingDrawing.isShowCircle = true
      },
      onLeave: () => {
        // onboardingDrawing.isShowCircle = false
      }
    }
  })
}

const listenToScroll = () => {
  const { y } = useScroll(document)
  watch(y, () => {
    scrollState.y = y.value
    if (scrollState.y < 40) {
      onboardingDrawing.isShowCircle = false
    }
  })
}

useResizeObserver(el, (entries) => {
  const entry = entries[0]
  const { width } = entry.contentRect
  scale.value = Math.min(1, width/BASE_WIDTH)
})

onMounted(() => {
  setupOnboardTimeline()
  setupScrollTrigger()
  listenToScroll()
})
</script>

<style lang="stylus">
gradient-border()
  border: solid 2px transparent;
  background-image: linear-gradient(var(--secondary), var(--secondary)), var(--brand-gradient);
  background-origin: border-box;
  background-clip: padding-box, border-box;
  overflow: hidden

.overview-live-demo
  position relative
  width: 100%
  aspect-ratio: 1147/854
  background: #FFFFFF
  border: 1px solid rgba(255, 255, 255, 0.1)
  box-shadow: 0px 1px 45px rgba(51, 51, 51, 0.25)
  border-radius: 20px
  --cross-color: rgba(0, 0, 0, 0.08);
  --path-color: var(--primary-gray)
  $baseWidth = 1147

  .onboarding
    position absolute
    z-index: 233
    width: 1147px
    height: 850px
    pointer-events: none
    transform: scale(var(--scale)) translate3d(-50%, -50%, 0)
    transform-origin: left top
    left: 50%
    top: 50%

  .onboarding-circle
    position absolute
    font-size: 215px
    left: 49%
    top: -120px
    transform: translateX(-50%)

  .onboarding-left-arrow
    position absolute
    font-size: 291px
    transform: translate3d(450px, 460px, 0)

  .onboarding-top-arrow
    position absolute
    font-size: 206px
    top: 200px
    right: 110px

  .border-card
    display: inline-flex
    border-radius: 20px
    border: solid 2px transparent
    transition: 318ms
    background-image: linear-gradient(var(--secondary), var(--secondary)), linear-gradient(var(--secondary), var(--secondary));
    background-origin: border-box;
    background-clip: padding-box, border-box;

  /html.dark &
    --cross-color: rgba(255, 255, 255, 0.08);
    --secondary: #0E0E0E;
    --path-color: white
    background: #0E0E0E;
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0px 1px 45px rgba(51, 51, 51, 0.25);

  .demo-sidebar
    position absolute
    top: 50%
    left: percentage(-66/$baseWidth)
    width: percentage(293/$baseWidth)
    aspect-ratio: 293/750
    background-image: url(@/assets/overview/demo-sidebar.png)
    background-size: contain
    transform: translateY(-50%)
    transition: 318ms

    /html.dark &
      background-image: url(@/assets/overview/demo-sidebar-dark.png)

  .demo-tab-bar
    position absolute
    padding: 10px 15px;
    background: #F4F4F4;
    border: 1px solid #E7E7E7;
    box-shadow: 0px 1px 45px rgba(88, 88, 88, 0.25);
    border-radius: 30px;
    left: 50%
    transform: translate3D(-50%, -50%, 0) scale(var(--scale))
    z-index 2

    /html.dark &
      background: #0A0A0A;
      border: 1px solid #303030;
      box-shadow: 0px 1px 45px rgba(88, 88, 88, 0.25);

    .tab-handler
      display: flex
      justify-content: center
      align-items: center
      padding: 0
      border-radius: 20px;
      width: 60px
      height: 60px
      font-size: 50px
      transition: 218ms
      transition-property: background, color
      cursor pointer

      path
        fill: var(--path-color) !important

      &:not(.is-active):hover
        // background: $primary07;

      &.is-active
        background: #FFFFFF;
        --path-color var(--primary)

      /html.dark &
        &.is-active
          background: #2F2F2F;

          &:last-child
            --path-color var(--brand)

    .nuxt-icon *
      stroke: currentColor !important;

  .demo-content
    transform: scale(var(--scale))
    transform-origin: left top
    padding-top: 79px
    padding-left: 385px
    position absolute

  .demo-bg
    position absolute
    width: 1036px
    height: 807px;
    left: 55px;
    top: 24px;
    background-image: url(@/assets/overview/demo-content-bg.svg)
    background-size: 37px
    z-index: -1
    opacity: 0
    transition: 218ms

    /html.dark &
      background-image: url(@/assets/overview/demo-content-bg-dark.svg)

  .demo-content-welcome
    width: 559px
    height: 386px
    background-image: url(@/assets/overview/demo-content-welcome.png)
    background-size: contain

    /html.dark &
      background-image: url(@/assets/overview/demo-content-welcome-dark.png)

  .demo-content-checklist
    width: 199px
    height: 124.64px
    background-image: url(@/assets/overview/demo-content-checklist.png)
    background-size: contain

    &-card
      transition-delay: 50ms

    /html.dark &
      background-image: url(@/assets/overview/demo-content-checklist-dark.png)

  .demo-content-logo
    position relative
    background: #EEEEEE;
    border-radius: 11px;
    width: 100%
    height: 100%
    display: flex
    justify-content: center
    align-items: center
    transition: 318ms
    transition-delay: 100ms

    &-wrapper
      transition: 318ms
      transition-delay: 100ms
      color: #d7d7d7
      width: 575.45px;
      height: 135.55px;

    .image-label
      position absolute
      background: currentColor
      border-radius: 0px 15px;
      font-size: 24px
      width: 36px;
      height: 37px;
      padding: 6px
      left: -2px
      bottom: -2px
      display none
      justify-content: center
      align-items: center

      .nuxt-icon
        color: var(--primary) !important;

    .logo-image
      width: 145.45px;
      height: 32px;
      background-image: url(@/assets/overview/demo-content-logo.png)
      background-size: contain
      background-repeat: no-repeat

    /html.dark &
      background: #0C0C0C;

      .logo-image
        background-image: url(@/assets/overview/demo-content-logo-dark.png)

  .demo-mode-button
    position absolute
    background: var(--brand-gradient)
    padding: 18px 28px
    left: 50%
    bottom: 0
    color: white
    border-radius: 53px
    font-weight: 800
    font-size: 20px
    line-height: 24px
    transform: translate3D(-50%, 50%, 0) scale(var(--scale))
    transition-property: background, color
    cursor pointer
    white-space: pre

    &:hover
      opacity: 0.9

    &:active
      bottom: -1px

  // Case: Different content style
  &.mode-edgeless

    .demo-bg
      opacity: 1

    .demo-content-welcome-card
      transform: translate3d(-420px, 71px, 0)
      gradient-border()
      .demo-content-welcome
        height: 416px
        /html.dark &
          background-color: #2F2F2F

    .demo-content-checklist-card
      transform: translate3d(320px, -50px, 0)
      gradient-border()

      .demo-content-checklist
        /html.dark &
          background-color: #2F2F2F

    .demo-content-logo

      &-wrapper
        transform: translate3d(430px, -565px, 0) perspective(800px)
        transform-style: preserve-3d
        width: 219.79px;
        height: 135.55px;

      border: 3px solid currentColor;

      &:hover
        transition: transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)

      .image-label
        display: flex

      /html.dark &
        color: #8B8B8B

  // VFX: Switch Mode Transition
  // @TODO: try to use Gsap Flip to handle the case
  &.mode-edgeless
    .demo-sidebar
      opacity: 0
      transform: translateY(-50%) translateX(-100%)

</style>
