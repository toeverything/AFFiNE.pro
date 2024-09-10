<template lang="pug">
nuxt-link.template-hero-card(
  :to="{ path: `/templates/${meta.slug}`, meta: { source: 'list' } } "
  :class="[ `theme-${ theme }` ]"
)
  .meta-row.flex.w-full
    .cover-img.card-cover(
      :style="{ backgroundImage: `url(${meta.cover})` }"
    )
    .content-part
      h2.card-title {{ meta.title }}
      p.card-desc {{ meta.description }}
      .flex.mt-22px.button-row
        el-button.detail-button(
          type="primary"
          size="action-rounded"
        ) Explore Details
</template>

<script setup lang="ts">
import Rand from 'rand-seed';

const props = defineProps<{
  meta: TemplateContentFileMeta;
}>();

type HeroTheme = 'teal' | 'sky' | 'violet' | 'yellow' | 'rose' | 'emerald';

const themes: HeroTheme[] = [
  'teal',
  'sky',
  'violet',
  'yellow',
  'rose',
  'emerald',
];
const theme = computed<HeroTheme>(() => {
  const rand = new Rand(props.meta.id);
  const ind: number = Math.floor(rand.next() * themes.length);
  return themes[ind] || 'sky';
});
</script>

<style lang="stylus">
.template-hero-card
  display flex
  padding: fv(32, 62, 744) fv(26, 77, 1024)
  padding-bottom: 0
  border: 3px solid #F3F3F3;
  border-radius: 8px;
  cursor pointer
  overflow hidden

  $mediaColDir = '(max-width: 800px)'

  &.theme-teal
    background: linear-gradient(276.96deg, #C4EADF -10.28%, #51DCB4 166.83%);

  &.theme-sky
    background: linear-gradient(276.96deg, #A8ECFB -10.28%, #5CBFF7 166.83%)

  &.theme-violet
    background: linear-gradient(276.96deg, #EAE0F8 -10.28%, #AB86DE 166.83%);

  &.theme-yellow
    background: linear-gradient(276.96deg, #FDEDBC -10.28%, #F5D56E 166.83%);

  &.theme-rose
    background: linear-gradient(276.96deg, #FEE3EF -10.28%, #EA7AA9 166.83%)

  &.theme-emerald
    background: linear-gradient(276.96deg, #C3EFDE -10.28%, #0FBE78 166.83%)

  .meta-row
    display: flex
    gap: fv(20, 70, 1000, 1280)

    @media $mediaColDir
      flex-direction: column-reverse
      align-items: center

  .content-part
    flex: 421

    @media $mediaColDir
      flex: auto

  .card-cover
    flex: 402
    border-radius: 8px 8px 0px 0px
    aspect-ratio: 402/333
    background-color: white
    background-position: top center
    border: 1px solid #F3F3F3;
    box-shadow: 0px 206px 82px 0 rgba(196, 196, 196, 0.03), 0px 116px 69px 0px rgba(196, 196, 196, 0.08), 0px 51px 51px rgba(196, 196, 196, 0.14), 0px 13px 28px rgba(196, 196, 196, 0.17)

    @media $mediaColDir
      width: 100%
      max-width: 365px

  .card-title
    font-weight: 700;
    font-size: fv(28, 32);
    line-height: (39/32);
    letter-spacing: -0.02em;
    color: #141414;
    margin: 0

  .card-desc
    font-size: fv(12, 16);
    line-height: 1.5;
    color: rgba(0, 0, 0, 0.6);
    margin-top: 13px
    multiline-overflow(7)

    @media $mediaColDir
      display: none

  .button-row
    @media $mediaColDir
      display: none
</style>
