<template lang="pug">
.overview-user-stories-light
  .limit-container.flex.flex-col
    .upper-part
      h2.section-subtitle.section-grad-title
        | {{ $t('overviewPage.userStoriesLightTitle') }}
        span.color-brand AFFiNE
    .marquee-wrapper.flex.flex-nowrap
      .stories-list( ref="el" )
        user-story-card-light(
          v-for="story in stories"
          :key="story.name"
          :story="story"
        )
      .stories-list.marquee-copy
        user-story-card-light(
          v-for="story in stories"
          :key="story.name"
          :story="story"
        )
</template>

<script setup lang="ts">
import { PATH, COMMUNITY_SNS_LIST } from '~/utils/constants'

const stories: UserStory[] = [
  { avatar: '/user-stories/Frame 7.png', name: 'Dan Charles', position: 'CEO - The Keyman Group', content: `Really impressed with how AFFiNE is able to streamline our team's workflow and improve productivity. Switch between different modes to write, draw, and plan all in one place and with data security which we are most concerned about. It makes everything easy.` },
  { avatar: '/user-stories/Frame 3.png', name: 'Orange-Cheng', position: 'Product manager of the TATDOD Space', content: `Extremely impressed with the quality and capabilities of AFFiNE, particularly its simple and intuitive interface. The attention to detail that has been put into every aspect of the product, from its design to its functionality, is truly exceptional. The product's innovative features and capabilities are sure to make a significant impact in the industry, providing customers with a seamless and user-friendly experience.` },
  { avatar: '/user-stories/default.svg', name: 'Maestro', position: 'Graphic Designer', content: `With AFFiNE's whiteboard feature, I sketch, doodle, and visualize ideas collaboratively in real time. It's an endless canvas for our creativity, allowing us to refine our projects to perfection. The Kanban boards complement our artistic process, ensuring impeccable organization and project tracking.` },
  { avatar: '/user-stories/Frame 8.png', name: 'TinsFox', position: 'Front-end development engineer', content: `AFFiNE is by far the best open-source community I’ve come across. Open, inclusive and user-first. At the same time, AFFiNE is also a great product. Being open source means more possibilities and more exciting things can be created.` },
  { avatar: '/user-stories/Frame 2.png', name: 'Eliot', position: 'Student', content: `AFFiNE is an open source that is close to its community and filled with useful features. I use edgeless mode to connect all my knowledge to a single page.` },
  { avatar: '/user-stories/default.svg', name: 'Summer123', position: 'The Founder of a fashion brand', content: `AFFiNE's Kanban project management simplifies my hectic workload. Easy task management feels like a personal assistant. Yet, the standout is the whiteboard, streamlining brainstorming, project planning, and workflow visualization.` },
  { avatar: '/user-stories/default.svg', name: 'Joanna', position: 'Marketing Manager', content: `AFFiNE revolutionizes our creative collaboration. Kanban boards effortlessly manage tasks and campaigns. The whiteboard sparks innovation for marketing strategies and content planning, making AFFiNE a vital tool for our creative team.` },
  { avatar: '/user-stories/Frame 1.png', name: 'Ragma.TP', position: 'Project manager of Tiktok', content: `I'm thrilled with how effortless it was to set up workspaces, arrange pages, and collaborate with my team members in real-time. AFFiNE just makes everything easy, streamlines our workflow and boosts our productivity.` },
  { avatar: '/user-stories/Frame 6.png', name: 'Mattias', position: 'Student', content: `I've been looking for an open-source note-taking solution for ages now and AFFiNE is the first to support all the features I need -- and it even manages to do this while being absolutely beautiful! AFFiNE is very feature rich and the synchronization is also awesome.` },
  { avatar: '/user-stories/default.svg', name: 'BusyBee', position: 'Full-time Mom', content: `Being a working mom with a hectic schedule, AFFiNE is my ultimate lifesaver. Its Kanban boards help me manage household tasks, kids' activities, and work projects with ease. Whether it's organizing chores, tracking school events, or managing deadlines, AFFiNE's Kanban feature keeps me on top of it all.` },
  { avatar: '/user-stories/Frame 4.png', name: 'Alice', position: 'Student from KCL', content: `One feature I particularly appreciate is the ability to seamlessly switch from typing to handwriting, adding a touch of elegance and versatility to my work.` },
  { avatar: '/user-stories/Frame 5.png', name: 'PanicN3xus', position: 'User', content: `AFFiNE is an exceptional project that elevates note-making to a whole new level. I am highly impressed by the number of features that it brings to the table. Having tried several other open-source note-making software, I can confidently say that AFFiNE is the best.` },
  { avatar: '/user-stories/default.svg', name: 'Dynamo', position: 'Freelancer', content: `AFFiNE's Kanban boards are my go-to for life organization, promoting discipline, and habit consistency. I outline goals, plan, and track progress, be it fitness or reading challenges. It's my trusted tool for a fulfilling, disciplined life.` },
]
</script>

<style lang="stylus">
.overview-user-stories-light
  padding: fluid-value(60, 120, 744, 1024) 0 fluid-value(44, 104, 744, 1024)

  .upper-part
    @media $mediaInXS
      padding-left: 12px
      padding-right: 12px

  .section-subtitle
    margin: 0
    font-size: fluid-value(24, 48)
    white-space: pre-line
    line-height: 118.75%
    font-weight: 500
    letter-spacing: (-1.92/48em);
    margin-bottom: fluid-value(32, 48, 1024)

  .action-button
    margin-top: 24px

  .marquee-wrapper
    &:hover
      .stories-list
        // animation-play-state: paused

  .marquee-copy
    display: none

    @media (max-width: 480px)
      display: block

  .stories-list
    position: relative
    width: 100%
    column-count: 4
    gap: 16px

    @keyframes panningLoop
      0%
        transform: translateX(0px)

      100%
        transform: translateX(-100%)

    @media (max-width: 1024px)
      column-count: 3

    @media (max-width: 744px)
      column-count: 2

    @media (max-width: 480px)
      flex-shrink: 0
      column-count: 5
      width: 1440px
      padding-left: 12px
      padding-right: 12px
      animation panningLoop 12s linear infinite
      vertical-align: top;
      animation-play-state: running
      will-change: transform

    .user-story-card-light
      // flex: 1 0 258px
      -webkit-column-break-inside: avoid;
      page-break-inside: avoid;
      break-inside: avoid;
      margin-bottom: 16px
</style>
