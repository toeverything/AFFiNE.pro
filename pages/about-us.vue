<template lang="pug">
.page.page-about-us

  .section.section-hero
    .md-container.flex.flex-col.items-center
      .hero-title(
        v-html="$t('aboutUsPage.slogan')"
      )
      .hero-desc {{ $t('aboutUsPage.desc')  }}
      .flex.cards-row
        .contact-card
          .card-header.flex.items-center.gap-28px
            .icon-wrapper
              nuxt-icon( name="Email" )
            | {{ $t('aboutUsPage.contactTitle') }}
          .card-body
            ul
              li {{ $t('aboutUsPage.contactItemA') }}
              li {{ $t('aboutUsPage.contactItemB') }}
              li {{ $t('aboutUsPage.contactItemC') }}
          .card-footer.flex.flex-wrap
            | {{ $t('aboutUsPage.contactGeneralInfo') }}&nbsp;
            br.show-in-xs
            nuxt-link( :to="`mailto:${INFO.CONTACT_EMAIL}`" target="_blank" ) {{ INFO.CONTACT_EMAIL }}

        .contributor-reward-card.flex.flex-col.items-center
          .card-desc {{ $t('aboutUsPage.contributorRewardDesc') }}
          nuxt-link.visit-button( :to="PATH.INTERN_APPLY_FORM" target="_blank" ) {{ $t('visit') }}
      .divider

  .section.section-members
    .md-container
      .section-title {{ $t('aboutUsPage.memberTitle') }}
      .section-label {{ $t('aboutUsPage.coreLabel') }}
      .members-list
        member-card(
          v-for="member in coreMembers"
          :member="member"
        )

      .section-title {{ $t('aboutUsPage.engineeringTitle') }}
      .members-list
        member-card(
          :key="member.avatar"
          v-for="member in engineeringMembers"
          :member="member"
        )
      .section-title {{ $t('aboutUsPage.communityTitle') }}
      .members-list
        member-card(
          v-for="member in communityMembers"
          :member="member"
        )
      .section-title {{ $t('aboutUsPage.productTitle') }}
      .members-list
        member-card(
          v-for="member in productMembers"
          :member="member"
        )
</template>

<script lang="ts" setup>
import { INFO, PATH } from "~/utils/constants";
import type { Member } from "~/components/widgets/member-card.vue";

const { t } = useI18n();

const coreMembers: Member[] = [
  {
    name: "Enther/Jiachen He",
    title: "Founder & Product Owner",
    desc: "The PM and CEO guy of AFFiNE.",
    avatar: "https://unavatar.io/github/HeJiachen-PM",
    link: "https://github.com/HeJiachen-PM",
  },
  {
    name: "Brooooooklyn/Yinan Long",
    title: "Partner & CTO",
    desc: `Enable real-time web applications to run locally. Make distributed data connected synchronously. Leader of OctoBase.`,
    avatar: "https://unavatar.io/github/Brooooooklyn",
    link: "https://github.com/Brooooooklyn",
  },
  {
    name: "Iris/Yipei Wei",
    title: "Co-founder & Head of Community Support",
    desc: "She talks to people so that AFFiNE is something people want.",
    avatar: "/yipei.png",
    link: "https://github.com/Yipei-Operation",
  },
  {
    name: "Ewind/Yifeng Wang",
    title: "Co-founder & Chief Architect",
    desc: "He ensures AFFiNE is built with the proper technology. Leader of BlockSuite and Developer Relationship.",
    avatar: "https://unavatar.io/github/doodlewind",
    link: "https://github.com/doodlewind",
  },
  {
    name: "Alex Yang",
    title: "Architecture Engineer",
    desc: `Leader of AFFiNE engineering.`,
    avatar: "https://unavatar.io/github/himself65",
    link: "https://github.com/himself65",
  },
];

const engineeringMembers: Member[] = [
  {
    name: "Huaqiao Li",
    title: "Architecture Engineer",
    avatar: "https://unavatar.io/github/joooye34",
    link: "https://github.com/joooye34",
  },
  {
    name: "Darksky Tan",
    title: "Architecture Engineer",
    avatar: "https://unavatar.io/github/darkskygit",
    link: "https://github.com/darkskygit",
  },
  {
    name: "Mirone Saul",
    title: "Architecture Engineer",
    avatar: "https://unavatar.io/github/Saul-Mirone",
    link: "https://mirone.me",
  },
  {
    name: "Xiao Peng",
    title: "Architecture Engineer",
    avatar: "https://unavatar.io/github/pengx17",
    link: "https://pengx17.vercel.app",
  },
  {
    name: "Yi Liu",
    title: "Architecture Engineer",
    avatar: "https://unavatar.io/github/forehalo",
    link: "https://github.com/forehalo",
  },


  {
    name: "Regis Chen",
    title: "Full-stack Engineer",
    avatar: "/RegisChen.jpeg",
    link: "https://github.com/regischen",
  },

  {
    name: "Zijian Zuo",
    title: "Full-stack Engineer",
    avatar: "/Zijian.jpeg",
    link: "https://github.com/zzj3720",
  },

  {
    name: "Hongtao lye",
    title: "Full-stack Engineer",
    avatar: "/Hongtao.jpeg",
    link: "https://github.com/doouding",
  },
  {
    name: "Xiang Gao",
    title: "Full-stack Engineer",
    avatar: "https://unavatar.io/github/Flrande",
    link: "https://github.com/Flrande",
  },
];

