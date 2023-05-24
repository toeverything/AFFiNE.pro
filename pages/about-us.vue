<template lang="pug">
.page.page-about-us

  .section.section-hero
    .md-container.flex.flex-col.items-center
      .hero-title(
        v-html="$t('aboutUsPage.slogan')"
      )
      .hero-desc {{ $t('aboutUsPage.desc')  }}
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
import { INFO } from "~/utils/constants";
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
    name: "Terry/Chi Zhang",
    title: "Co-founder & CTO",
    desc: "AFFiNE builder with great engineers.",
    avatar: "https://unavatar.io/github/tzhangchi",
    link: "https://github.com/tzhangchi",
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
    name: "Brooooooklyn/Yinan Long",
    title: "Partner & Head of Server and System Architect",
    desc: `Enable real-time web applications to run locally. Make distributed data connected synchronously. Leader of OctoBase.`,
    avatar: "https://unavatar.io/github/Brooooooklyn",
    link: "https://github.com/Brooooooklyn",
  },
  {
    name: "Alex Yang",
    title: "Architecture Engineer",
    desc: `Leader of AFFiNE engineering.`,
    avatar: "https://unavatar.io/github/Himself65",
    link: "https://github.com/Himself65",
  },
];

const engineeringMembers: Member[] = [
  {
    name: "Xiaodong Zuo",
    title: "Architecture Engineer",
    avatar: "https://unavatar.io/github/zuoxiaodong0815",
    link: "https://github.com/zuoxiaodong0815",
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
    name: "Whitewater",
    title: "Full-stack Engineer",
    avatar: "https://unavatar.io/github/lawvs",
    link: "https://github.com/lawvs",
  },
  {
    name: "Shaoxuan Qi",
    title: "Full-stack Engineer",
    avatar: "https://unavatar.io/github/QiSHaoXuan",
    link: "https://github.com/QiSHaoXuan",
  },
  {
    name: "Xiaotian Ma",
    title: "Full-stack Engineer",
    avatar: "https://unavatar.io/github/thorseraq",
    link: "https://github.com/thorseraq",
  },

  {
    name: "Regis Chen",
    title: "Full-stack Engineer",
    avatar: "/RegisChen.jpeg",
    link: "https://github.com/regischen",
  },

  {
    name: "Yang Jinfei",
    title: "Full-stack Engineer",
    avatar: "https://unavatar.io/github/JimmFly",
    link: "https://github.com/JimmFly",
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
  },
  {
    name: "Haoxin Shang",
    title: "DevRel of AFFiNE",
    avatar: "https://unavatar.io/github/DiamondThree",
    link: "https://github.com/DiamondThree",
  },
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
    avatar: "/hwang.png",
    link: "https://bento.me/hwang",
  },
  {
    name: "Svaney",
    title: "UX Designer",
    avatar: "https://unavatar.io/github/Svaney-ssman",
    link: "https://github.com/Svaney-ssman",
  },
  {
    name: "Guozhu Liu",
    title: "Head of Product Design",
    avatar: "/GuozhuLiu.jpeg",
    link: "https://xell.me",
  },
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
