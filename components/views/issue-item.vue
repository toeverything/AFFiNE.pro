<template lang="pug">
nuxt-link.issue-item.flex.items-center(
  :to="`${PATH.AFFiNE_GITHUB}/issues/${issue.number}`"
  rel="nofollow"
  target="_blank"
  :class="[`type-${type}`]"
)
  nuxt-icon( name="issue-dot" filled ).shrink-0
  .item-body.flex-1
    .item-title.truncate {{ issue.title }}
    .item-meta.flex
      | \#{{ issue.number }} opened {{ timeAgo }} by &nbsp;
      nuxt-link( :to="`https://github.com/${issue.user}`" rel="nofollow" target="_blank" ) {{ issue.user }}
</template>

<script setup lang="ts">
import { useTimeAgo } from '@vueuse/core'
import { PATH } from '~/utils/constants'

interface Issue {
  url: string
  number: number
  title: string
  user: string
  created_at: string
}

const props = defineProps<{
  type: string,
  issue: Issue
}>()

const timeAgo = useTimeAgo(new Date(props.issue.created_at))

</script>

<style lang="stylus">
.issue-item
  gap: fluid-value(18, 28)
  padding-bottom: 19px
  transition: 218ms

  &:hover
    opacity: 0.8

  .nuxt-icon
    width: 1em
    font-size: fluid-value(24, 33)
    --color: #35FF23

  &.type-closed
    circle
      --color: #8250df

  .item-body
    min-width: 0

  .item-title
    font-weight: 800
    font-size: fluid-value(14, 16)
    line-height: (19/16)

  .item-meta
    margin-top: 7px
    font-size: 12px
    line-height: (15/12)
    font-weight: 800

    a
      text-decoration: underline
</style>
