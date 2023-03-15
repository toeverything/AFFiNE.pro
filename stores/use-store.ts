import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'
import { getCookie } from 'typescript-cookie'

const userInitial = {
  username: null,
  email: 'name@email.com',
  token: null
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

    // Entity
    domain: {
    }
  }),

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
