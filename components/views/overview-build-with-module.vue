<template lang="pug">
.scroll-trigger-container.overview-build-with-module(
  ref="el"
  :height="`${params?.triggerHeight}vh`"
  :class="{ 'enable-hover': scrollProgress >= 0.7 }"
  :style="scrollStyle"
)
  .pin-content(
    ref="pinContent"
  )
    .content-block.flex.flex-col.items-center
      .local-title {{ $t('overviewPage.buildWithDetailTitle') }}
      .module-list.flex.justify-between
        .module-card.module-blocksuite
          .card-desc {{ $t('overviewPage.blocksuiteDesc') }}
          .card-icon-shadow-wrapper( ref="icon" )
            nuxt-link.card-icon-wrapper.icon-blocksuite-wrapper(:to="PATH.AFFiNE_BLOCK_SUITE" target="_blank")
              .gradient-border
              .content-box
                nuxt-icon.logo-icon.colorful-icon( name="BlockSuite-icon" filled)
                nuxt-icon.logo-icon( name="BlockSuite-icon")
                .content-particles
                  nuxt-icon( name="blocksuite-particles-layber-1").blocksuite-particles-layer-1
                  nuxt-icon( name="blocksuite-particles-layber-2").blocksuite-particles-layer-2
                  nuxt-icon( name="blocksuite-particles-layber-3").blocksuite-particles-layer-3
                  nuxt-icon( name="blocksuite-particles-layber-4").blocksuite-particles-layer-4

            .card-icon-shadow.type-blocksuite
          .card-features.text-brand-grad( v-html="$t('overviewPage.blocksuiteFeatures')" )
        .module-card
          .card-desc {{ $t('overviewPage.octobaseDesc') }}
          .card-icon-shadow-wrapper
            nuxt-link.card-icon-wrapper.icon-octobase-wrapper(:to="PATH.AFFiNE_OCTO_BASE" target="_blank")
              .gradient-border
              .content-box
                nuxt-icon.logo-icon.colorful-icon( name="OctoBase-icon" filled)
                nuxt-icon.logo-icon( name="OctoBase-icon")
                .content-particles
                  nuxt-icon( name="octobase-particles-layber-1").octobase-particles-layer-1
                  nuxt-icon( name="octobase-particles-layber-2").octobase-particles-layer-2
                  nuxt-icon( name="octobase-particles-layber-3").octobase-particles-layer-3
                  nuxt-icon( name="octobase-particles-layber-4").octobase-particles-layer-4
            .card-icon-shadow.type-octobase
          .card-features.text-brand-grad( v-html="$t('overviewPage.octobaseFeatures')" )
t-pane( title="Overview" )
  t-folder( title="Built with" )
    t-input( v-model="params.triggerHeight" name="triggerHeight(vh)" :opt-params="{min: 120, max: 400}" )

</template>

<script setup lang="ts">
import { useResizeObserver } from '@vueuse/core'
import { gsap } from 'gsap'
import { PATH } from '~/utils/constants'

const el = ref<any>(null)
const icon = ref<any>(null)
const pinContent = ref<HTMLElement>()
// @FIXME: Got an erro when use ref to scroll-trigger-container
const scrollTriggerWrapper = ref(null)
const scrollProgress = ref(0)
const scrollStates = reactive({
  enterProgress: 0,
  shadowProgress: 0,
  particlesProgress: 0
})
const params = reactive({
  triggerHeight: 150
})
const iconScale = ref(1)
const scrollStyle = computed(() => ({
  '--icon-scale': iconScale.value,
  '--progress': scrollProgress.value,
  '--enter-progress': scrollStates.enterProgress,
  '--shadow-progress': scrollStates.shadowProgress,
}))

const setupScrollTrigger = () => {
  const tl = gsap.timeline({
    paused: true
  })
    // Permanent
    .to(scrollProgress, { value: 1, ease: 'none', duration: 1 })
    // Shadow
    .to(scrollStates, { shadowProgress: 1, ease: 'none', duration: 1 }, 0)
    .to(scrollStates, { shadowProgress: 0, ease: 'none', duration: 1 })
    // Particles
    .to(scrollStates, { particlesProgress: 0, ease: 'none', duration: 2 }, 0)
    .to('.content-particles', { rotate: 90, scale: 1, ease: 'none', duration: 2 }, 0)
    .to('.blocksuite-particles-layer-1', { color: '#BFA0FF', opacity: 0.1, ease: 'none', duration: 2 }, 0)
    .to('.blocksuite-particles-layer-2', { color: '#BB9BFF', opacity: 0.1, ease: 'none', duration: 2 }, 0)
    .to('.blocksuite-particles-layer-3', { color: '#625FFF', opacity: 0.1, ease: 'none', duration: 2 }, 0)
    .to('.blocksuite-particles-layer-4', { color: '#CE41FF', opacity: 0.1, ease: 'none', duration: 2 }, 0)
    .to('.octobase-particles-layer-1', { color: '#8F7CFF', opacity: 0.1, ease: 'none', duration: 2 }, 0)
    .to('.octobase-particles-layer-2', { color: '#6BB8FF', opacity: 0.1, ease: 'none', duration: 2 }, 0)
    .to('.octobase-particles-layer-3', { color: '#00F0FF', opacity: 0.1, ease: 'none', duration: 2 }, 0)
    .to('.octobase-particles-layer-4', { color: '#B4FFFA', opacity: 0.1, ease: 'none', duration: 2 }, 0)

  const triggerTl = gsap.timeline({
    scrollTrigger: {
      trigger: pinContent.value,
      start: "38% center",
      scrub: 1,
      end: () => {
        const height = pinContent.value?.getBoundingClientRect().height
        return `bottom ${height}px`
      },
      onEnter: () => {
        // @HACK: Avoid triggering during init
        if (scrollStates.enterProgress < 0.5) {
          tl.play()
        }
      }
    }
  })
    .to(scrollStates, { enterProgress: 1, ease: 'none', duration: 1, onUpdate: () => {
      if (scrollStates.enterProgress < 1 && scrollStates.enterProgress > 0) {
        tl.play()
      }
    } })

  watch(() => params.triggerHeight, () => {
    triggerTl.scrollTrigger?.refresh()
  })
}

