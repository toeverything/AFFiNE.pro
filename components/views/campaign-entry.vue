<template lang="pug">
.campaign-entry.flex.justify-center( v-if="CONFIG.IS_SHOW_CAMPAIGN_ENTRY" )
  nuxt-link.copilot-button(
    :to="PATH.COPILOT_FORM"
    target="_blank"
    rel="nofollow"
  )
    .video-wrapper.flex.items-center
      | {{ $t('affineCopilot') }}
      video( muted loop autoplay ref="copilotVideo" )
        source( :src="copilotButtonAnimationUrl" )
      arrow-forward-rounded.ml-10px.icon-arrow
</template>

<script setup lang="ts">
import ArrowForwardRounded from '~icons/ph/arrow-right-bold'
import { PATH, CONFIG } from '~/utils/constants'
import copilotButtonAnimationUrl from '~/assets/videos/copilot_button_animation.mp4'

const copilotVideo = ref<HTMLVideoElement>()

// @Hack: Force play when back into the view
onActivated(() => {
  copilotVideo.value?.play()
})
</script>

<style lang="stylus">
.campaign-entry
  margin-bottom: fluid-value(16, 45)

  .copilot-button
    font-weight: 800
    font-size: fluid-value(14, 16)
    border-radius: 45px
    border: fluid-value(1, 3) solid rgba(255, 255, 255, 0.1)
    height: fluid-value(32, 38)

    .icon-arrow
      font-size: fluid-value(18, 20)

    video
      position absolute
      width: 100%
      aspect-radio: 854/480
      left: 50%
      top: 50%
      transform: translate3d(-50%, -50%, 0)
      z-index: -1

    .video-wrapper
      border-radius: 44px
      line-height: 32px
      position relative
      padding: 0 fluid-value(20, 38)
      overflow hidden
      background: linear-gradient(180deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.6) 100%);
</style>
