<template lang="pug">
nuxt-link.blog-card.flex.flex-col(
  :to="{ path: `/blog/${meta.slug}`, meta: { source: 'list' } } "
)
  nuxt-img.card-cover(
    v-if="lazy && meta.cover"
    :loading="lazy ? 'lazy' : 'auto'"
    :src="meta.cover"
    format="webp"
    width="1200"
    height="600"
  )
  nuxt-img.card-cover(
    v-else
    format="webp"
    width="2400"
    height="1200"
    :src="meta.cover"
  )
  .blog-tag-row.flex.gap-4
    .blog-tag( v-for="tag in meta.tags" ) {{ tag }}
  .blog-title {{ meta.title }}
  .blog-desc {{ meta.description }}
  .meta-row.flex.items-center( v-if="needMeta" )
    .user-info.flex.items-center.gap-2( v-if="user?.name" )
      .user-avatar(
        v-if="user.avatar"
        :style="{ backgroundImage: `url(${user.avatar})` }"
      )
      .user-name {{ user.name }}
    .publish-date &nbsp;&nbsp;·&nbsp;&nbsp;{{ publishDate }}
</template>

<script setup lang="ts">
import { useDateFormat } from '@vueuse/core'
import { USER_MAP } from '~/services/blog/userMap'
import type { ContentFileMeta } from '~/services/blog/resolveContentFile'

const props = defineProps<{
  meta: ContentFileMeta
  needMeta?: boolean
  lazy?: boolean
}>()

const user = computed(() => {
  const author = props.meta.authors && props.meta.authors[0]

  if (!author) {
    return {}
  }

  return USER_MAP[author]
})

const publishDate = useDateFormat(new Date(props.meta.updated || Date.now()), 'MM/DD/YYYY')
</script>

<style lang="stylus">
.blog-card
  --tag-color: var(--brand)
  --tag-bg-color: #F9F9F9

  .blog-title
    font-weight: 900
    margin-bottom: 10px
    multiline-overflow(2)

  .blog-tag
    border-radius: 8px
    padding: 5px 15px
    font-weight: 500
    font-size: 14px
    line-height: 17px
    background: var(--tag-bg-color)
    margin-bottom: 10px
    color: var(--tag-color)

  .blog-desc
    font-weight: 500
    font-size: 16px
    line-height: 19px
    color: var(--primary-gray)
    multiline-overflow(3)

  .card-cover,
  .card-cover img
    object-fit: cover
    object-position: center
    aspect-ratio: 1200/600
    margin-bottom: 26px
    border-radius: 8px
    width: 100%

  .card-cover img,
  img.card-cover
    transition: 368ms

    &:hover
      opacity: 0.8

  img.card-cover
    background: var(--el-fill-color-light)
    height: auto !important

  .user-name
    font-weight: 400
    font-size: 14px
    line-height: 20px
    color: black

  .meta-row
    margin-top: 16px

  .user-avatar
    width: 32px
    height: 32px
    background-size: cover
    background-position: center center
    border-radius: 50%

  .publish-date
    color: #8E8D91
    font-weight: 400
    font-size: 13px
    line-height: 20px

  /html.dark &
    --tag-color: #E6E6E6
    --tag-bg-color: rgba(249, 249, 249, 0.3)

</style>
