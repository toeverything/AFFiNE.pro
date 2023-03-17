<template lang="pug">
div(
  v-if="(needPlaceholder && !isInitial) || isLoading"
  :class="rootClassNames"
)
  transition( name="fade" :duration="168" )
    .initial-spinner( v-if="isInitial" )
      .loading-spinner.dot-spinner
        .double-bounce1
        .double-bounce2
    div( v-else-if="needPlaceholder || isLoading" )
      circle-loading.loading-spinner(
        v-if="isLoading"
      )
      p.loading-tips(
        v-if="text"
      )
        | {{ text }}
</template>

<script>
export default {
  props: {
    isLoading: {
      type: [Boolean, Number],
      default: true
    },

    isInitial: {
      type: Boolean
    },

    needPlaceholder: {
      type: [Boolean, Object, Number]
    },

    text: {
      type: String
    }
  },

  data() {
    return {}
  },

  computed: {
    rootClassNames() {
      const { isLoading, isInitial } = this
      const status = isLoading ? 'loading' : 'loaded'
      const type = isInitial ? 'initial' : 'more'

      return ['loading', `status-${status}`, `type-${type}`]
    }
  }
}
</script>

<style lang="stylus">
@keyframes spinnerBounce
  0%,
  100%
    transform: scale(0)

  50%
    transform: scale(1)

.loading
  position: relative

  &-placeholder
    height: 108px

  .loading-spinner
    width: 40px
    height: 40px

  .double-bounce1,
  .double-bounce2
    position: absolute
    top: 0
    left: 0
    width: 100%
    height: 100%
    border-radius: 50%
    background-color: var(--brand)
    opacity: 0.3
    animation: spinnerBounce 1.5s infinite ease-in-out

  .double-bounce2
    animation-delay: -0.75s

  &.type-initial
    z-index: 200
    min-height: 286px
    pointer-events: none

    .initial-spinner
      position: absolute
      transform: translate3d(-50%, -50%, 0)
      left: 50%
      top: 50%

    &.status-loaded
      transition: 218ms
      opacity: 0

  &.type-more
    position relative
    height: 120px

    .loading-spinner
      left: 50%
      top: 50%
      position: absolute
      transform: translate(-50%, -50%)
      font-size: 46px

    .loading-tips
      padding-top: 90px
      text-align: center
      color: alpha(white, 0.8)

    &.status-loaded
        transition: 268ms
</style>
