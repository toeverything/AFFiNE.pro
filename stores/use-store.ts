import { defineStore } from 'pinia'
import { RemovableRef, useLocalStorage } from '@vueuse/core'
import { getCookie } from 'typescript-cookie'

const userInitial = {
  username: null,
  email: 'name@email.com',
  token: null
}

type MainState = {
  user: RemovableRef<typeof userInitial>
  blog: ContentFileMeta[],
  templates: TemplateContentFileMeta[],
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
    templates: [],

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
    isAuthed(state) {
      // @ts-ignore
      return this.token || state.user.token
    }
  },

  actions: {

  }
})
