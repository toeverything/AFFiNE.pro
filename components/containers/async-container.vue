<template lang="pug">
.async-container
  span( v-if="hasContent" )
    slot

  //- Loading
  ui-loading(
    v-if="!isError"
    :needPlaceholder="needLoadingPlaceholder || hasMore"
    :isInitial="false && !hasContent"
    :isLoading="isLoading"
  )
  slot( v-if="!isLoading && !hasContent && !isError" name="empty" )

  //- LoadMore Error
  .load-more-error.flex.items-center.justify-center.delay-display(
    v-if="!isLoading && hasContent && isError"
  )
    | Page load error
    span.retry( @click="handleActionClick" ) Please try again

  //- Empty or Load Error
  client-only
    el-empty.delay-display(
      v-if="!isLoading && !hasContent && hasTip"
      :image="placeholderImage"
      :description="finalTips"
    )
      el-button(
        v-if="isError"
        type="primary"
        @click="handleActionClick"
      ) {{ finalActionText }}
</template>

<script>
export default {
  props: {
    isLoading: {
      type: [Boolean, Object, Number]
    },
    isInitial: {
      type: Boolean,
      default: true
    },
    hasTip: {
      type: Boolean,
      default: true
    },
    hasErrorImage: {
      type: Boolean,
      default: true
    },
    hasErrorBack: {
      type: Boolean,
      default: false
    },
    errorBackUrl: {
      type: String
    },
    isError: {
      type: Boolean
    },
    needLoadingPlaceholder: {
      type: [Boolean, Object, Number],
      default: false
    },
    placeholderImage: {
      type: String
    },
    hasMore: {
      type: [Boolean, Object, Number]
    },
    hasContent: {
      type: [Boolean, Object, Number]
    },
    transition: {
      type: String,
      default: 'fade'
    },

    placeholderOptions: {
      type: Object
    },

    tips: {
      type: String
    },
    emptyTips: {
      type: String
    },
    errorTips: {
      type: String
    },

    errorActionText: {
      type: String
    },

    actionText: {
      type: String
    },

    onAction: {
      type: Function
    },

    onErrorAction: {
      type: Function
    }
  },

  computed: {
    rootClassNames() {
      return [`type-${this.type}`]
    },

    finalTips() {
      if (this.tips) {
        return this.tips
      }

      if (!this.isError) {
        return this.emptyTips || 'No content'
      } else {
        return this.errorTips || 'Load error'
      }
    },

    finalActionText() {
      if (this.isError) {
        return this.errorActionText || 'Refresh'
      }

      if (this.actionText) {
        return this.actionText
      }

      return null
    }
  },

  methods: {
    handleRetryTap() {
      platform.startPullDownRefresh()
    },

    handleActionClick() {
      if (this.isError) {
        if (this.onErrorAction) {
          this.onErrorAction()
        } else {
          location.reload()
        }
      } else {
        this.onAction && this.onAction()
      }
    }
  }
}
</script>

<style lang="stylus">
.edge-placeholder
  padding: 40px 20px 20px
  box-sizing: border-box

  .info-tips
    font-size: 14px
    // text-mute()

.async-container
  width: 100%

  .retry
    color: lighten(#FF4C50, 20%)
    font-weight: 500
    cursor pointer
    margin-left: 8px

  .load-more-error
    height: 120px
    color: #686868
    font-size: 75%

  .el-empty
    &__image
      // filter: hue-rotate(-186deg)

    &__description
      font-weight: 700;
      font-size: 20px;
      line-height: 28px;
      color: #BABFC8;
</style>
