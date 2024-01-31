<template lang="pug">
.header-navbar(
  :class="{ 'has-scroll': y > 0 }"
)
  .navbar-placeholder
  .navbar-fixed
    .limit-container.flex.items-center
      .flex.flex-1.justify-between.items-center
        .menu-list.flex.items-center.gap-12px
          nuxt-link.handler.logo-handler(
            to="/"
            @mouseenter="handleMouseenter"
            @mouseleave="handleMouseleave"
          )
            affine-logo-lottie.navbar-logo(
              v-if="!lottieLoaded"
            )

            client-only
              vue3-lottie.navbar-logo.lottie-logo(
                ref="lottieIcon"
                :autoPlay="false"
                :loop="false"
                :speed="1"
                width="32px"
                height="32px"
                animationLink="/lottie-files/logo-hover.json"
                @onAnimationLoaded="handleLottieLoaded"
              )
          client-only
            .active-tab(
              ref="activeTab"
              :style="activeTabStyle"
            )
          .nav-item
            el-popover(
              trigger="hover"
              transition="popover-popup"
              popper-class="community-popper"
              v-model:visible="isOpenCommunity"
              width="400px"
              placement="bottom-start"
              :show-arrow="false"
              :offset="8"
            )
              template( #reference )
                a.handler-row.gap-1.items-center(
                  @click="isOpenCommunity = !isOpenCommunity"
                  :class="{ 'is-open': isOpenCommunity }"
                )
                  | {{ $t('community') }}
                  nuxt-icon.arrow-icon.text-size-16px( name="ArrowRightSmall2" filled )

              community-navbar

          .nav-item
            scroll-link( to="/about-us" ) {{ $t('aboutUs') }}
          .nav-item
            scroll-link( to="/blog" ) {{ $t('blog') }}
          .nav-item
            scroll-link( to="/pricing" ) {{ $t('price') }}
          .nav-item
            scroll-link( to="/download" ) {{ $t('download') }}

        .right-part.flex.items-center.gap-12px
          login-button( placement="header" )
          stars-on-github-button
</template>

<script setup lang="ts">
import GithubCircle from '~icons/mdi/github-circle'

import { PATH, CONFIG } from '~/utils/constants'
import { useDark } from '@vueuse/core'

const { locale, locales, localeProperties, setLocaleCookie } = useI18n()

const props = defineProps<{
  y: number
}>()

const route = useRoute()
// @FIXME: Get this value after mounted
const isDark = useDark({ initialValue: 'dark' })

let lastCallTime = Date.now()
const LAST_LOTTIE_FRAME = 39

const isReverse = ref(true)
const lottieIcon = ref<any>(null)
const lottieLoaded = ref(false)
const isMounted = ref(false)
const isOpenCommunity = ref(false)
const activeTab = ref(null)
const activeTabStyle = reactive({
  opacity: 0,
  width: '0px',
  transform: '',
  transition: '0s'
})
const affixProgress = computed(() => {
  return Math.min(1, props.y / 50)
})

const refreshActiveTab = async (needTransition = false) => {
  await nextTick()
  const $target = document.querySelector('.nav-item a.is-active')
  if (!$target) return
  const width = $target.clientWidth
  let left = $target.parentElement?.offsetLeft || 0
  activeTabStyle.opacity = 1
  activeTabStyle.width = `${width}px`
  activeTabStyle.transform = `translateX(${left}px)`
  activeTabStyle.transition = needTransition ? '218ms' : '0s'
}

const handleMouseenter = (event: Event) => {
  const animation = lottieIcon.value

  if (!animation) return

  animation.setDirection('forward')
  animation.goToAndStop(1)
  animation.play()
}

const handleMouseleave = (event: Event) => {
  lottieIcon.value?.goToAndStop(LAST_LOTTIE_FRAME)
}

const handleLottieLoaded = () => {
  lottieIcon.value?.goToAndStop(1)
  lottieLoaded.value = true
}

onMounted(() => {
  refreshActiveTab()
  isMounted.value = true
})

watch(() => route.path, () => refreshActiveTab(true))
</script>

<style lang="stylus">
$mediaCompactHeader = '(max-width: 1280px)'

.header-navbar
  --navbar-height: 72px
  --navbar-border-color: var(--primary-gray)
  --navbar-bg-color:  rgba(255, 255, 255, 0.7)
  --navbar-active-bg-color: #E7E7E7
  --github-border-color: #A4A4A4
  --affix-progress: 0
  position: relative
  margin: 0 auto

  &.has-scroll
    .navbar-fixed
      border-bottom: 0.5px solid rgba(0, 0, 0, 0.10);

  .logo-handler
    width: 32px
    height: 32px
    margin-right: 20px
    position relative
    // overflow: hidden

  .navbar-logo
    position absolute
    left: 50%
    top: 50%
    transform: translate3d(-50%, -50%, 0)
    color: var(--logo-color)
    font-size: 32px

    &.lottie-logo
      transform: translate3d(-50%, -50%, 0)

  .github-button
    &:hover
      opacity: 0.8

  .navbar-placeholder
    height: var(--navbar-height)
    pointer-events: none

  .navbar-fixed
    position fixed
    z-index: ($zIndexHeader + 1)
    width: 100%
    left: 0
    top: 0
    background: rgba(248, 248, 247, 0.90);
    border-bottom: 0.5px solid transparent;
    backdrop-filter: blur(15px);
    transition: background 318ms

    .limit-container
      padding: 20px 32px

    .nav-item > a,
    .el-dropdown
      display: block
      padding: 0 12px
      border-radius: 12px;
      color: black
      padding: 8px 12px
      border-radius: 4px;
      transition: 318ms
      letter-spacing: -0.28px

      &.handler-row
        display: flex
        cursor pointer

        .arrow-icon
          transition: 160ms var(--ease-out-quad)
          transform: rotate(90deg)

      &.is-active,
      &:hover
        color: black
        background: rgba(0, 0, 0, 0.04)

      &.is-open
        background: rgba(0, 0, 0, 0.04)

        .arrow-icon
          transform: rotate(-90deg)

    .right-part
      overflow: hidden
      // @TODO: Pass dynamic container width
      padding-right: 8px
      transition-duration: 0.4s
      // transition-timing-function: cubic-bezier(.85,.0,.3,.1)
      // transition-delay: 0.2s

      .flex
        padding-left: 8px
        transition-duration: 0.4s
        // transition-timing-function: cubic-bezier(.85,.0,.3,.1)
        opacity: calc(var(--affix-progress))
        // transition-delay: 0.3s

        > *
          flex-shrink: 0

    .try-button
      height: 34px
      font-weight: 800
      font-size: 15px

      &:hover
        border-width: 0px !important

    .menu-list
      position relative

      > span
        display none

      .active-tab
        position absolute
        border-radius: 12px
        height: 24px
        top: 0px
        background: rgba(255, 255, 255, 0.1)
        pointer-events: none

      .nav-item
        font-weight: 500;
        font-size: 14px;
        line-height: 20px;
        white-space: nowrap;

  /html.dark &
    --github-border-color: #A4A4A4
    --navbar-border-color: #717171
    --navbar-bg-color: rgba(0, 0, 0, 0.7)
    --navbar-active-bg-color: #383838

.lang-switcher-dropdown
  margin-top: 12px
  width: 120px
  font-weight: 800

  .el-dropdown-menu__item
    font-size: 16px
    height: 40px

    &:hover
      background-color: var(--el-color-primary-light-9)

  .el-popper__arrow
    display: none

.el-popover.el-popper.community-popper
  border-radius: 8px;
  border: 1px solid var(--black-08, rgba(0, 0, 0, 0.08));
  background: var(--White-Background, #F8F8F7);
  box-shadow: 0px 5px 25px 0px rgba(0, 0, 0, 0.10);
  padding: 16px 12px
  margin-left: -12px

</style>
