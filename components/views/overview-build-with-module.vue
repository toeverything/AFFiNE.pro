<template lang="pug">
scroll-trigger-container.overview-build-with-module(
  ref="el"
  :height="`${params.triggerHeight}vh`"
  :class="{ 'enable-hover': scrollProgress >= 0.7 }"
  :style="{ '--progress': scrollProgress, '--enter-progress': scrollStates.enterProgress }"
)
  .pin-content(
    ref="pinContent"
  )
    .content-block.flex.flex-col.items-center
      .local-title {{ $t('overviewPage.buildWithDetailTitle') }}
      .module-list.flex.justify-between
        .module-card.module-blocksuite
          .card-desc {{ $t('overviewPage.blocksuiteDesc') }}
          nuxt-link.card-icon-wrapper.icon-blocksuite-wrapper(:to="PATH.AFFiNE_BLOCK_SUITE" target="_blank")
            nuxt-icon.colorful-icon( name="BlockSuite-icon" filled)
            nuxt-icon( name="BlockSuite-icon")
          .card-features.text-brand-grad( v-html="$t('overviewPage.blocksuiteFeatures')" )
        .module-card
          .card-desc {{ $t('overviewPage.octobaseDesc') }}
          nuxt-link.card-icon-wrapper.icon-octobase-wrapper(:to="PATH.AFFiNE_OCTO_BASE" target="_blank")
            nuxt-icon.colorful-icon( name="OctoBase-icon" filled)
            nuxt-icon( name="OctoBase-icon")
          .card-features.text-brand-grad( v-html="$t('overviewPage.octobaseFeatures')" )
t-pane( title="Overview" )
  t-folder( title="Built with" )
    t-input( v-model="params.triggerHeight" name="triggerHeight(vh)" :opt-params="{min: 120, max: 400}" )

</template>

<script setup lang="ts">
import { gsap } from 'gsap'
import { PATH } from '~/utils/constants'

const el = ref<any>(null)
const pinContent = ref<HTMLElement>()
// @FIXME: Got an erro when use ref to scroll-trigger-container
const scrollTriggerWrapper = ref(null)
const scrollProgress = ref(0)
const scrollStates = reactive({
  enterProgress: 0
})
const params = reactive({
  triggerHeight: 250
})

const setupScrollTrigger = () => {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: el.value.$trigger,
      // endTrigger: el.value.$trigger,
      // markers: true,
      pin: pinContent.value,
      start: "top top",
      end: () => {
        const height = pinContent.value?.getBoundingClientRect().height
        return `bottom ${height}px`
      },
      scrub: 1
    }
  })
    .to(scrollStates, { enterProgress: 1, ease: 'none', duration: 0.2 })
    .to(scrollProgress, { value: 1, ease: 'none', duration: 1, onUpdate: () => {
      // console.log('overview-build-with-module scrollProgress', scrollProgress.value)
  } })

  watch(() => params.triggerHeight, () => {
    tl.scrollTrigger?.refresh()
  })
}

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
    padding-top: fluid-value(105, 145)
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

    .card-icon-wrapper
      overflow: hidden
      position relative
      margin-top: fluid-value(15, 35)
      margin-bottom: fluid-value(30, 80)
      aspect-ratio: 358/338
      border: fluid-value(2, 5) solid var(--icon-border)
      background: var(--secondary)
      border-radius: 18px
      display: flex
      justify-content: center
      align-items: center
      width: 100%
      max-width: s('min(358px, 70%)')
      color: #747474
      transition: 318ms

      @media $mediaInXS
        max-width: s('min(185px, 20vh)')

      .nuxt-icon svg
        width: 100%
        height: 100%

      .colorful-icon
        position: absolute
        inset: 0
        z-index: 2
        opacity: var(--progress)

    .card-desc,
    .card-features
      font-weight: 900;
      font-size: fluid-value(12, 24);
      line-height: (29/24);

      @media $mediaInXS
        max-width: 240px

  &.enable-hover
    @media $mediaInDesktop
      .icon-blocksuite-wrapper:hover
        filter: drop-shadow(-4px -10px 25px rgba(18, 70, 255, 0.6)) drop-shadow(4px 10px 25px rgba(215, 169, 252, 0.6)) drop-shadow(0px 4px 47px rgba(255, 255, 255, 0.8));

      .icon-octobase-wrapper:hover
        filter: drop-shadow(-4px -10px 25px rgba(169, 187, 252, 0.6)) drop-shadow(4px 10px 25px rgba(169, 252, 237, 0.6)) drop-shadow(0px 4px 47px rgba(255, 255, 255, 0.8));

  /html.dark &
    --icon-border: #2E2E2E
</style>
