<template lang="pug">
.overview-build-in-public
  .container.flex.flex-col.items-center
    .intro-part.flex.flex-col
      .section-mini-title {{ $t('overviewPage.buildInPublicTitle') }}
      .section-mini-desc {{ $t('overviewPage.buildInPublicDesc') }}
      .button-wrapper
        track-link.get-notified-button(
          :to="PATH.GET_NOTIFIED_FORM" target="_blank" rel="nofollow"
          action="Survey"
          :params="{ 'resolve': 'Get Notified' }"
        )
          | {{ $t('getNotified') }}

    .features-part
      .feature-chart
        .feature-circles
          .feature-circle(
            :class="[ `circle-${group.id}` ]"
            v-for="group in featureGroups"
          )
            el-popover(
              popper-class="feature-dot-popover"
              :show-arrow="false"
              trigger="hover"
              :width="140"
              :content="item"
              placement="right-start"
              v-for="(item, index) in group.items"
            )
              template( #reference )
                .feature-dot(
                  :class="[ `dot-${index + 1}` ]"
                 )
            .feature-label
              .label-text {{ group.title }}
              .label-dot
        .line-coord
          .start-dot
          .end-arrow
            nuxt-icon( name="axis-arrow" )
          .x-axis-line
      .feature-groups
        .feature-group(
          v-for="group in featureGroups"
        )
          .group-title {{ group.title }}
          ol.group-items
            li(
              v-for="item in group.items"
            ) {{ item }}

    .cards-part
      .blur-card.issues-card-wrapper
        h3.card-title {{ $t('overviewPage.issuesTitle') }}
        issues-card
      .blur-card.sns-card
        .limit-wrapper
          h3.card-title {{ $t('overviewPage.whatYouWant') }}
          .card-desc {{ $t('overviewPage.tellUsWhatYouWant') }}
          .card-meta {{ $t('overviewPage.findUsOn') }}
          .sns-list.flex.flex-wrap
            nuxt-link.sns-item.flex(
              v-for="sns in COMMUNITY_SNS_LIST"
              :to="sns.link"
              rel="nofollow"
              target="_blank"
            )
              nuxt-icon( :name="sns.iconName" )
              .item-name {{ sns.name }}
</template>

<script setup lang="ts">
import { PATH, COMMUNITY_SNS_LIST } from '~/utils/constants'
const { t } = useI18n()

const featureGroups = [
  { title: t('overviewPage.buildInPublicClient'), id: 'client', items: [
    t('overviewPage.buildInPublicClientA'),
    t('overviewPage.buildInPublicClientB'),
  ] },

  { title: t('overviewPage.buildInPublicCloud'), id: 'cloud', items: [
    t('overviewPage.buildInPublicCloudA'),
    t('overviewPage.buildInPublicCloudB'),
  ] },

  { title: t('overviewPage.buildInPublicCopilot'), id: 'copilot', items: [
    t('overviewPage.buildInPublicCopilotA'),
    t('overviewPage.buildInPublicCopilotB'),
    t('overviewPage.buildInPublicCopilotC'),
  ] },
]
</script>

<style lang="stylus">
.overview-build-in-public
  padding-top fluid-value(100, 200)
  padding-bottom fluid-value(30, 200)

  .container
    max-width: 1800px

    > *
      width: 100%

  .intro-part
    padding: 0 fluid-value(27, 120)

  .button-wrapper
    --margin: fluid-value(0, 15, 768, 1440)
    margin: 0 calc(-1 * var(--margin))

  .section-mini-title
    font-weight: 800
    font-size: fluid-value(20, 40)
    line-height: (48/40)
    margin-bottom: 20px

  .section-mini-desc
    font-weight: 500
    font-size: fluid-value(14, 24)
    background: linear-gradient(180deg, #FFFFFF 0%, #EAEAEA 49.48%, #ACACAC 100%);
    -webkit-background-clip: text
    -webkit-text-fill-color: transparent
    font-weight: 500
    margin-bottom: fluid-value(30, 54)

  .get-notified-button
    position: relative
    z-index: 2
    display: inline-flex
    font-weight: 800
    font-size: fluid-value(11, 32)
    padding: fluid-value(6, 18) fluid-value(21, 64)
    background: rgba(255, 255, 255, 0.1)
    border-radius: fluid-value(3.5, 10)
    transition: 318ms

    &:hover
      background: rgba(255, 255, 255, 0.15)

    &:before
      content: ""
      pointer-events: none
      user-select: none
      position: absolute
      inset: 0px
      border-radius: inherit
      padding: 1px
      background: radial-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.05))
      -webkit-mask: linear-gradient(black, black) content-box content-box, linear-gradient(black, black)
      -webkit-mask-composite: xor

  .features-part
    position: relative

  .feature-chart
    --margin: fluid-value(0, 40)
    margin-top: calc(-1 * var(--margin))
    padding: 0 fluid-value(0, 77)

    @media $mediaInMobile
      position: absolute
      bottom: 20px
      width: 100%
      z-index: -1

      .line-coord,
      .feature-label
        display: none

    .line-coord
      position: relative

    .start-dot
      position: absolute
      left: 0
      top: 50%
      width: 20px
      height: 20px
      background: #000000
      border: 6px solid #FFFFFF
      border-radius: 50%
      transform: translate(-50%, -50%)

    .end-arrow
      position: absolute
      right: 0
      top: -50%
      transform: translate(50%, -50%)
      font-size: 32px

    .x-axis-line
      height: 3px
      background: white
      width: 100%

  .feature-circles
    padding: 0 fluid-value(0, 95)
    position: relative
    pointer-events: none

    .feature-circle
      aspect-ratio: 2/1
      position: relative
      background: rgba(255, 255, 255, 0.04)
      border: fluid-value(2, 3) solid #2D2D2D
      border-radius: 2000px 2000px 0 0;

    .circle-client
      position: absolute
      bottom: 0
      width: 38.13%

      .feature-label
        left: 48%

      .feature-dot
        top: 50%

      .dot-1
        left: 30%
        --delay: 0s;

      .dot-2
        right: 30%
        --delay: 0.6s;

    .circle-cloud
      position: absolute
      bottom: 0
      width: 61.8%

      .feature-label
        left: 79%

      .dot-1
        left: 55%
        top: 28%
        --delay: 1.4s;

      .dot-2
        left: 78%
        top: 46%
        --delay: 1.8s;

    .circle-copilot
      position: relative

      .feature-label
        right: 13%

      .dot-1
        top: 20%
        right: 40%
        --delay: 2.2s;

      .dot-2
        top: 25%
        right: 30%
        --delay: 2.6s;

      .dot-3
        top: 50%
        right: 26%
        --delay: 3.3s;

    .feature-dot
      position: absolute
      width: 10px
      height: 10px
      border-radius: 50%
      border: 1px solid #FFFFFF;
      filter: drop-shadow(0px 0px 5px #FFFFFF);
      transition: 318ms
      pointer-events: initial
      cursor: pointer
      --delay: 0s

      @keyframes circle-opacity {
		    from {
          opacity: 0.5
          transform: translate3d(-50%, -50%, 0) scale(0)
        }

		    50%,
        to {
          opacity: 0
          transform: translate3d(-50%, -50%, 0) scale(1)
        }
      }

      &:after
        content: ''
        position: absolute
        animation: circle-opacity 2s cubic-bezier(0.0, 0.0, 0.2, 1) var(--delay) infinite;
        width: 300%;
        height: 300%;
        background: #fff;
        border-radius: 50%;
        opacity: 0;
        left: 50%
        top: 50%
        transform: translate3d(-50%, -50%, 0)

      &:before
        content: ''
        position: absolute
        width: 200%
        height: 200%
        left: 50%
        top: 50%
        transform: translate(-50%, -50%)

      &:hover
        background: #9B9B9B;
        border: 1px solid #FFFFFF;
        box-shadow: 0px 0px 18px #FFFFFF;

    .feature-label
      position: absolute
      bottom: -14px
      z-index: 2

      .label-text
        position: absolute
        white-space: nowrap
        left: 50%
        top: -50px
        font-weight: 800
        font-size: fluid-value(15, 18)
        transform: translateX(-50%)

      .label-dot
        width: 20px
        height: 20px
        border-radius: 50%
        background: white

  .feature-groups
    display: none
    padding: 0 fluid-value(37, 130)
    padding-top:  fluid-value(22, 40)
    font-size: fluid-value(14, 20)
    background: rgba(0, 0, 0, 0.4)

    @media $mediaInMobile
      display: block

    .group-items
      padding-left: 20px

    .feature-group + .feature-group
      margin-top: 2em

    .group-title
      font-weight: 800;

  .cards-part
    display: flex
    max-width: 1340px
    padding-top: fluid-value(55, 190)
    padding-left: fluid-value(0, 55)
    padding-right: fluid-value(0, 55)
    gap: fluid-value(17, 30)

    @media $mediaInMobile
      flex-direction: column

      .limit-wrapper
        max-width: s('max(60vw, 240px)')
        margin: 0 auto

  .blur-card
    background: rgba(255, 255, 255, 0.1)
    border-radius: fluid-value(0, 10)

    .card-title
      font-weight: 800;
      font-size: fluid-value(21, 46)
      line-height: (44/36)
      background: linear-gradient(180deg, #FDFEFF 0%, #AFC9FF 100%)
      background-clip: text
      color: transparent
      text-align: center
      margin-bottom: fluid-value(14, 21)

  .issues-card-wrapper
    flex: (735/442)
    min-width: 0
    padding: fluid-value(21, 48) fluid-value(28, 73)

  .sns-list
    gap: fluid-value(5, 10);
    padding-bottom: 8px

  .sns-card
    flex: 1
    padding: fluid-value(21, 48) 27px

    .card-desc
      font-weight: 600;
      font-size: fluid-value(14, 24);
      line-height: (29/24);
      color: #E6E6E6;
      margin-bottom: fluid-value(24, 52)

    .card-meta
      font-weight: 600;
      font-size: fluid-value(12, 20);
      line-height: (24/20);
      color: #929292;
      margin-bottom: fluid-value(24, 52)

    .sns-item
      justify-content: center;
      align-items: center;
      border: 1.64184px solid #494949;
      backdrop-filter: blur(29.5532px);
      background: linear-gradient(0deg, rgba(60, 60, 60, 0.2) 0%, rgba(255, 255, 255, 0) 100%), rgba(255, 255, 255, 0.1);
      border-radius: 13.1348px;
      padding: fluid-value(9, 16) 6px;
      flex: 40%
      font-weight: 500;
      font-size: fluid-value(15, 26)
      color: #9B9B9B

      .nuxt-icon
        transition: 168ms
        color: white
        font-size: fluid-value(26, 44)
        margin-right: fluid-value(4, 8)

      &:hover
        &,
        .nuxt-icon
          color: var(--brand)

.el-popover.el-popper.feature-dot-popover
  background: rgba(24, 24, 24, 0.9)
  border-radius: 5px
  border: none
  font-size: 14px
  font-weight: 500
  box-shadow: none
  pointer-events: none
  word-break: keep-all
  text-align: initial

  &:after
    content: ""
    pointer-events: none
    user-select: none
    position: absolute
    inset: 0px
    border-radius: inherit
    padding: 1px
    background: radial-gradient(60px circle, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.1))
    -webkit-mask: linear-gradient(black, black) content-box content-box, linear-gradient(black, black)
    -webkit-mask-composite: xor
</style>
