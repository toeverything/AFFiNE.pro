<template lang="pug">
.blog-sidebar
  .sidebar-section.section-toc
    blog-toc( :markdown="meta.md" )
  .sidebar-section.section-share
    .headline-6.sidebar-title Share
    .blog-share.flex.gap-10px
      el-tooltip(
        :content="copied ? 'Copied' : 'Copy link'"
        effect="light"
        :hide-after="50"
        popper-class="share-tooltip"
      )
        .handler( @click="handleLinkClick" )
          nuxt-icon( name="Link" )
      el-tooltip(
        content="Share to X"
        effect="light"
        :hide-after="50"
        popper-class="share-tooltip"
      )
        .handler( @click="handleTwitterClick" )
          nuxt-icon( name="Twitter2" )
      el-tooltip(
        content="Share to Reddit"
        effect="light"
        :hide-after="50"
        popper-class="share-tooltip"
      )
        .handler( @click="handleRedditClick" )
          nuxt-icon.text-size-17px( name="reddit" )
      el-tooltip(
        content="Share to email"
        effect="light"
        :hide-after="50"
        popper-class="share-tooltip"
      )
        .handler( @click="handleEmailClick" )
          nuxt-icon( name="share-email" )

  .sidebar-section.section-cta
    .headline-6.info-desc.mb-3 Start using AFFiNE today
    app-entry-button( placement="blog_sidebar" size="action" )

</template>

<script setup lang="ts">
import { gsap } from 'gsap';
import { PATH } from '~/utils/constants';
import { useClipboard } from '@vueuse/core';

const props = defineProps<{
  meta: ContentFileMeta;
}>();

const { copy, copied } = useClipboard();

const blogLink = computed(() => {
  return `${PATH.SHARE_HOST}/blog/${props.meta.slug}`;
});

const shareText = computed(() => {
  return `${props.meta.title} ${blogLink.value}`;
});

const handleLinkClick = () => {
  copy(blogLink.value);
};

const handleTwitterClick = () => {
  window.open(
    `https://twitter.com/intent/tweet?text=${shareText.value}`,
    '_blank'
  );
};

const handleRedditClick = () => {
  window.open(`https://reddit.com/submit?url=${shareText.value}`, '_blank');
};

const handleEmailClick = () => {
  window.open(
    `mailto:?subject=${props.meta.title}&body=${blogLink.value}`,
    '_blank'
  );
};
</script>

<style lang="stylus">
.blog-sidebar
  .sidebar-title
    margin-bottom: 12px

  .headline-6
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: -0.02em;
    color: #141414;

  .info-desc
    padding-top: 8px

  .sidebar-section
    margin-bottom: 20px

  .app-entry-button
    width: 100%

  .section-toc
    overflow hidden

  .section-cta
    padding-right: 20px

.share-tooltip
  border-radius: 6px
  --el-border-color-light: #eee

.blog-share
  font-size: 20px
  cursor pointer

  .handler
    color: hsla(0, 0%, 48%, 1)
    transition: color 0.3s

    &:hover
      color: var(--brand)
</style>
