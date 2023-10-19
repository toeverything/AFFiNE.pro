<template lang="pug">
el-dialog.download-canary-modal(
  v-model="value"
  append-to-body
  title="Are you sure ?"
)
  .info-tips.
    The Canary version is specifically designed for internal testing purposes. It may <b>exhibit significant instability</b> and may not fully align with the current version's scope. Using it may result in <b>data loss</b> or <b>unexpected outcomes</b>.
  .canary-icon(
    :style="{ backgroundImage: `url(${canaryIconUrl})` }"
  )
  template(#footer)
    .text-button(
      @click="handleDownloadCanaryClick"
    )
      | Continue to canary
    brand-glow-button( :needShadow="false" @click="handleDownloadPrimaryClick" )
      | Download {{ hasStable ? 'Stable' : 'Beta'}}
</template>

<script setup lang="ts">
import canaryIconUrl from '~/assets/download/canary.png'

const props = defineProps<{
  modelValue: boolean,
  releases: Record<string, Release>,
  defaultAsset: Asset
}>()

const emit = defineEmits(['update:modelValue'])

const value = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  }
})

const hasStable = computed(() => {
  if (!props.releases) return
  return props.releases.stable?.assets?.length
})

const mixpanel = useMixpanel()

const handleDownloadClick = (asset: Asset, type?: string) => {
  if (!asset) return
  mixpanel.track('Button', { 'resolve': type })
  var link = document.createElement('a')
  link.download = asset.name
  link.href = asset.url
  link.click()
}

const handleDownloadCanaryClick = () => {
  handleDownloadClick(props.defaultAsset, 'canary')
}

const handleDownloadPrimaryClick = () => {
  const versionName = hasStable.value ? 'stable' : 'beta'
  const version = props?.releases[versionName]
  const targetAssetName = props.defaultAsset.name.replace('canary', versionName)
  if (!version) return
  const asset = version.assets.find(el => el.name === targetAssetName)
  handleDownloadClick(asset, versionName)
}

</script>

<style lang="stylus">
.download-canary-modal
  --el-dialog-width: 520px
  border-radius: 8px;
  border: 1px solid #ddd;
  background: linear-gradient(180deg, #fff 0%, #eee 100%);
  box-shadow: 0px 0px 57px 0px rgba(0, 39, 178, 0.29);

  @media (max-width: 520px)
    margin-left: 8px;
    margin-right: 8px;
    max-width: calc(100vw - 16px);

  .el-dialog

    &__header
      padding-left: 0
      padding-bottom: 25px
      margin-left: 25px
      margin-right: 25px
      border-bottom: 1px solid #eee

    &__title
      font-size: 24px;
      font-weight: 600;

    &__close
      font-size: 24px;
      color: black

    &__headerbtn
      &:hover
        .el-dialog__close
          color: #383838

    &__body
      padding: 24px 25px

    &__footer
      border-top: 1px solid #ddd
      padding-left: 0
      padding-right: 0
      padding-top: 20px
      margin-left: 25px
      margin-right: 25px
      display: flex
      align-items: center
      justify-content: space-between

      @media (max-width: 520px)
        gap: 20px
        flex-direction: column

  .canary-icon
    width: 125px
    height: 125px
    margin: 24px auto 0
    background-size: contain

  .info-tips
    font-size: 16px

    b
      color: #a89e15

  .text-button
    cursor: pointer
    padding: 4px
    margin: -4px
    transition: 318ms

    &:hover
      opacity: 0.8
</style>
