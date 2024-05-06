<template lang="pug">
.pricing-bento

  .bento-cell.bento-cooperation
    .cell-header
      .cell-title Cloud Cooperation
      .cell-desc Real-time collaborative document and whiteboard editing.

    .cell-bg

    .cell-body
      .hero-cover-wrapper
        video-play-when-visible( poster="/overview/hero-cover.png" src="/overview/hero-cover.mp4" isActive )

  .bento-cell.bento-time-machine
    .cell-header
      .cell-title Cloud Time Machine
      .cell-desc Access and restore any document version, anywhere, on any device.

    .cell-bg
    .time-base-mark

    .cell-body
      .doc-version(
        v-for="item in DOC_VERSIONS"
      )
        .doc-version-time
          .time-line
          .time-text {{ item.time }}
        .doc-version-card.flex.flex-col.gap-2
          .item-title  {{ item.title }}
          .item-meta( :class="[`count-${item.backlinks}`]" )
          .item-content {{ item.content }}
  .bento-cell.bento-drive
    .cell-header
      .cell-title Cloud Drive
      .cell-desc Your files, always with you.

    .cell-body
      .drive-file-item.flex.flex-col.gap-2(
        v-for="item in DRIVE_FILES"
      )
        .item-title  {{ item.title }}
        .item-meta
        .item-content {{ item.content }}
  .bento-cell.bento-notification
    .cell-header
      .cell-title
        | Cloud Notification Center
        .coming-soon-label Coming Soon
      .cell-desc Get notified, anywhere.

    .cell-body
      .notif-item.flex.gap-10px(
        v-for="item in NOTIFS"
      )
        .cover.avatar(
          :style="{ backgroundImage: `url(${item.avatar})` }"
        )
        .item-body
          .item-message {{ item.message }}
          .flex.gap-4px
            .item-date Yesterday
            .item-doc {{ item.docTitle }}

  .bento-cell.bento-everywhere
    .cell-header
      .cell-title
        | Your Notes, Everywhere
        .coming-soon-label Coming Soon
      .cell-desc One experience, any device.

    .cell-body
      .bg-img.notif-button
      .bg-img.desktop-screenshot
      .bg-img.mobile-screenshot

</template>

<script setup lang="ts">
const NOTIFS = [
  { avatar: '/pricing/notif-avatar1.png', message: 'Hwang invite you join the doc.', docTitle: 'Doc: Pals’ works - Fed 2024' },
  { avatar: '/pricing/notif-avatar2.png', message: 'QPomelo mentioned You.', docTitle: 'Doc: AFFiNE - Take your notes to the next level with our powerful note-taking, mind mapping, and knowledge base features.' },
  { avatar: '/pricing/notif-avatar3.png', message: 'Tsi-heng Tien edited the doc.', docTitle: 'Doc: Personal Home' },
]

const DOC_VERSIONS = [
  {
    time: '8:30 AM',
    backlinks: 1,
    title: 'AFFiNE ',
    content: `There are lots of apps out there, so why chose AFFiNE?`
  },
  {
    time: '9:00 AM',
    backlinks: 1,
    title: 'AFFiNE - The all-in-one knowledge OS for students, scholars, and creative professionals',
    content: `There are lots of apps out there, so why chose AFFiNE?

    AFFiNE is feature-rich`
  },
  {
    time: '9:30 AM',
    backlinks: 4,
    title: 'AFFiNE - The future of note-taking',
    content: `There are lots of apps out there, so why chose AFFiNE?

    AFFiNE is feature-rich - offering a wide-range of blocks that empower your docs

    AFFiNE is privacy focused - with a local-first approach, keep control of your data

    AFFiNE is open-source - you can check us out on`
  },
  {
    time: '10:00 AM',
    backlinks: 4,
    title: 'AFFiNE - Take your notes to the next level with our powerful note-taking, mind mapping, and knowledge base features.',
    content: `There are lots of apps out there, so why chose AFFiNE?

    AFFiNE is feature-rich - offering a wide-range of blocks that empower your docs

    AFFiNE is privacy focused - with a local-first approach, keep control of your data

    AFFiNE is open-source - you can check us out on`
  },
]

