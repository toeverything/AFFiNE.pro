<template lang="pug">
.page.page-ai

  .section.section-qna
    .limit-container
      .section-subtitle
        | Question & Answers

      ai-question-and-answers

  .section.section-get-started-with
    .limit-container
      .section-subtitle
        | Get Started&nbsp;
        span.muted with AFFiNE AI

      pricing-ai-section
</template>

<script lang="ts" setup>
useHead({
  title: 'AI',
})
</script>

<style lang="stylus">
.page.page-ai
  padding-bottom: 40px

  .section
    .section-subtitle
      font-weight: 500;
      font-size: fluid-value(24, 32);
      line-height: (43/36);
      letter-spacing: -0.03em;
      color: #000;
      margin-top: 80px;
      margin-bottom: fluid-value(20, 40);

      @media $mediaInMobile
        letter-spacing: -0.02em;

      .muted
        color: #8E8D91
</style>
