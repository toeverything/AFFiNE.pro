<template lang="pug">
.page.page-about-us

  .section.section-hero.flex.items-center
    client-only
      about-globe-sketch
    .limit-container.flex.items-end.justify-between
      about-title.flex-shrink-0
      .hero-desc {{ $t('aboutUsPage.desc')  }}

  .section.section-intro
    .limit-container.flex.flex-col.items-center
      .flex.cards-row
        .contact-card
          .card-header.flex.items-center.gap-28px
            | {{ $t('aboutUsPage.contactTitle') }}
          .card-body
            .contact-items
              .contact-item {{ $t('aboutUsPage.contactItemA') }}
              .contact-item {{ $t('aboutUsPage.contactItemB') }}
              .contact-item {{ $t('aboutUsPage.contactItemC') }}
          .card-footer.flex.flex-wrap
            nuxt-link( :to="`mailto:${INFO.CONTACT_EMAIL}`" target="_blank" )
              el-button.contact-button(
                type="primary"
                size="action"
              ) Contact us now!

  .section.section-gallery
    .gallery-container
      .singapore-photo.photo-1
      .singapore-photo.photo-2
      .singapore-photo.photo-3

  overview-slogan-banner.mt-4
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
    name: "Huaqiao Li",
    title: "Architecture Engineer",
    desc: "Leader of AFFiNE engineering.",
    avatar: "https://unavatar.io/github/joooye34",
    link: "https://github.com/joooye34",
  },
];

const engineeringMembers: Member[] = [
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
    name: "Zijian Zuo",
    title: "Architecture Engineer",
    avatar: "/Zijian.jpeg",
    link: "https://github.com/zzj3720",
  },

  {
    name: "Regis Chen",
    title: "R&D Engineer",
    avatar: "/RegisChen.jpeg",
    link: "https://github.com/regischen",
  },

  {
    name: "Hongtao lye",
    title: "R&D Engineer",
    avatar: "/Hongtao.jpeg",
    link: "https://github.com/doouding",
  },
  {
    name: "Xiang Gao",
    title: "R&D Engineer",
    avatar: "https://unavatar.io/github/Flrande",
    link: "https://github.com/Flrande",
  },
  {
    name: "EYHN",
    title: "R&D Engineer",
    avatar: "https://unavatar.io/github/EYHN",
    link: "https://github.com/EYHN",
  },
  {
    name: "Cats Juice",
    title: "R&D Engineer",
    avatar: "https://unavatar.io/github/CatsJuice",
    link: "https://github.com/CatsJuice",
  },
];

const communityMembers: Member[] = [
  {
    name: "Christopher Smolak",
    title: "Operation Director, Community and Growth",
    avatar: "/ChristopherSmolak.jpg",
    link: "https://github.com/ShortCipher5",
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
  --contact-card-footer-color: brand(100)
  padding-bottom: fluid-value(40, 100)

  .section-hero
    position relative
    height: 580px
    overflow: hidden

    .about-globe-sketch
      position absolute
      top: -10%
      z-index: -1
      left: 50%
      transform: translateX(-50%)
      height: 200%
      aspect-ratio: 1/1

    .limit-container
      column-gap: 80px
      row-gap: 16px

    @media $mediaInMobile
      height: 350px

      .about-globe-sketch
        top: -8%
        height: 180%

    @media (max-width: 700px)
      height: 300px

      .limit-container
        align-items: flex-start
        flex-direction: column

    @media $mediaInXS
      height: 300px
      background-size: 345px 345px

    &:before
      content: ''
      position absolute
      bottom: 0
      width: 100%
      height: (140/580 * 100%)
      background: linear-gradient(180deg, rgba(250, 250, 250, 0.00) 0%, var(--bg) 100%)

    .hero-desc
      font-size: fluid-value(20, 32, 744)
      font-weight: 500
      line-height: 125%
      letter-spacing: (-1.28/32em)
      color: black
      max-width: 400px
      white-space: pre

  .section-intro
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

  .section-gallery
    display: flex
    justify-content: center
    padding-top: fluid-value(30, 128, 744)
    padding-bottom: fluid-value(30, 100, 744)

    .gallery-container
      display: flex
      padding-left: fluid-value(20, 70, 390, 744)
      padding-right: fluid-value(20, 70, 390, 744)
      min-width: (1614px + 70px)

      @media (max-width: 900px)
        min-width: 100%
        flex-direction: column
        align-items: center

    .singapore-photo
      background-size: cover
      background-position: center center
      border-radius: 8px

    .photo-1
      width: 530px
      aspect-ratio: 530/354
      background-image: url(/about/singapore-1.png)
      transform: rotate(-3deg)

      @media (max-width: 900px)
        width: 100%
        max-width: 586px

    .photo-2
      position relative
      z-index: 2
      width: 508px
      aspect-ratio: 508/381
      background-image: url(/about/singapore-2.png)

      @media (max-width: 900px)
        width: 100%
        max-width: 588px
        top: 1.4%

    .photo-3
      position relative
      left: 11px
      z-index: 3
      width: 546px
      aspect-ratio: 546/364
      background-image: url(/about/singapore-3.png)
      transform: rotate(3.31deg)

      @media (max-width: 900px)
        width: 100%
        max-width: 588px
        left: -4px
        top: 3%

  .section-members .section-title
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
    border-radius: 14px;
    padding: fluid-value(12, 30) 0;
    width: 100%

    .card-header
      font-size: fluid-value(18, 32);
      line-height: (40/32);
      font-weight: 500;
      letter-spacing: -0.04em;
      color: #1E96EB;

    .card-body
      margin: 24px 0 48px
      color: var(--primary-gray)

      @media $mediaInXS
        margin: 24px 0 32px

      ul
        font-size: 16px;
        padding-left: 26px
        line-height: 220.02%

    .contact-items
      display: flex
      flex-direction: column
      gap: fluid-value(28, 36, 390, 744)

    .contact-item
      font-weight: 500;
      font-size: fluid-value(20, 32, 390, 744);
      line-height: 119%;
      letter-spacing: -0.03em;
      transition: 350ms
      transform-origin: left center
      cursor default

      &:hover
        transform: scale(1.0625)
        color: #000
        @media $mediaInXS
          transform: scale(1.05)

    .contact-button
      min-width: 220px

    .card-footer
      font-weight: 800;
      color: var(--contact-card-footer-color)
      a
        text-decoration: underline

  .cards-row
    --offset: 0
    position: relative
    flex-direction: column
    gap: 14px
    align-items: center
    max-width: 750px
    width: 100%

    @media $mediaInBigScreen

      .contact-card
        position: relative
        z-index: 2

      .contact-card,
      .contributor-reward-card
        transition: 500ms

      .visit-button
        transform: translateX(-30%)
        opacity: 0.4

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
        max-width: calc(50% - 10px)

        .info-name
          word-break: break-all

  /html.dark &
    --contact-card-bg-color: #1b1b1b
    --contact-card-footer-color: rgba(84, 56, 255, 1)
</style>