const DRIVE_FILES = [
  { title: 'Breath of the Wild: Redefining Game Design',
    content: `Introduction

      At GDC 2017, Hidemaro Fujibayashi, Satoru Takizawa, and Takuhiro Dohta from Nintendo shared their insights on The Legend of Zelda: Breath of the Wild's groundbreaking game mechanics.

      One standout feature is the "multiplicative gameplay," which empowers players to interact with the game world in diverse ways, leading to surprising outcomes.
    `
  },
  { title: 'More Is Different',
    content: `The reductionist hypothesis may still be a topic for controversy among philosophers, but among the great majority of active scientists I think it is accepted without questions.

    The workings of our minds and bodies, and of all the animate or inanimate matter of which we have any detailed knowledge, are assumed to be controlled by the same set of fundamental laws, which except under certain extreme conditions we feel we know pretty well.
    `
  },
  { title: 'HOWTO: Be more productive',
    content: `“With all the time you spend watching TV,” he tells me, “you could have written a novel by now.”

    It’s hard to disagree with the sentiment — writing a novel is undoubtedly a better use of time than watching TV — but what about the hidden assumption?

    Such comments imply that time is “fungible” — that time spent watching TV can just as easily be spent writing a novel. And sadly, that’s just not the case.
    `
  },
  { title: 'Learning with retrieval practice',
    content: `Are there any specific techniques to make the process of learning more effective?

    Students often re-read, underline, or highlight materials, thinking that it will help them learn better. But, the best method for really turning information into long-term memory is to use what is called ‘retrieval practice’.

    It simply means trying to retrieve the information from your own brain, instead of looking at a sheet of paper.
    `
  },
  { title: 'This is Local-first software',
    content: `You own your data, in spite of the cloud

    Cloud apps like Google Docs and Trello are popular because they enable real-time collaboration with colleagues, and they make it easy for us to access our work from all of our devices.

    However, by centralizing data storage on servers, cloud apps also take away ownership and agency from users. If a service shuts down, the software stops functioning, and data created with that software is lost.
    `
  },
]
</script>

