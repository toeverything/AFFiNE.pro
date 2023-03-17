import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'
import { getCookie } from 'typescript-cookie'
import { ContentFileMeta } from '~/services/blog/resolveContentFile'

const userInitial = {
  username: null,
  email: 'name@email.com',
  token: null
}

type MainState = {
  blog: ContentFileMeta[]
}

export const useStore = defineStore('main', {
  state: () => ({
    isInited: false,

    user: useLocalStorage('affine/user', userInitial),

    ui: {
      isShowLoginModal: false
    },

    context: {
      nextUrl: '/me',
    },

    blog: [],

    // Entity
    domain: {
    }
  } as MainState),

  getters: {
    token: (state) => {
      let token
      if (process.client) {
        token = getCookie('token') || getCookie('sso-token')
      }
      return token || state.user.token
    },
    isAuthed (state) {
      return this.token || state.user.token
    }
  },

  actions: {

  }
})
