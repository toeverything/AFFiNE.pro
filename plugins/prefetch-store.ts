import { primaryAPI } from '~/apis';

export default defineNuxtPlugin(async (nuxtApp) => {
  try {
    if (process.client) {
      primaryAPI.getBlog();
      primaryAPI.getTemplates();
      primaryAPI.getReleaseTabs();
    }
  } catch (error) {
    console.log('prefetch store error', error);
  }
});
