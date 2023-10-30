<template lang="pug">
.stay-focused-flow
  .content-wrapper.flex.justify-center.items-center
    .module-label.module-empty.is-active
    .module-label.module-moodboard(
      :class="{ 'is-active': currentFlow === 'moodboard' }"
    )
      nuxt-icon( name="moodboard" )
      | Moodboard
    .module-label.module-wiki.is-muted
      nuxt-icon( name="wiki" )
      | Doc & Wiki
    .module-label.module-storyboarding(
      :class="{ 'is-active': currentFlow === 'storyboarding' }"
    )
      nuxt-icon( name="storyboarding" )
      | Storyboarding

    .module-label.module-tasks(
      :class="{ 'is-active': currentFlow === 'tasks' }"
    )
      nuxt-icon( name="block-5" )
      | Project Tasks
    .module-label.module-mindmap(
      :class="{ 'is-active': currentFlow === 'mindmap' }"
    )
      nuxt-icon( name="block-6" )
      | Mind mapping

    .module-flow.module-moodboard
      <svg width="36" height="64" fill="none">
        <path d="M0.5 0.666748H12C14.7614 0.666748 17 2.90532 17 5.66675V57.6667C17 60.4282 19.2386 62.6667 22 62.6667H35" stroke="#1E96EB" stroke-linecap="square" stroke-linejoin="round" pathLength="1" />
      </svg>
    .module-flow.module-storyboarding
      <svg width="55" height="23" fill="none">
        <path d="M0.5 21.6667H49.5C52.2614 21.6667 54.5 19.4282 54.5 16.6667V0.666748" stroke="#1E96EB" stroke-linecap="square" stroke-linejoin="round" pathLength="1" />
      </svg>
    .module-flow.module-tasks
      <svg width="32" height="66" fill="none">
        <path d="M31.5 0.666748H20C17.2386 0.666748 15 2.90532 15 5.66675V60.1667C15 62.9282 12.7614 65.1667 10 65.1667H1" stroke="#1E96EB" stroke-linecap="square" stroke-linejoin="round" pathLength="1"/>
      </svg>
    .module-flow.module-mindmap
      <svg width="27" height="55" fill="none">
        <path d="M26 54.1667H20C17.2386 54.1667 15 51.9282 15 49.1667V6.16675C15 3.40532 12.7614 1.16675 10 1.16675H1" stroke="#1E96EB" stroke-linecap="square" stroke-linejoin="round" pathLength="1"/>
      </svg>

    .logo-group
      .logo-circle1
        .logo-circle2
          .logo-img

</template>

<script setup lang="ts">
import { gsap } from 'gsap'


const currentFlowIndex = ref(-1)
const currentFlow = computed(() => {
  if (currentFlowIndex.value < 0) {
    return null
  }

  return gsap.utils.wrap(moduleFlows, currentFlowIndex.value)
})

const moduleFlows = [
  'moodboard',
  'storyboarding',
  'mindmap',
  'tasks',
]

const setupAnimation = () => {
  let lastIndex = 0
  const duration = 1
  const delay = 0.3

  const timeline = gsap.timeline({
    repeat: -1,
    defaults: {
      duration: 1,
    }
  })

  moduleFlows
    .map((name, i) => {
      timeline
        .fromTo(`.module-flow.module-${name} path`, {'--strokeDashoffset': 2}, {
          '--strokeDashoffset': 0,
          duration: 0.5,
          overwrite: true,
          delay: 1,
          onStart: () => {
            currentFlowIndex.value = i
          },
        })
        .to(`.module-flow.module-${name} path`, {
          '--strokeDashoffset': -1.2,
          duration: 0.5,
          delay: 0.3,
          onStart: () => {
            currentFlowIndex.value = -1
          },
        })
    })
}

onActivated(() => {
  setupAnimation()
})
</script>

<style lang="stylus">
.stay-focused-flow
  overflow: hidden

  .content-wrapper
    top: 0
    width: 500px
    height: 100%
    position absolute
    left: 50%
    transform: translate(-50%)

  .module-flow
    position absolute

    path
      stroke-dasharray: 2
      stroke-dashoffset: var(--strokeDashoffset, 2)

    &.module-moodboard
      left: 160px
      top: 41px
    &.module-storyboarding
      left: 196px
      bottom: 18px
    &.module-tasks
      left: 305px
      top: 38px
    &.module-mindmap
      left: 306px
      top: 102.5px
      svg
        transform: scaleX(1.1)

  .module-label
    position absolute
    display flex
    min-width: 100px
    height: 40px
    padding: 6px 16px 6px 10px
    align-items: center
    gap: 4px
    border-radius: 8px
    font-size: 15px
    font-weight: 500
    line-height: normal
    letter-spacing: -0.45px
    transition: 500ms
    background: #FFF

    .nuxt-icon
      font-size: 28px

    &.module-moodboard
      left: 21px
      top: 21px

    &.module-storyboarding
      left: 40px
      top: 162px

    &.module-mindmap
      left: 332.5px
      top: 137px

    &.module-tasks
      left: 337px
      top: 18px

    &.module-empty
      opacity: 0.5
      top: -20px
      left: 184px

    &.module-wiki
      top: 93px
      left: 44.5px

    &,
    &.is-muted
      box-shadow: none
      border: 1px solid var(--black-04, rgba(0, 0, 0, 0.04))
      color: #CCC

    &.is-active
      border: 1px solid rgba(0, 0, 0, 0.10)
      box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.08)
      color: #8E8D91

  .logo-group
    position: relative
    width: 110px
    height: 110px

    .logo-circle1,
    .logo-circle2
      border: 1px solid alpha(#0A2E65,10%)
      display: flex
      align-items: center
      justify-content: center

    .logo-circle1
      width: 100%
      height: 100%
      border-radius: 26px

    .logo-circle2
      border-radius: 23px
      width: 96px
      height: 96px

    .logo-img
      background-size: contain
      aspect-ratio: 164/165
      width: 82px
      background-image: url(/overview/stay-focused-logo.png)
</style>
