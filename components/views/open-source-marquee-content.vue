<template lang="pug">
.open-source-marquee-content.flex(
  :class="{ 'is-play': enableMarquee }"
)
  .scroll-padding
  .blur-card.issues-card-wrapper
    h2.card-title {{ $t('overviewPage.issuesTitle') }}
    issues-card
  .blur-card.roadmap-card-wrapper
    h2.card-title {{ $t('overviewPage.roadmapTitle') }}
    .card-list.flex

      .inner-card.roadmap-card
        .card-subtitle.text-brand-grad {{ $t('currentVersion') }}
        .open-source-roadmap-alters
          svg-icon-drawing( :isShow="isShowRoadmapAlterLine" )
            nuxt-icon(
              filled name="roadmap-alter-line"
            )
          .alters-img
        .roadmap-image.image-feature
        .roadmap-image.image-whiteboard
        .roadmap-image.image-database
        nuxt-icon.inner-card-arrow( name="inner-card-arrow" filled )

      .inner-card.coming-soon-card
        .card-subtitle.text-brand-grad {{ $t('comingSoon') }}
        .coming-soon-image.image-mobile
        .coming-soon-image.image-kanban
        .coming-soon-image.image-ai
        .more-dots ......
        nuxt-icon.inner-card-arrow( name="inner-card-arrow" filled )

      .inner-card.sns-card
        .card-subtitle.text-brand-grad {{ $t('overviewPage.whatYouWant') }}
        .card-desc {{ $t('overviewPage.tellUsWhatYouWant') }}
        .card-meta {{ $t('overviewPage.findUsOn') }}
        .sns-list.flex.gap-10px.flex-wrap
          nuxt-link.sns-item.flex(
            v-for="sns in COMMUNITY_SNS_LIST"
            :to="sns.link"
            target="_blank"
          )
            nuxt-icon( :name="sns.iconName" )
            .item-name {{ sns.name }}
</template>

<script setup lang="ts">
import { COMMUNITY_SNS_LIST } from '~/utils/constants'
const props = defineProps<{
  enableMarquee?: boolean
  isShowRoadmapAlterLine?: boolean
}>()
</script>

<style lang="stylus">
.open-source-marquee-content
  .issues-card
    width: s('min(160vw, 730px)')
    margin-top: 17px
    flex: 1
    min-height: 0

    &-wrapper
      display inline-flex
      flex-direction: column

  .roadmap-card-wrapper
    display inline-flex
    min-width: 2200px
    flex-direction: column

  .card-list
    gap: 77px
    margin-top: 17px
    flex: 1
    min-height: 0

  .inner-card
    background: rgba(255, 255, 255, 0.1);
    // background-color: alpha(#3f3f3f, 0.5)
    border: 1px solid #262626;
    backdrop-filter: blur(26px);
    border-radius: 8px;
    padding: 23px 18px
    flex: 1

    .card-subtitle
      font-weight: 800
      font-size: 32px
      line-height: (39/32)
      text-align: center
      margin-bottom: 30px

  .inner-card-arrow
    font-size: 174px
    position absolute
    z-index: 10

  .roadmap-card
    flex: 1.7
    position relative
    z-index: 3

    .inner-card-arrow
      right: -95px
      top: 95px

    .open-source-roadmap-alters
      position relative
      width: 545px
      margin: 0 auto
      aspect-ratio: 545/68

      .svg-icon-drawing
        @keyframes mockFillDraw
          from
            clip-path: inset(0 100% 0 0)
          to
            clip-path: inset(0 0 0 0)

        .nuxt-icon
          animation: mockFillDraw 788ms forwards

      .nuxt-icon
        position absolute
        inset: 0
        top: 2px

        svg
          width: 100%
          height: 100%

      .alters-img
        margin: 0 auto
        width: 380px
        aspect-ratio: 380.9/68
        background-image: url(@/assets/overview/open-source-roadmap-alters.png)
        background-size: contain
        background-repeat: no-repeat

    .roadmap-image
      position absolute
      transition: 318ms
      background-size: contain
      background-repeat: no-repeat

    .image-feature
      transform: rotate(2.5deg)
      left: 37px
      bottom: 21px
      width: 370px
      aspect-ratio: 370/364
      background-image: url(@/assets/overview/open-source-roadmap-feature.png)

    .image-whiteboard
      transform: rotate(-5.39deg);
      z-index: 2
      bottom: -14px
      left: 260px
      width: 374px
      aspect-ratio: 374/345
      background-image: url(@/assets/overview/open-source-roadmap-whiteboard.png)

    .image-database
      transform: rotate(-1.5deg)
      bottom: 57px
      right: 23px
      width: 311px
      aspect-ratio: 311/335
      background-image: url(@/assets/overview/open-source-roadmap-database.png)

    &:hover
      .roadmap-image
        transform: rotate(0) !important

  .coming-soon-card
    flex: 1
    position relative
    z-index: 2

    .inner-card-arrow
      right: -120px
      top: 140px

    .coming-soon-image
      position absolute
      transition: 318ms
      background-size: contain
      background-repeat: no-repeat

    .image-mobile
      transform: rotate(8deg)
      left: 52px
      bottom: 195px
      width: 199px
      aspect-ratio: 199/266
      background-image: url(@/assets/overview/open-source-coming-soon-mobile.png)
      z-index: 2

    .image-kanban
      transform: rotate(-5deg);
      z-index: 3
      bottom: 298px
      right: 90px
      width: 221px
      aspect-ratio: 221/188
      background-image: url(@/assets/overview/open-source-coming-soon-kanban.png)

    .image-ai
      bottom: 125px
      right: 130px
      width: 182px
      aspect-ratio: 182/193
      background-image: url(@/assets/overview/open-source-coming-soon-ai.png)

    &:hover
      .coming-soon-image
        transform: rotate(0) !important

    .more-dots
      position absolute
      width: 100%
      bottom: 28px
      font-weight: 800
      font-size: 24px
      text-align: center
      color: rgba(255, 255, 255, 0.3);

  .sns-card
    padding-left: 61px
    padding-right: 52px
    flex: 0.9

    .card-desc
      font-weight: 600;
      font-size: 24px;
      line-height: 29px;
      color: #E6E6E6;
      margin-bottom: 52px

    .card-meta
      font-weight: 600;
      font-size: 20px;
      line-height: 24px;
      color: #929292;
      margin-bottom: 52px

    .sns-item
      justify-content: center;
      align-items: center;
      border: 1.64184px solid #494949;
      backdrop-filter: blur(29.5532px);
      border-radius: 13.1348px;
      padding: 16.4184px 6px;
      flex: 40%
      font-weight: 500;
      font-size: 26.2695px
      color: #9B9B9B

      .nuxt-icon
        transition: 168ms
        color: white
        font-size: 44px
        margin-right: 8px

      &:hover
        &,
        .nuxt-icon
          color: var(--brand)
</style>
