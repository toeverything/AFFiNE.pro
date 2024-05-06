<template lang="pug">
.ai-question-and-answers
  el-collapse.ai-qna-collapse
    el-collapse-item(
      v-for="item in qnaList"
      :key="item.question"
      :title="item.question"
      :name="item.question"
    )
      .item-answer(
        v-html="item.answer"
      )
</template>

<script setup lang="ts">
const activeNames = ref()

type QnAItem = {
  question: string
  answer: string
}

const qnaList: QnAItem[] = [
  {
    question: 'Can AFFiNE AI be used in a local workspace?',
    answer: 'Certainly, you just need to log in to your AFFiNE Cloud account, and then you can activate AFFiNE AI in the local workspace.'
  },
  {
    question: 'How to activate Inline AI assistant in Page Mode?',
    answer: `In a Doc's Page Mode, you can select one or more blocks, or select the text content, and click "Ask AI" in the pop-up Format Toolbar to activate AFFiNE AI.
Additionally, after opening a doc, you can click on the "Expand sidebar" in the top right corner, where you will find the chat entry for AFFiNE AI in the sidebar.`
  },
  {
    question: 'How to use AFFiNE AI in Edgeless Mode of a doc?',
    answer: `On the whiteboard (Edgeless Mode), you can activate AFFiNE AI by right-clicking to select content. You can also activate AFFiNE AI's function by clicking "Ask AI" in the Elements menu that appears after selecting one or multiple elements. Additionally, you can also find the chat entry for AFFiNE AI in the sidebar by clicking "Expand sidebar" at the top right corner after opening a doc.`
  },
  {
    question: 'How does AFFiNE AI share my data？',
    answer: `AFFiNE only sends related content information to third-party AI vendors when you use AFFiNE AI. If you have any questions, you can refer to our <b><a href="/terms#ai">AI terms</a></b> for policy usage and limits.`
  },
  {
    question: 'Does AFFiNE AI have a free trial?',
    answer: `Yes, AFFiNE AI provides each AFFiNE Cloud user with 10 trial experiences, so you can try for free without any charge.`
  },
  {
    question: 'After purchasing the AFFiNE AI service, are there any limitations?',
    answer: `In the early stages of AFFiNE AI's launch, users who purchase AFFiNE AI can enjoy unlimited usage, which is mainly for early users of AFFiNE AI. Restrictions will be adjusted later on.`
  },
]
</script>

<style lang="stylus">
.ai-question-and-answers
  .ai-qna-collapse
    background: #FFFFFF
    border: 1px solid #E3E2E4
    box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.15)
    border-radius: 16px
    overflow hidden
    --el-collapse-header-height: 56px
    --el-collapse-border-color: #E3E2E4

    .el-collapse-item
      border-bottom: 1px solid var(--el-collapse-border-color)

      &.is-active
        .el-collapse-item__header
          transition: 0ms

      &:not(.is-active):hover
        .el-collapse-item__header
          background: #f9f9f9

      &__header
        padding: 16px 34px 14px 24px
        font-weight: 500;
        font-size: 18px;
        line-height: 24px;
        letter-spacing: -0.02em;
        color: #424149 !important
        border: none !important
        height: auto
        transition: 318ms
        position: relative
        z-index 2

      &__wrap
        border: none !important
        position relative
        top: -8px

      &__content
        padding: 0 24px 10px
        font-size: 16px;
        line-height: 24px;
        color: #8E8D91;
        position relative
        z-index 3

      &__arrow
        position relative
        right: -10px
        margin-right: 0
        color: #77757D
        font-weight: 400
        path
          stroke-width: 20px
          stroke: currentColor

    .item-answer
      white-space: pre-line
</style>
