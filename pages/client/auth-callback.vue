<template lang="pug">
.page.redirect-container
  .hint Redirecting to your AFFiNE Client App...
  button(@click="openAffineClient") Click here to try again
</template>

<script>
export default {
  name: "ClientAuthRedirect",
  mounted() {
    this.openAffineClient();
  },
  methods: {
    openAffineClient() {
      if (typeof window !== "undefined") {
        // do we need to concern if it is secure?
        window.location.href =
          "affine://auth-callback?" + window.location.search;
      }
    },
  },
};
</script>

<style lang="stylus">
.page.redirect-container
  min-height: 500px
  display: flex
  flex-direction: column
  justify-content: center
  align-items: center

.hint
  margin-bottom: 20px

</style>
