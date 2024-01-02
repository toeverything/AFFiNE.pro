<template lang="pug">
.community-navbar
  nuxt-link.nav-sub-item.flex.gap-3.mb-2px(
    :class="[ `item-${item.icon}` ]"
    :key="item.link"
    rel="nofollow"
    target="_blank"
    :href="item.link"
    v-for="item in navItems"
  )
    nuxt-icon(
      :name="item.icon"
    )
    .text-part
      .item-name.mb-2px {{ item.name }}
      .item-desc  {{ item.desc }}
</template>

<script setup lang="ts">
import { PATH } from '~/utils/constants'

const navItems = [
  {
    name: 'Discord',
    desc: 'Get tips and support from 2000+ users',
    icon: 'discord',
    link: PATH.SNS_DISCORD
  },
  {
    name: 'Twitter',
    desc: 'Stay tuned for the latest news',
    icon: 'twitter-x',
    link: PATH.SNS_TWITTER
  },
  {
    name: 'Telegram',
    desc: 'Best place for instant engagement with peers',
    icon: 'telegram',
    link: PATH.SNS_TELEGRAM
  },
  {
    name: 'Community',
    desc: 'Become an ambassador and track events',
    icon: 'community',
    link: PATH.AFFiNE_COMMUNITY
  },
]
</script>

<style lang="stylus">
.community-navbar

  .nav-sub-item
    padding: 6px 12px
    border-radius: 4px
    transition: 218ms

    &:last-child
      @media $mediaInMobile
        margin-bottom: 8px

    .item-name,
    .item-desc
      font-size: fluid-value(14, 14)
      font-weight: 500
      line-height: 1.5

    .item-name
      letter-spacing: (-0.2/14em)

    .item-desc
      line-height: 22px
      color: var(--Black-Tertiary, #8E8D91);
      font-weight: 400

    .nuxt-icon
      font-size: fluid-value(20, 20)
      color: #77757D99
      transition: 218ms

    &:hover
      background: var(--black-04, rgba(0, 0, 0, 0.04))

  .item-discord:hover
    .nuxt-icon
      color: #5865F2

  .item-twitter-x:hover
    .nuxt-icon
      color: #000

  .item-telegram:hover
    .nuxt-icon
      color: rgba(42, 171, 238, 1)

  .item-community
    .nuxt-icon
      transform: scale(1.1) translateY(1px)

    &:hover
      .nuxt-icon
        color: var(--brand)

</style>
