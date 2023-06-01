<template>
  <svg class="light-track-svg" width="2882" height="1502" viewBox="0 0 2882 1502" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="track-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%"   stop-color="rgba(255, 255, 255, 0.02)"/>
        <stop offset="100%" stop-color="rgba(255, 255, 255, 0.15)"/>
      </radialGradient>
    </defs>
    <path d="M6.16306 1483.77C85.8473 1581.26 1058 1241.86 1631.72 938.569C2205.45 635.278 2954.48 111.74 2874.8 17.8637C2795.11 -76.0124 1962.71 234.37 1345.79 540.525C728.877 846.681 -73.5212 1386.28 6.16306 1483.77Z" stroke-linecap="round" pathLength="1" :id="pathId"  />
  </svg>
</template>

<script setup lang="ts">
const props = defineProps<{
  pathId?: string
}>()
</script>