useResizeObserver(icon, (entries) => {
  const entry = entries[0]
  const { width } = entry.contentRect
  iconScale.value = Math.min(1, width/356)
})

onMounted(() => {
  setupScrollTrigger()
})

</script>

<style lang="stylus">
.overview-build-with-module
  --icon-border: #ddd
  // margin-bottom: fluid-value(50, 145)

  .trigger-container
    position relative

  // @FIXME: Remove pin flicker
  .content-block
    padding-left: 20px
    padding-right: 20px
    padding-top: fluid-value(80, 100)
    padding-bottom: fluid-value(105, 145)
    // opacity: calc(var(--enter-progress))
    // transform: translateY(calc(30% * (1 - var(--enter-progress))))

  .local-title
    font-weight: 900
    font-size: fluid-value(16, 48)
    line-height: (58/48)
    text-align: center
    margin-bottom: fluid-value(50, 100)

  .module-list
    max-width: 1180px
    width: 100%
    padding: 0 fluid-value(7, 15)
    gap: fluid-value(30, 135)
    text-align: center

    @media $mediaInXS
      flex-direction: column

    .module-card
      flex: 1
      display flex
      flex-direction: column
      align-items: center

    .card-icon-shadow-wrapper
      position relative
      aspect-ratio: 358/338
      width: 100%
      max-width: s('min(358px, 70%)')
      margin-top: fluid-value(15, 35)
      margin-bottom: fluid-value(30, 80)

      @media $mediaInXS
        max-width: s('min(185px, 20vh)')

    .card-icon-shadow
      position absolute
      z-index: -3
      width: 100%
      height: 100%
      left: 50%
      top: 50%
      transform: translate3d(-50%, -50%, 0)
      background-size: contain
      background-position: center center
      opacity: var(--shadow-progress)
      // mask-image: radial-gradient(circle, #000, #000 40%, transparent 70%)
      will-change: opacity
      background: #000
      border-radius: 18px

      &.type-blocksuite
        // background-image: url(@/assets/overview/built-with-blocksuite-shadow.svg)
        filter: \
          drop-shadow(-25px -60px 60px rgba(18, 70, 255, 0.5)) \
          drop-shadow(25px 60px 60px rgba(215, 169, 252, 0.4)) \
          drop-shadow(0px 4px 60px rgba(255, 255, 255, 0.3))

      &.type-octobase
        filter: \
          drop-shadow(-25px -60px 60px rgba(169, 187, 252, 0.5)) \
          drop-shadow(25px 60px 60px rgba(169, 252, 237, 0.4)) \
          drop-shadow(0px 4px 45px rgba(255, 255, 255, 0.3))

    .card-icon-wrapper
      --border-width: fluid-value(2, 5)
      position relative
      display: flex
      justify-content: center
      align-items: center
      width: 100%
      height: 100%
      color: #747474
      transition: 318ms
      border-radius: 18px
      background: var(--secondary)
      background-clip: padding-box
      border: solid var(--border-width) transparent

      .content-box
        overflow: hidden
        position relative

      .content-particles
        position absolute
        left: 50%
        top: 50%
        transform: translate3d(-50%, -50%, 0) scale(0.8)
        color: alpha(#FFFFFF, 20%)

        > *
          position absolute
          left: 50%
          top: 50%
          transform: translate3d(-50%, -50%, 0) scale(calc(1.1 * var(--icon-scale)))

        .nuxt-icon svg
          width: auto
          height: auto

      .gradient-border
      &:before
        content: ''
        position absolute
        z-index: -3
        inset: calc(-1 * var(--border-width))
        border-radius: inherit
        background: var(--icon-border)

      .gradient-border
        background: linear-gradient(to bottom, #5F5F5F 0%, #313131 100%)
        opacity: var(--progress)
        z-index: -2

      &:after
        content: ''
        position absolute
        z-index: 2
        inset: 0
        background: linear-gradient(133.19deg, rgba(255, 255, 255, 0.15) 1.88%, rgba(255, 255, 255, 0) 98.63%);
        border-radius: 13px
        opacity: var(--progress)

      .logo-icon
        position relative
        z-index 2

      .logo-icon svg
        width: 100%
        height: 100%

      .colorful-icon
        position: absolute
        inset: 0
        z-index: 3
        opacity: var(--progress)

    .card-desc,
    .card-features
      font-weight: 900;
      font-size: fluid-value(12, 24);
      line-height: (29/24);

      @media $mediaInXS
        max-width: 240px

    .icon-blocksuite-wrapper
      null

  &.enable-hover
    // @media $mediaInDesktop
    //   .icon-blocksuite-wrapper:hover
    //     filter: drop-shadow(-4px -10px 25px rgba(18, 70, 255, 0.6)) drop-shadow(4px 10px 25px rgba(215, 169, 252, 0.6)) drop-shadow(0px 4px 47px rgba(255, 255, 255, 0.8));

    //   .icon-octobase-wrapper:hover
    //     filter: drop-shadow(-4px -10px 25px rgba(169, 187, 252, 0.6)) drop-shadow(4px 10px 25px rgba(169, 252, 237, 0.6)) drop-shadow(0px 4px 47px rgba(255, 255, 255, 0.8));

  /html.dark &
    --icon-border: #2E2E2E
</style>
