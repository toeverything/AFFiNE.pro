<template lang="pug">
nuxt-link.stars-on-github-button.inline-flex.items-center(
  :to="PATH.AFFiNE_GITHUB"
  target="_blank"
  rel="nofollow"
)
  GithubCircle
  .info-text Stars on GitHub
</template>

<script setup lang="ts">
import { PATH } from '~/utils/constants'

import GithubCircle from '~icons/mdi/github-circle'
</script>

<style lang="stylus">
.stars-on-github-button
  gap: 6px
  color: var(--primary-deep)
  border-radius: 34px
  padding: 6px 16px
  border: 1px solid var(--black-quaternary, #CCC)
  transition: 316ms
  line-height: 1
  font-size: 14px

  &:hover
    background: rgba(0, 0, 0, 0.04)

  @media (max-width: 569px)
    padding: 6px

    .info-text
      display: none

  .info-text
    font-weight: 500
    line-height: 18px
    letter-spacing: -0.28px

</style>
