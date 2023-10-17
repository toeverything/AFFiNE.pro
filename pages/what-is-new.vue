<template lang="pug">
.page.page-what-is-new
  .section-hero
    .container.flex.flex-col.items-start
      .section-title {{ $t('whatIsNewPage.title') }}
      .section-desc {{ $t('whatIsNewPage.desc') }}
      .body-content {{ $t('whatIsNewPage.heroContent') }}
      nuxt-link.view-button(
        :to="`${PATH.AFFiNE_GITHUB}/releases`"
        target="_blank" rel="nofollow"
      )
        | {{ $t('whatIsNewPage.viewGitHubReleases') }}
        nuxt-icon( name="github" )
      .divider

  .section-changelogs
    ui-loading.mb-30(
      v-if="!asyncOptions.isError"
      :needPlaceholder="false"
      :isInitial="false"
      :isLoading="asyncOptions.isLoading"
    )
    .container.flex.flex-col.items-start
      changelog-card(
        v-for="changelog in washedChangelogs"
        :changelog="changelog"
      )

</template>

<script lang="ts" setup>
import { PATH } from '~/utils/constants'
import { primaryAPI } from '~/apis'

const { t } = useI18n()
useHead({
  title: t('whatIsNewPage.title')
})

const asyncOptions = reactive({
  isLoading: true,
  isError: false
})
const changelogs = ref([
  {
    title: `What’s new  -  AFFiNE- 20230601`,
    version: '0.6.0 - stable/beta',
    date: '2023-06-01',
    description: 'AFFiNE is the alternative of Notion, Miro, and Monday, this article introduces what’s new, and what updates, Improvements, and bug fixes have been released in the Stable version.',
    detailLink: 'https://affine.pro/blog/whats-new-affine-0601',
    cover: 'https://app.affine.pro/api/workspace/H6vffRmJbCfA-r3kq_36_/blob/kqxYZaWThvzi3oMCESjramVRrHukqWYXBR-_W0I4A80=.webp'
  },
  {
    title: `What’s new  -  AFFiNE- 20230518`,
    version: '0.5.4 - beta1',
    date: '2023-05-18',
    description: `AFFiNE is the alternative of Notion, Miro, and Monday, this article introduces what's new, and what updates, Improvements, and bug fixes have been released in the beta version`,
    detailLink: 'https://affine.pro/blog/whats-new-affine-0518',
    cover: 'https://app.affine.pro/api/workspace/H6vffRmJbCfA-r3kq_36_/blob/8Bhc8ElWj7QczDMr07iJ1hj06DHhF6YIu1vKmoS2Od8=.webp'
  },
])

const washedChangelogs = computed(() => {
  return changelogs.value
    .map(el => {
      el.date = new Date(el.date).getTime()
      return el
    })
    .sort(({ date: a }, { date: b }) => {
      if (a < b) {
        return 1
      }
      if (a > b) {
        return -1
      } else {
        return 0
      }
  })
})

const loadData = async () => {
  try {
    asyncOptions.isLoading = true
    const { list } = await primaryAPI.getChangelogs()
    if (list) {
      changelogs.value = list
    }
  } catch (error) {
    asyncOptions.isError = true
  }
  asyncOptions.isLoading = false
}

await loadData()
</script>

<style lang="stylus">
.page.page-what-is-new
  --container-width: 960px

  .container
    --width: var(--container-width)
    padding-left: fluid-value(16, 40)

  .section-hero
    padding-top: fluid-value(50, 172)
    padding-bottom: fluid-value(64, 144)

    .section-title
      font-size: fluid-value(24, 32)
      margin-bottom: 10px

    .section-desc
      font-weight: 500
      font-size: fluid-value(14, 16)
      line-height: (19/16)
      margin-bottom: 44px

    .body-content
      font-size: fluid-value(14, 15);
      margin-bottom: 44px
      white-space: pre-line

    .view-button
      display: flex
      align-items: center
      font-weight: 500;
      padding: 5px 15px
      font-size: 14px
      background: rgba(5, 5, 5, 0.05);
      border: 1px solid rgba(0, 0, 0, 0.1);
      border-radius: 28px;
      transition: 316ms

      &:hover
        background: rgba(5, 5, 5, 0.1);;

      .nuxt-icon
        font-size: 16px
        margin-left: 10px

    .divider
      width: 100%
      height: 1px
      opacity: 0.6
      margin-top: 42px
      background: radial-gradient(rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0))

  .section-changelogs
    .changelog-card
      margin-bottom: fluid-value(64, 144)
</style>
