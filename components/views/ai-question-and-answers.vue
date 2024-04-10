<template lang="pug">
.ai-question-and-answers
  el-collapse.ai-qna-collapse
    el-collapse-item(
      v-for="item in qnaList"
      :key="item.question"
      :title="item.question"
      :name="item.question"
    )
      .item-answer {{ item.answer }}
</template>

<script setup lang="ts">
const activeNames = ref()

type QnAItem = {
  question: string
  answer: string
}

const qnaList: QnAItem[] = [
  {
    question: 'Lorem ipsum dolor sit amet?',
    answer: 'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed iaculis nibh vel risus finibus rutrum. Duis risus massa, euismod vel ipsum eu, porta fringilla lacus. Pellentesque posuere nibh et elit cursus, at pulvinar eros ullamcorper. Duis convallis lacus quis lectus gravida fringilla. Nullam malesuada ullamcorper nisi sagittis luctus. Nunc convallis, libero ut aliquam ultrices, ante quam sodales nulla, id consectetur augue erat a lorem. Morbi vestibulum nunc ipsum, eget tristique lectus auctor et. Phasellus suscipit erat ut blandit pretium. Fusce tellus mi, aliquam a turpis sed, bibendum congue turpis. Sed laoreet vel orci eleifend laoreet. Curabitur placerat malesuada leo. Donec vestibulum ex ligula. Integer ultrices sem eu tortor feugiat pulvinar. Praesent ac nisi vitae turpis pulvinar tincidunt.'
  },
  {
    question: 'Morbi aliquam nisi sed ante pretium?',
    answer: 'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed iaculis nibh vel risus finibus rutrum. Duis risus massa, euismod vel ipsum eu, porta fringilla lacus. Pellentesque posuere nibh et elit cursus, at pulvinar eros ullamcorper. Duis convallis lacus quis lectus gravida fringilla. Nullam malesuada ullamcorper nisi sagittis luctus. Nunc convallis, libero ut aliquam ultrices, ante quam sodales nulla, id consectetur augue erat a lorem. Morbi vestibulum nunc ipsum, eget tristique lectus auctor et. Phasellus suscipit erat ut blandit pretium. Fusce tellus mi, aliquam a turpis sed, bibendum congue turpis. Sed laoreet vel orci eleifend laoreet. Curabitur placerat malesuada leo. Donec vestibulum ex ligula. Integer ultrices sem eu tortor feugiat pulvinar. Praesent ac nisi vitae turpis pulvinar tincidunt.'
  },
  {
    question: 'Etiam egestas sollicitudin nulla, nec semper neque?',
    answer: 'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed iaculis nibh vel risus finibus rutrum. Duis risus massa, euismod vel ipsum eu, porta fringilla lacus. Pellentesque posuere nibh et elit cursus, at pulvinar eros ullamcorper. Duis convallis lacus quis lectus gravida fringilla. Nullam malesuada ullamcorper nisi sagittis luctus. Nunc convallis, libero ut aliquam ultrices, ante quam sodales nulla, id consectetur augue erat a lorem. Morbi vestibulum nunc ipsum, eget tristique lectus auctor et. Phasellus suscipit erat ut blandit pretium. Fusce tellus mi, aliquam a turpis sed, bibendum congue turpis. Sed laoreet vel orci eleifend laoreet. Curabitur placerat malesuada leo. Donec vestibulum ex ligula. Integer ultrices sem eu tortor feugiat pulvinar. Praesent ac nisi vitae turpis pulvinar tincidunt.'
  },
  {
    question: 'Nullam aliquet sit amet ex ac tempus?',
    answer: 'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed iaculis nibh vel risus finibus rutrum. Duis risus massa, euismod vel ipsum eu, porta fringilla lacus. Pellentesque posuere nibh et elit cursus, at pulvinar eros ullamcorper. Duis convallis lacus quis lectus gravida fringilla. Nullam malesuada ullamcorper nisi sagittis luctus. Nunc convallis, libero ut aliquam ultrices, ante quam sodales nulla, id consectetur augue erat a lorem. Morbi vestibulum nunc ipsum, eget tristique lectus auctor et. Phasellus suscipit erat ut blandit pretium. Fusce tellus mi, aliquam a turpis sed, bibendum congue turpis. Sed laoreet vel orci eleifend laoreet. Curabitur placerat malesuada leo. Donec vestibulum ex ligula. Integer ultrices sem eu tortor feugiat pulvinar. Praesent ac nisi vitae turpis pulvinar tincidunt.'
  },
  {
    question: 'Duis eu facilisis mi. Aliquam a rutrum justo?',
    answer: 'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed iaculis nibh vel risus finibus rutrum. Duis risus massa, euismod vel ipsum eu, porta fringilla lacus. Pellentesque posuere nibh et elit cursus, at pulvinar eros ullamcorper. Duis convallis lacus quis lectus gravida fringilla. Nullam malesuada ullamcorper nisi sagittis luctus. Nunc convallis, libero ut aliquam ultrices, ante quam sodales nulla, id consectetur augue erat a lorem. Morbi vestibulum nunc ipsum, eget tristique lectus auctor et. Phasellus suscipit erat ut blandit pretium. Fusce tellus mi, aliquam a turpis sed, bibendum congue turpis. Sed laoreet vel orci eleifend laoreet. Curabitur placerat malesuada leo. Donec vestibulum ex ligula. Integer ultrices sem eu tortor feugiat pulvinar. Praesent ac nisi vitae turpis pulvinar tincidunt.'
  },
  {
    question: 'Nunc dignissim dictum varius?',
    answer: 'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed iaculis nibh vel risus finibus rutrum. Duis risus massa, euismod vel ipsum eu, porta fringilla lacus. Pellentesque posuere nibh et elit cursus, at pulvinar eros ullamcorper. Duis convallis lacus quis lectus gravida fringilla. Nullam malesuada ullamcorper nisi sagittis luctus. Nunc convallis, libero ut aliquam ultrices, ante quam sodales nulla, id consectetur augue erat a lorem. Morbi vestibulum nunc ipsum, eget tristique lectus auctor et. Phasellus suscipit erat ut blandit pretium. Fusce tellus mi, aliquam a turpis sed, bibendum congue turpis. Sed laoreet vel orci eleifend laoreet. Curabitur placerat malesuada leo. Donec vestibulum ex ligula. Integer ultrices sem eu tortor feugiat pulvinar. Praesent ac nisi vitae turpis pulvinar tincidunt.'
  },
  {
    question: 'Curabitur ut venenatis turpis?',
    answer: 'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed iaculis nibh vel risus finibus rutrum. Duis risus massa, euismod vel ipsum eu, porta fringilla lacus. Pellentesque posuere nibh et elit cursus, at pulvinar eros ullamcorper. Duis convallis lacus quis lectus gravida fringilla. Nullam malesuada ullamcorper nisi sagittis luctus. Nunc convallis, libero ut aliquam ultrices, ante quam sodales nulla, id consectetur augue erat a lorem. Morbi vestibulum nunc ipsum, eget tristique lectus auctor et. Phasellus suscipit erat ut blandit pretium. Fusce tellus mi, aliquam a turpis sed, bibendum congue turpis. Sed laoreet vel orci eleifend laoreet. Curabitur placerat malesuada leo. Donec vestibulum ex ligula. Integer ultrices sem eu tortor feugiat pulvinar. Praesent ac nisi vitae turpis pulvinar tincidunt.'
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
        color: #000000;
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
