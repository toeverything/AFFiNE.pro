<template lang="pug">
.page.page-blog-article(
)
  .scroll-progress(
    :style="{ '--progress': scrollProgress }"
  )

  .main-container
    .all-posts-handler.flex.items-center.mb-8( @click="handleReturnClick" )
      .icon-circle-wrapper.flex.items-center.justify-center
        nuxt-icon( name="ArrowRightSmall" )
      | {{ $t('allPosts') }}

    .info-meta.last-edited.mb-4 Last edited: May 23, 2024

    h1.article-title {{ article.title }}
    //- .article-desc( v-if="article.description" ) {{ article.description }}

    .article-tag-row.flex.gap-4
      .article-tag( v-for="tag in article.tags" ) {{ tag }}

    .users-row.flex.flex-wrap.items-center.gap-20px( v-if="users && users.length" )
      .user-meta.flex.items-center(
        v-for="user in users"
      )
        template( v-if="user" )
          .user-avatar.mr-3(
            v-if="user.avatar"
            :style="{ backgroundImage: `url(${user.avatar})` }"
          )
          .body
            .user-name {{ user.name }}

    .divider

  .content-container
    blog-sidebar(
      :meta="article"
    )
    .content-row
      nuxt-img.article-cover(
        v-if="article.cover"
        format="webp"
        width="1600"
        height="800"
        :src="article.cover"
      )
      .article-detail.readable(
        v-html="html"
      )

  template-related-list(
    type="blog"
    :meta="article"
  )

  template-slogan-banner(
    v-if="article"
  )
</template>

<script lang="ts" setup>
import { useDateFormat, useScroll } from '@vueuse/core';
import { PATH } from '~/utils/constants';
import { primaryAPI } from '~/apis';
import { USER_MAP } from '~/services/blog/userMap';
import { renderHTML } from '~/services/blog/renderHtml';

const article = ref<ContentFileMeta>();
const html = ref('');
const scrollProgress = ref(0);
const store = useStore();
const route = useRoute();
const router = useRouter();
const isFromList = ref(false);

const asyncOptions = reactive({
  emptyTips: 'Article Not Found',
  errorTips: 'Article Load Error',
  errorActionText: 'Back to Home',
  onErrorAction: () => {
    router.push('/');
  },
  isLoading: true,
  isError: false,
});

const loadData = async () => {
  try {
    asyncOptions.isError = false;
    asyncOptions.isLoading = true;
    await primaryAPI.getBlog();
    article.value = store.blog.find((item) => item.slug === route.params.slug);
    html.value = await renderHTML(article.value?.md as string);
  } catch (error) {
    console.log('Load blog articles error', error);
    asyncOptions.isError = true;
    if (!article.value) {
      // showError({ statusCode: 404, statusMessage: 'Page Not Found' })
      router.push(`/not-found?fromPath=${route.path}`);
    }
  }
  asyncOptions.isLoading = false;
};

const users = computed(() => {
  return article.value?.authors?.map((user) => USER_MAP[user]);
});

const publishDate = useDateFormat(
  computed(() => new Date(article.value?.updated || Date.now())),
  'MM/DD/YYYY'
);

const pageMeta = computed(() => {
  const title = article.value?.title
    ? article.value?.title + ' | AFFiNE'
    : 'Blog | AFFiNE - All In One KnowledgeOS'; // should always have a title`
  const desc =
    article.value?.description ||
    'There can be more than Notion and Miro. AFFiNE is a next-gen knowledge base that brings planning, sorting and creating all together.';
  const url = `${PATH.SHARE_HOST}/blog/${article.value?.slug}`;
  const image = article.value?.cover || 'https://affine.pro/og.jpeg';

  return {
    title: article.value?.title,
    meta: [
      { name: 'twitter:title', content: title },
      { name: 'twitter:url', content: url },
      { name: 'twitter:description', content: desc },
      { name: 'twitter:image', content: image },

      { name: 'og:title', content: title },
      { name: 'og:url', content: url },
      { name: 'og:description', content: desc },
      { name: 'og:image', content: image },
    ],
  };
});

