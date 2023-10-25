<template lang="pug">
.member-card.flex.flex-col.items-center
  nuxt-link(
    :to="member.link"
    target="_blank"
    rel="nofollow"
  )
    .avatar(
      :style="{ backgroundImage: `url(${member.avatar})` }"
    )
  nuxt-link.info-name(
    :to="member.link"
    target="_blank"
  ) {{ member.name }}
  .info-title {{ member.title }}
  .info-desc(
    v-if="member.desc"
  ) {{ member.desc }}
</template>

<script setup lang="ts">
export type Member = {
  name: string
  title: string
  avatar: string
  link: string
  desc?: string
}

const props = defineProps<{
  member: Member
}>()
</script>

<style lang="stylus">
.member-card

  > *
    text-align: center

  .avatar
    width: 120px
    height: 120px
    background-size: cover
    background-position: center center
    border-radius: 50%

  .info-name
    font-weight: 700
    font-size: 20px
    line-height: 120.02%
    padding: 10px 0
    margin-top: 8px

  .info-title
    margin-top: 8px
    font-weight: 700;
    font-size: 14px;
    line-height: 140.02%;
    margin-bottom: 8px

  .info-desc
    font-weight: 400;
    font-size: 14px;
    line-height: 160.02%;
    color: var(--primary-gray)
    max-width: 270px

</style>
