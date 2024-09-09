<template lang="pug">
.blog-toc
  .heading(
    :title="item.text"
    v-for="item in toc"
    @click="() => handleHeadingClick(item.id)"
  ) {{ item.text }}
</template>

<script setup lang="ts">
import { gsap } from 'gsap';
import GithubSlugger from 'github-slugger';
import { unified } from 'unified';
import { toString } from 'hast-util-to-string';
import remarkParse from 'remark-parse';
import { visit } from 'unist-util-visit';

const props = defineProps<{
  markdown: string;
}>();

const slugs = new GithubSlugger();

const toc = computed(() => {
  const tree = unified().use(remarkParse).parse(props.markdown);

  const list: any[] = [];

  // 使用 visit 遍历 AST，查找 heading 节点
  visit(tree, 'heading', (node: any) => {
    const depth = node.depth;
    const text = toString(node);

    if (depth === 2 || depth === 3) {
      if (text) {
        list.push({
          text,
          id: 't' + slugs.slug(text),
        });
      }
    }
  });

  return list;
});

const handleHeadingClick = (id: string) => {
  gsap.to(window, {
    duration: 0.5,
    scrollTo: { y: `#${id}`, offsetY: 100, autoKill: true },
  });
};
</script>

<style lang="stylus">
.blog-toc
  max-height: s('round(calc(100vh - 310px), 30px)')

  .heading
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
    letter-spacing: -0.01em;
    color: #8E8D91;
    margin-bottom: 13px
    cursor pointer
    transition: 318ms
    text-overflow()

    &:hover
      color: #000
</style>