definePageMeta({
  keepalive: false,
  heroType: 'blog',
});

await loadData();

useHead(pageMeta);

const listenToScroll = () => {
  const { y } = useScroll(document);
  watch(y, () => {
    const totalY = document.body.scrollHeight - window.innerHeight;
    scrollProgress.value = (y.value / totalY) * 100;
  });
};
onMounted(() => {
  isFromList.value =
    store.context.lastPath === '/blog' && window.history.state.back === '/blog';
  listenToScroll();
});

const handleReturnClick = () => {
  if (isFromList.value) {
    return window.history.go(-1);
  }

  router.push('/blog');
};
</script>

<style lang="stylus">
.page.page-blog-article
  min-height: 10vh
  --tag-color: black
  --tag-bg-color: rgba(0, 0, 0, 0.08);

  .scroll-progress
    position fixed
    z-index: 3
    left: 0
    height: 3px
    top: var(--navbar-height)
    background: brand(100)
    width: calc(var(--progress) * 1.01%)
    margin-top: 4px

    @media (max-width: 960px)
      margin-top: 1px

  .info-meta
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: -0.02em;
    color: #8E8D91;

  .jumbotron-container
    width: 100%
    margin: auto
    max-width: 1380px
    padding: fluid-value(34, 64) fluid-value(16, 64)
    text-align: center

  .content-container
    position relative
    display flex
    gap: 30px
    padding: 0 20px
    margin: 0 auto
    width: 100%
    max-width: (190px + 50 + 600 + 40)
    left -120px
    padding-bottom: fluid-value(20, 80)

    @media (max-width: 1200px)
      left: 0

    .blog-sidebar
      flex: 210
      max-width: 210px

    .content-row
      flex: 600
      flex-shrink: 0

  .main-container
    position relative
    padding: 0 20px
    padding-top: 40px
    width: 100%
    margin: auto
    max-width: 640px

  .article-tag
    border-radius: 30px
    padding: 2px 12px
    font-weight: 600
    font-size: 12px
    line-height: 20px
    background: var(--tag-bg-color)
    margin-bottom: 10px
    color: var(--tag-color)

  .article-cover
    width: 100%
    border-radius: 12px
    object-fit: cover
    object-position: center
    vertical-align: middle
    height: auto !important
    background: var(--el-fill-color-light)
    margin-bottom: fluid-value(8, 20)

  .article-title
    font-weight: 500
    font-size: fluid-value(24, 24)
    line-height: (32/24)
    margin-bottom: 16px
    color: #000
    letter-spacing: -0.02em
    margin-top: 0

  .blog-sidebar
    top: 100px
    position sticky
    height: fit-content

    @media (max-width: 900px)
      display: none

  .article-desc
    color: var(--primary-gray)
    font-weight: 500
    font-size: fluid-value(14, 24)
    line-height: 1

    @media $mediaInXS
      padding: 0px

  .divider
    height: 0.5px
    background var(--light-detail-color-border-color, #E3E2E4);
    margin: 24px 0

  .users-row
    margin-top: 15px

    .user-name
      font-weight: 400
      font-size: 14px
      line-height: 22px

    .user-avatar
      width: 32px
      height: 32px
      background-size: cover
      background-position: center center
      border-radius: 50%

  .updated-info
    color: #8E8D91
    font-size: 13px
    line-height: 19px

  .all-posts-handler
    font-size: 16px;
    font-weight: 500;
    line-height: 22px;
    line-height: normal;
    letter-spacing: -0.32px;
    color: black
    white-space: nowrap
    cursor pointer
    transition: 318ms
    gap: 10px

    &:hover
      color: var(--brand)

    .icon-circle-wrapper
      width: 32px
      height: 32px
      border-radius: 50%;
      background: #FFF;
      box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.15)

    .nuxt-icon
      font-size: 20px

  .async-container
    .el-empty
      margin-top: 10vh

  /html.dark &
    --tag-color: #E6E6E6
    --tag-bg-color: rgba(249, 249, 249, 0.3)
</style>
