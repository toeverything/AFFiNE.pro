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
  blog: ContentFileMeta[],
  github: {
    starAmount: boolean | undefined
  },
  ui: {
    isShowMobileInterceptModal: boolean
  },
  context: {
    coupon?: string
    lastPath: string
    lastFetched: Record<string, any>
  }
}

export const useStore = defineStore('main', {
  state: () => ({
    isInited: false,

    user: useLocalStorage('affine/user', userInitial),

    github: {
      starAmount: undefined
    },

    ui: {
      isShowMobileInterceptModal: false
    },

    context: {
      lastPath: '/',
      nextUrl: '/me',
      lastFetched: useLocalStorage('affine/lastFetched', {}),
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
