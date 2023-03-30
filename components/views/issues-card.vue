<template lang="pug">
.issues-card
  .tab-bar.flex( :class="[`active-${currentTab}`]" )
    .tab-active-bg
    .tab.tab-open( @click="() => currentTab = 'open'" )
      span {{ $t('overviewPage.issuesTabOpen') }}
    .tab.tab-closed( @click="() => currentTab = 'closed'" )
      span {{ $t('overviewPage.issuesTabClosed') }}

  .edge-case.type-error.flex.flex-col.justify-center.items-center(
    v-if="isError"
  )
    nuxt-icon.mb-10px( name="radiation" )
    .tips {{ $t('error') }}

  .edge-case.type-loading(
    v-else-if="isLoading"
  )
    el-skeleton( animated style="--el-skeleton-color: rgba(255, 255, 255, 0.05);--el-skeleton-to-color: rgba(255, 255, 255, 0)")
      template( #template )
        .flex.gap-21px.mb-4.pl-4.items-center(
          v-for="num in maxIssueLength"
        )
          el-skeleton-item( style="animation: none; width: 27px; height: 27px")
          el-skeleton-item( style="flex: 1; height:54px")

  transition( v-else name="el-fade-in" )
    .issues-list(
      ref="issueList"
    )
      issue-item(
        v-for="issue in finalIssues"
        v-key="issue.id"
        :type="currentTab"
        :issue="issue"
      )

  nuxt-link.more-handler(
    :to="`${PATH.AFFiNE_GITHUB}/issues`"
    target="_blank"
  ) {{ $t('more') }}

</template>

<script setup lang="ts">
import { useResizeObserver } from '@vueuse/core'
import { PATH } from '~/utils/constants'

type IssueType = 'open' | 'closed'

const isLoading = ref(true)
const isError = ref(false)
const issueList = ref(null)
const openedIssues = ref([])
const closedIssues = ref([])
const maxIssueLength = ref(8)
const currentTab = ref<IssueType>('open')

const finalIssues = computed(() => {
  const issues = currentTab.value === 'open' ? openedIssues.value : closedIssues.value
  return issues.slice(0, maxIssueLength.value)
})

const loadData = async () => {
  try {
    isLoading.value = true
    const res = await $fetch<any>(`api/status`)
    openedIssues.value = res.opened_issues
    closedIssues.value = res.closed_issues
  } catch(error) {
    isError.value = true
  }
  isLoading.value = false
}

// Setup dynamic issues amount
useResizeObserver(issueList, (entries) => {
  const entry = entries[0]
  const height = entry.target.getBoundingClientRect().height
  const $item = entry.target.querySelector('.issue-item')
  const itemHeight = $item?.getBoundingClientRect().height || 1
  const count = Math.round(height / itemHeight)
  maxIssueLength.value = count
})

onMounted(() => {
  loadData()
})

</script>

<style lang="stylus">
.issues-card
  display flex
  flex-direction: column
  gap: 30px

  .edge-case
    background: rgba(255, 255, 255, 0.1)
    border-radius: 10px
    padding: 10px
    flex: 1
    overflow: hidden

    &.type-error
      font-weight: 800;
      font-size: 24px;
      line-height: 29px;
      color: rgba(255, 255, 255, 0.8);
      border: 1px solid #000000;

      .nuxt-icon
        font-size: 85px

  .tab-bar
    position relative
    border: 1px solid #AAAAAA
    border-radius: 12.8571px
    background: linear-gradient(0deg, #000000 0%, rgba(52, 52, 52, 0.45) 100%);
    --gap: 4px

    @media $mediaInXS
      // --gap: 2px

    &.active-closed
      .tab-active-bg
        transform: translateX(calc(100% - var(--gap) * 2))

    .tab-active-bg
      position absolute
      width: 50%
      top: var(--gap)
      bottom: var(--gap)
      left: var(--gap)
      background: #464646;
      border-radius: 10px;
      transition: 318ms

    .tab
      position relative
      z-index: 2
      flex: 1
      font-weight: 800
      font-size: 13px
      display: flex
      align-items: center
      justify-content: center
      height: 37px
      cursor pointer

      @media $mediaInXS
        height: 16px

        span
          transform: scale(0.5)

  .issues-list
    flex: 1
    min-height: 0
    // overflow: hidden

    @media $mediaInXS
      overflow: hidden

  .more-handler
    flex-shrink: 0
    font-weight: 800;
    font-size: 24px;
    display: flex
    justify-content: center
    align-items: center
    border: 1px solid #333333;
    border-radius: 18px;
    margin: 0 -10px
    transition: 218ms
    padding: 7px

    &:hover
      background: #111

</style>