const communityMembers: Member[] = [
  {
    name: "Christopher Smolak",
    title: "Operation Director, Community and Growth",
    avatar: "/ChristopherSmolak.jpg",
    link: "https://shortcipher.me",
  },
  {
    name: "Yang Peng",
    title: "Operation Director, SEO and Data",
    avatar: "https://unavatar.io/github/JackiePengp",
    link: "https://github.com/JackiePengp",
  }
];

const productMembers: Member[] = [
  {
    name: "Joe Hou",
    title: "Product Architect",
    avatar: "/JoeHou.jpeg",
    link: "https://craft.do/s/jxEgkth6QpmxPs",
  },
  {
    name: "Hwang",
    title: "Product Designer",
    avatar: "https://unavatar.io/github/hwangdev97",
    link: "https://bento.me/hwang",
  },
  {
    name: "Svaney",
    title: "UX Designer",
    avatar: "https://unavatar.io/github/Svaney-ssman",
    link: "https://github.com/Svaney-ssman",
  },
  {
    name: "zanwei.guo",
    title: "Product Designer",
    avatar: "https://unavatar.io/github/zanwei",
    link: "https://bento.me/zw"
  }
];

useHead({
  title: t("aboutUs"),
});
</script>

<style lang="stylus">
.page.page-about-us
  --contact-card-bg-color: #fff
  --contact-card-footer-color: rgba(0, 42, 134, 1)
  padding-bottom: fluid-value(40, 100)

  .section-hero
    .divider
      padding-bottom: fluid-value(50, 100)
      margin-bottom: fluid-value(16, 34)
      width: 100%
      border-bottom: 1px solid var(--divider-color)

    .hero-title
      font-weight: 800;
      font-size: fluid-value(40, 64, 744);
      line-height: (77/64);
      margin-top: 77px
      margin-bottom: 50px
      text-align: center

    .hero-desc
      font-weight: 800;
      font-size: fluid-value(24, 36, 744);
      line-height: (44/36);
      color: var(--primary-gray)
      margin-bottom: 100px
      text-align: center

      @media $mediaInXS
        margin-bottom: 50px

  .section-title
    font-weight: 800;
    font-size: 36px;
    line-height: 220.02%;

    @media $mediaInMobile
      font-size: 24px

  .section-label
    font-weight: 800;
    font-size: 20px;
    line-height: 220.02%;
    color: var(--primary-gray)

    @media $mediaInMobile
      font-size: 14px

  .contact-card
    background: var(--contact-card-bg-color);
    border: 1px solid $primary10;
    box-shadow: 0px 4px 40px rgba(0, 0, 0, 0.1);
    border-radius: 14px;
    padding: 30px;
    max-width: 630px;
    width: 100%

    @media $mediaInXS
      padding: 16px;

    .card-header
      font-weight: 800;
      font-size: 24px;
      line-height: 29px;

    .card-body
      margin: 38px 0 58px
      color: var(--primary-gray)

      ul
        font-size: 16px;
        padding-left: 26px
        line-height: 220.02%

    .card-footer
      font-weight: 800;
      color: var(--contact-card-footer-color)
      a
        text-decoration: underline

    .icon-wrapper
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center
      justify-content: center
      border-radius: 14px
      background: var(--brand-gradient)
      color: white
      font-size: 24px

  .cards-row
    --offset: 169px
    --reward-scale: 1
    position: relative
    flex-direction: column
    gap: 14px
    align-items: center
    max-width: 630px

    @media $mediaInBigScreen
      max-width: 100%
      padding-right: var(--offset)

      .contact-card
        position: relative
        z-index: 2

      .contact-card,
      .contributor-reward-card
        transition: 500ms

      .visit-button
        transform: translateX(-30%)
        opacity: 0.4

      &:hover
        --reward-scale: 1

        .visit-button
          transform: translateY(0)
          opacity: 1

        .contact-card
          transform: translateX(-40%)

        .contributor-reward-card
          transform: translateX(40%) translateY(-50%) scaleY(var(--reward-scale))
          max-height: 150%

  .contributor-reward-card
    padding: 4px
    overflow: hidden

    @media $mediaInBigScreen
      max-height: 90%
      padding: 20px 30px
      position: absolute
      top: 50%
      left: var(--offset)
      right: 0
      background: #fff
      border: 1px solid s('rgba(var(--v-primary-rgb), 0.1)')
      box-shadow: 0px 4px 40px rgba(0, 0, 0, 0.1)
      border-radius: 14px
      transform: translateY(-50%)

    .card-desc
      font-size: 14px;
      line-height: 220.02%;

    .visit-button
      background: rgba(0, 0, 0, 0.1);
      border-radius: 10px;
      padding: 3px 120px;
      font-size: 14px;
      line-height: 220.02%;
      margin-top: fluid-value(36, 41)
      transition: 518ms

      &:hover
        background: rgba(0, 0, 0, 0.15);

  .section-members
    .md-container
      @media $mediaInDesktop
        max-width: s('min(84vw, 1200px)')

  .members-list
    margin-top: 56px
    display: flex
    justify-content: flex-start
    flex-wrap: wrap
    column-gap: 20px
    row-gap: 80px

    & + .section-title
      margin-top: fluid-value(60, 100)

    @media $mediaInDesktop
      margin-left: -8%
      margin-right: -8%
      row-gap: 107px

    > *
      flex: 0 0 30%

      @media $mediaInXS
        flex: 0 0 46%

  /html.dark &
    --contact-card-bg-color: #1b1b1b
    --contact-card-footer-color: rgba(84, 56, 255, 1)
</style>
