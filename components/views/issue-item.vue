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
      .text-part
        | \#{{ issue.number }} opened · {{ timeAgo }} by · &nbsp;
      nuxt-link( :to="`https://github.com/${issue.user}`" rel="nofollow" target="_blank" ) {{ issue.user }}
      nuxt-icon( name="arrow-top-right" )
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
  gap: 8px
  padding: 6px 8px
  border-radius: 4px
  transition: 218ms
  --icon-color: #8E8D91

  & + .issue-item
    margin-top: 20px

  &:hover
    background: var(--light-detail-color-hover-color, rgba(0, 0, 0, 0.04));
    --icon-color: var(--brand)

  > .nuxt-icon
    width: 1em
    font-size: 39px
    --color: #44C11A

  &.type-closed
    .nuxt-icon
      --color: #8F44DA

  .item-body
    min-width: 0

  .item-title
    font-size: 16px
    line-height: 1.5
    margin-bottom: 4px
    color: black

    @media $mediaInXS
      font-size: 14px

  .item-meta
    font-size: 13px;
    line-height: normal;
    flex-wrap: no-wrap

    .text-part
      text-overflow()

    .nuxt-icon
      margin-left: 4px
      position relative
      top: 1.5px
      color: var(--icon-color)
</style>