<style lang="stylus">
.pricing-bento
  width: 100%
  min-height: (570px + 16px + 270px)
  display: grid
  grid-template-columns: repeat(9, 1fr)
  grid-template-rows: 1fr 1fr 295px
  gap: 16px 16px
  grid-template-areas:
    "cooperation cooperation cooperation cooperation cooperation time-machine time-machine time-machine time-machine"\
    "cooperation cooperation cooperation cooperation cooperation time-machine time-machine time-machine time-machine"\
    "drive drive drive notification notification notification everywhere everywhere everywhere"

  @media (max-width: 960px)
    display: flex
    flex-direction: column

  .bg-img
    background-size: contain
    background-repeat: no-repeat

  .bento-cell
    position relative
    background: #FFFFFF
    border: 1px solid #E3E2E4
    box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.05)
    border-radius: 16px
    overflow: hidden

    .cell-header
      padding: 20px 24px 0px 24px

    .cell-title
      display: flex
      gap: 6px
      align-items: center
      font-weight: 500
      font-size: 15px
      line-height: 24px
      color: var(--theme, #000000)

    .coming-soon-label
      padding: 2px 6px
      border: 1px solid rgba(0, 0, 0, 0.3)
      border-radius: 100px
      color: rgba(0, 0, 0, 0.3)
      font-weight: 500
      font-size: 10px
      line-height: 14px
      text-align: center

    .cell-desc
      font-weight: 400;
      font-size: 15px;
      line-height: 24px;
      color: #121212;

  .bento-cooperation
    --theme: #D34F0B
    grid-area: cooperation
    background: #F4F4F4

    .cell-bg
      position absolute
      inset: 0
      pointer-events: none
      background-image: radial-gradient(#E0E0E0 2px, transparent 2px);
      background-size: 28px 28px;
      -webkit-mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1) 14%, rgba(0, 0, 0, 1));

    .cell-body
      padding: 36px

    .cell-header,
    .cell-body
      position relative
      z-index 2

    .hero-cover-wrapper
      display: flex
      border-radius: 4px
      overflow: hidden
      box-shadow: 0 2px 19px 2px rgba(0, 0, 0, 0.1)

  .bento-time-machine
    --theme: rgba(33, 89, 211, 1)
    grid-area: time-machine

    .time-base-mark
      position absolute
      height: 100%
      width: 16px
      top: 52px
      pointer-events: none
      left: 20px
      background-image: linear-gradient(rgba(0, 0, 0, 0.1) 1px, transparent 1px);
      background-size: 16px 10px
      -webkit-mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1) 14%, rgba(0, 0, 0, 1));

    .cell-bg
      position absolute
      inset: 0
      pointer-events: none
      width: 637px;
      height: 637px;
      background: radial-gradient(49.87% 49.87% at 50.13% 50.13%, rgba(33, 89, 211, 0.1) 0%, rgba(33, 89, 211, 0) 100%)
      left: -319px;

    .cell-header,
    .cell-body
      position relative
      z-index 2

    .cell-body
      display: flex
      flex-direction: column
      align-items: flex-start
      height: 500px
      padding-top: 10px

    .doc-version
      position relative
      display: flex
      justify-content: flex-end
      min-width: 100%
      padding-left: 140px
      height: 160px
      pointer-events: none
      --space: 20px
      --line-color: #BEC2CA

      &:nth-child(2)
        z-index: 2
        top: s('calc(var(--space) * -1)')

      &:nth-child(3)
        z-index: 3
        top: s('calc(var(--space) * -2)')

      &:nth-child(4)
        z-index: 4
        top: s('calc(var(--space) * -3)')

      &:hover
        --line-color: #000

        .doc-version-time
          .time-text
            font-size: 15px
            color: #000

        .doc-version-card
          transform: translate3d(-10px, -18px, 0)

    .doc-version-time
      position absolute
      width: 141px
      top: 20px
      left: 20px

      .time-line
        height: 1px
        width: 24px
        background-color: var(--line-color)
        transition: 318ms

      .time-text
        position absolute
        left: 30px
        top: 50%
        transform: translateY(-50%)
        font-weight: 500;
        font-size: 11px;
        line-height: (13/11);
        color: #8E8D91;
        transition: 318ms

    .doc-version-card
      padding: 20px 24px 60px
      background: #FFFFFF
      border: 1px solid #E3E2E4
      box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.05)
      border-radius: 8px
      width: 320px
      height: 160px
      transition: 318ms
      pointer-events: initial
      margin-right: -10px

      .item-title
        font-weight: 600;
        font-size: 17px;
        line-height: 21px;
        color: #000000;
        white-space: pre
        overflow: hidden
        text-overflow: ellipsis
        flex-shrink: 0

      .item-content
        color: #000000
        font-size: 13px
        line-height: 16px
        white-space: pre-line

      .item-meta
        background-size: contain
        width: 100%
        aspect-ratio: 544/28
        background-repeat: no-repeat
        flex-shrink: 0

        &.count-1
          background-image: url(/pricing/tm-meta-1.png)

        &.count-4
          background-image: url(/pricing/tm-meta-4.png)

  .bento-drive
    --theme: rgba(20, 147, 67, 1)
    grid-area: drive

    .cell-body
      position relative
      padding-top: 50px
      height: 230px
      max-width: 400px
      margin: 0 auto

    .drive-file-item
      --y: 0px
      position absolute
      width: 360px
      height: 360px
      background: #FFFFFF;
      border: 1px solid #E3E2E4;
      box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.05);
      border-radius: 8px;
      padding: 20px 24px 60px;
      transform: rotate(8deg) translateY(var(--y))
      transition: 318ms

      &:hover
        --y: -20px

      &:nth-child(1)
        left: -38px

      &:nth-child(2)
        left: 13px
        z-index 2

      &:nth-child(3)
        left: 88px
        z-index 3

      &:nth-child(4)
        left: 160px
        z-index 4

      &:nth-child(5)
        left: 236px
        z-index 5

      .item-meta
        background-image: url(/pricing/drive-file-meta.png)
        background-size: contain
        width: 100%
        aspect-ratio: 625/29

      .item-title
        font-weight: 600;
        font-size: 17px;
        line-height: 21px;
        color: #000000;

      .item-content
        color: #000000
        font-size: 13px
        line-height: 16px
        white-space: pre-line

  .bento-notification
    --theme: rgba(7, 130, 160, 1)
    grid-area: notification

    .cell-body
      overflow hidden
      padding-left: 24px
      padding-top: 12px
      height: 240px
      max-width: 400px
      margin: 0 auto

    .notif-item
      width: 360px
      background: #FFFFFF
      border: 1px solid #E3E2E4
      box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.05)
      border-radius: 8px
      padding: 16px 20px
      margin-bottom: 8px
      transition: 318ms

      &:hover
        transform: translateX(-14px)

    .avatar
      width: 36px
      height: 36px
      flex-shrink: 0
      background-color: transparent

    .item-body
      font-size: 13px
      line-height: 16px
      overflow: hidden

    .item-message
      font-weight: 600
      font-size: 17px
      line-height: 21px
      color: #000000
      margin-bottom: 2px

    .item-doc
      white-space: pre
      color: #000000
      min-width: 0
      text-overflow: ellipsis

    .item-date
      color: #8E8D91

  .bento-everywhere
    --theme: rgba(132, 46, 211, 1)
    grid-area: everywhere

    .cell-body
      position relative
      width: 100%
      aspect-ratio: 400/260
      max-width: 400px
      margin: 0 auto

    .bg-img
      transition: 318ms

    .notif-button
      position absolute
      background-image: url(/pricing/bento-everywhere-button.png)
      width: 138px
      aspect-ratio: 277/64
      left: 50%
      bottom: -32px
      transform: translate3d(-50%, 0, 0)
      z-index 2
      opacity 0
      transition-delay: 50ms

    .desktop-screenshot
      position absolute
      background-image: url(/pricing/bento-everywhere-desktop.png)
      width: 352px
      aspect-ratio: 352/229
      left: -58px
      top: 25px
      transform-origin: bottom left

    .mobile-screenshot
      position absolute
      background-image: url(/pricing/bento-everywhere-mobile.png)
      width: 132px
      aspect-ratio: 132/260
      right: 10px
      transform-origin: bottom right
      transition-delay: 20ms

    &:hover
      .desktop-screenshot
        transform: rotate(-7.43deg)

      .mobile-screenshot
        transform: rotate(12.58deg)

      .notif-button
        bottom: 28px
        opacity 1

</style>
