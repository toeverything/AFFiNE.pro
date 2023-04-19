<template lang="pug">
.campaign-entry.flex.justify-center( v-if="CONFIG.IS_SHOW_CAMPAIGN_ENTRY" )
  nuxt-link.copilot-button(
    :to="PATH.COPILOT_FORM"
    target="_blank"
    rel="nofollow"
  )
    .video-wrapper.flex.items-center
      | {{ $t('affineCopilot') }}
      video( muted loop autoplay )
        source( :src="copilotButtonAnimationUrl" )
      arrow-forward-rounded.ml-10px.text-20px.icon-arrow
</template>

<script setup lang="ts">
import ArrowForwardRounded from '~icons/ph/arrow-right-bold'
import { PATH, CONFIG } from '~/utils/constants'
import copilotButtonAnimationUrl from '~/assets/videos/copilot_button_animation.mp4'
</script>

<style lang="stylus">
.campaign-entry
  margin-bottom: 45px

  .copilot-button
    font-weight: 800
    font-size: 16px
    border-radius: 45px
    border: 3px solid rgba(255, 255, 255, 0.1)
    height: 38px

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
      padding: 0 38px
      overflow hidden
      background: linear-gradient(180deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.6) 100%);
</style>
