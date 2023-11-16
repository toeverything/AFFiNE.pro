<template lang="pug">
.page.page-not-found
  .section-hero
    .container.flex.flex-col
      .doc-frame(
        :class="[ `mode-${mode}` ]"
      )
        .frame-header.flex.justify-center.gap-12px
          template( v-if="isEditingName" )
            el-input.max-w-400px(
              autofocus
              placeholder="Enter page name"
              :maxlength="40"
              v-model="docName"
              @keydown.enter="isEditingName = false"
              @blur="isEditingName = false"
            )
          template( v-else )
            .demo-tab-bar.flex.gap-9px
              .tab-handler( :class="{ 'is-active': mode === DocMode.Write }" @click="() => mode = DocMode.Write" )
                lottie-hover-icon(
                  animationLink="/lottie-files/page-hover.json"
                )
              .tab-handler( :class="{ 'is-active': mode === DocMode.Draw }" @click="() => mode = DocMode.Draw" )
                lottie-hover-icon(
                  animationLink="/lottie-files/edgeless-hover.json"
                )

            el-dropdown(
              trigger="click"
              popper-class="doc-name-dropdown"
              placement="bottom"
            )
              .doc-name.flex.items-center.gap-6px
                | {{ docName || 'Untitled'}}
                nuxt-icon.text-size-24px( name="ArrowDownSmall" filled)
              template( #dropdown )
                el-dropdown-menu
                  el-dropdown-item( @click="handleRenameClick" )
                    nuxt-icon( name="rename" )
                    | Rename
                  .divider
                  el-dropdown-item
                    nuxt-icon( name="Link" )
                    nuxt-link( to="/" ) {{ $t('notFoundPage.backToHome') }}
        .doc-body.flex.flex-col.items-center
          .doc-block.block-not-found( contenteditable )
            .block-title.mb-2 {{ docName || 'Untitled'}}
            .block-desc.mb-4 {{ t('notFoundPage.desc') }}
            nuxt-link.back-handler.flex.items-center( to="/" )
              nuxt-icon( name="Link" )
              | {{ $t('notFoundPage.backToHome') }}

        .bg-img.draw-toolbar(
          @click="handleDrawToolbarClick"
        )
</template>

<script lang="ts" setup>
import { ElMessage } from 'element-plus'
const { t } = useI18n()

enum DocMode {
  Write='write',
  Draw='draw'
}

const docName = ref('404')
const isEditingName = ref(false)
const mode = ref(DocMode.Write)

useHead({
  title: t("notFoundPage.title"),
})

const handleRenameClick = () => {
  isEditingName.value = true
}

const handleDrawToolbarClick = () => {
  ElMessage.info('Sorry, draw live demo is WIP...')
}
</script>

<style lang="stylus">
.page.page-not-found
  padding: fluid-value(20, 60) 20px

  .container
    --width: 700px

  .doc-frame
    position relative
    overflow hidden
    border-radius: 10px;
    border: 1px solid #EEE;
    background: var(--white-white, #FFF);
    box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.12);

  .frame-header
    padding: 16px
    height: 70px
    border-bottom: 1px solid #EEEEEE

    .tab-handler
      border-radius: 9.25px;
      transition: 318ms
      cursor pointer
      width: 29px
      height: 29px

      path
        fill: var(--path-color) !important

      &.is-active
        background: #FFFFFF;
        --path-color var(--brand)
        box-shadow: 0px 0px 4.625px 0px rgba(66, 65, 73, 0.14);

    .lottie-animation-container
      width: 29px
      height: 29px
      padding: 3px

    .demo-tab-bar
      background: #F4F4F5
      padding: 4px;
      border-radius: 13.875px;

    .doc-name
      color: var(--black-black, #000);
      font-size: 17px;
      font-weight: 500;
      line-height: normal;
      letter-spacing: -0.34px;
      cursor pointer

      .nuxt-icon
        transition: transform 0.15s ease-in-out;

      &:hover
        .nuxt-icon
          transform: translateY(2px)

  .draw-toolbar
    --y: 160%
    position absolute
    transition: 318ms
    bottom: 30px
    max-width: 602px
    width: 90%
    left: 50%
    transform: translate3d(-50%, var(--y), 0)
    aspect-ratio: 602/88
    background-image: url(@/assets/error-handling/not-found-draw-toolbar.svg)
    background-size: contain

  .doc-body
    padding: fluid-value(16, 30)
    min-height: fluid-value(300, 373)
    background-size: 18.2696px 18.2696px;
    transition: 218ms

  .doc-block
    padding: 24px
    transition: 218ms

    &:focus
      outline: none

    .block-title
      color: var(--black-black, #000);
      font-size: 32px;
      font-weight: 700;
      line-height: normal;
      letter-spacing: -0.64px;

    .block-desc
      font-size: fluid-value(15, 16)
      color: var(--black-black, #000);

  .block-not-found
    max-width: 500px

  .back-handler
    color: #1D67AF;
    font-size: 16px

    .nuxt-icon
      font-size: 24px
      margin-right: 4px

  .mode-draw
    .doc-body
      background-color: white;
      background-image: radial-gradient( #e6e6e6 1px, white 1px );

    .doc-block
      background: #E1EFFF

    .draw-toolbar
      --y: 0

.doc-name-dropdown
  .el-dropdown-menu__item

    .nuxt-icon
      margin-right: 8px
      font-size: 24px
      color: #77757d
</style>
