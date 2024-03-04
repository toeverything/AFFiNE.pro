<template lang="pug">
.page.page-what-is-new
  .section-hero
    .container.flex.flex-col.items-start
      .section-title {{ $t('whatIsNewPage.title') }}
      .section-desc {{ $t('whatIsNewPage.desc') }}
      .links-row.my-4.flex
        nuxt-link(
          :to="`${PATH.SNS_DISCORD}`"
          target="_blank" rel="nofollow"
        )
          | Join our community
        .split.mx-2 ·
        nuxt-link(
          :to="`${PATH.SNS_TWITTER}`"
          target="_blank" rel="nofollow"
        )
          | Follow us on Twitter
      .body-content {{ $t('whatIsNewPage.heroContent') }}

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
  --container-width: 660px

  .container
    --width: var(--container-width)
    padding-left: fluid-value(16, 40)

    @media (max-width: 1500px)
      padding-right: fluid-value(16, 40)

  .section-hero
    max-width: 660px
    margin: auto
    padding-top: fluid-value(50, 60)
    color: #000

    .section-title
      font-size: fluid-value(36, 48)
      margin-bottom: 10px
      font-weight: 500;
      line-height: (57/48);
      letter-spacing: -0.04em;

    .section-desc
      font-weight: 500
      font-size: fluid-value(18, 20)
      line-height: (27/28)
      letter-spacing: -0.02em;
      color: #424149

    .links-row
      color: #1E96EB
      font-weight: 500
      font-size: 14px;
      line-height: 17px;
      letter-spacing: -0.01em;

    .body-content
      white-space: pre-line
      font-weight: 400;
      font-size: 16px;
      line-height: 24px;
      color: #424149;

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
      margin-top: 64px
      margin-bottom: 64px
      background: #CCCCCC

  .section-changelogs
    padding-bottom: 40px
</style>
