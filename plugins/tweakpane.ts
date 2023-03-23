import {
  defineComponent,
  h,
  Ref,
  ref,
  inject,
  InjectionKey,
  onMounted,
  nextTick,
  onBeforeUnmount,
  onUnmounted,
  onActivated,
  onDeactivated,
  provide,
  watch
} from 'vue'
import { FolderApi, Pane } from 'tweakpane'
import { InputParams } from '@tweakpane/core/src/blade/common/api/params'
// @FIXME: Unexpected keyword 'false'
// import { __DEBUG__ } from '~/utils/dev'

// @FIXME: Weird, Can't use the ternary operator with Process.client for Nuxt 3
let NEED_GUI = process.env.NODE_ENV === 'development'
if (process.client) {
  NEED_GUI = NEED_GUI || location.hostname.includes('.vercel.app')
}

interface PaneStateDefinition {
  pane: Ref<Pane>
}

const PANES: Record<string, Pane | null> = {

}

const PaneContext = Symbol('PaneContext') as InjectionKey<PaneStateDefinition>

function usePaneContext(component: string) {
  const context = inject(PaneContext, null)

  if (context === null) {
    throw new Error(`<${component} /> is missing a parent <TPane /> component.`)
  }

  return context
}

export const TPane = defineComponent({
  name: 'TPane',

  props: {
    title: { type: String, default: undefined },
    expanded: { type: Boolean, default: false },
    float: { type: Boolean, default: true },
  },
  setup(props, context) {
    const el: Ref<HTMLElement | null> = ref(null)
    const pane: Ref<Pane | null> = ref(null)

    provide(PaneContext, {
      pane
    })

    const initPane = () => {
      nextTick(() => {
        if (pane.value || !NEED_GUI) {
          return
        }

        if (el.value instanceof Element || props.float) {
            pane.value = PANES[props.title as string] || new Pane({
              container: props.float ? undefined : el.value as HTMLElement,
              title: props.title,
              expanded: props.expanded
            })

          if (props.float && props.title) {
            PANES[props.title] = pane.value
          }
        }
      })
    }

    onMounted(() => {
      initPane()
    })

    onUnmounted(() => {
      // console.log('pane.value', pane.value)
      // pane.value?.dispose()
    })

    onActivated(() => {
      initPane()
    })

    onDeactivated(() => {
      if (!pane.value || !PANES[props.title as string]) {
        pane.value = null
        return
      }
      pane.value?.dispose()
      pane.value = null
      PANES[props.title as string] = null
    })

    return () =>
      h('div', { ref: el, class: { tweakpane: true, hidden: props.float } }, context.slots.default?.())
  }
})

interface FolderStateDefinition {
  folder: Ref<FolderApi>
}

const FolderContext = Symbol(
  'FolderContext'
) as InjectionKey<FolderStateDefinition>

function useFolderContext(component: string) {
  return inject(FolderContext, null)
}

export const TFolder = defineComponent({
  name: 'TFolder',
  render() {
    return h('div', {}, this.$slots.default?.())
  },
  props: {
    title: { type: String, required: true },
    expanded: { type: Boolean, default: true }
  },
  setup(props) {
    const { title, expanded } = props
    const folder: Ref<FolderApi | null> = ref(null)
    const paneContext = usePaneContext('TFolder')

    onActivated(() => {
      setTimeout(() => {
        folder.value = paneContext.pane.value?.addFolder({ title, expanded })
      }, 0)
    })
    provide(FolderContext, {
      folder
    })

    onDeactivated(() => {
      folder.value?.dispose()
    })
  }
})

export const TInput = defineComponent({
  name: 'TInput',
  emits: [ 'update:modelValue', 'change' ],
  props: {
    modelValue: { type: [Object, String, Number, Boolean] },
    name: { type: String, required: true },
    optParams: { type: Object as () => InputParams, default: undefined }
  },
  render() {},
  setup(props, { emit }) {
    const paneContext = usePaneContext('TInput')
    const folderContext = useFolderContext('TInput')
    const blade = ref(null)
    const input = ref(null)
    let initTimer

    const PARAMS = {
      [props.name]: props.modelValue
    }

    onActivated(() => {
      initTimer = setTimeout(() => {
        blade.value = folderContext?.folder.value
          ? folderContext.folder.value
          : paneContext.pane.value
        input.value = blade.value?.addInput(PARAMS, props.name, props.optParams)
        input.value?.on('change', (ev) => {
          emit('update:modelValue', ev.value)
          emit('change', ev.value)
        })
      }, 20)
    })

    onDeactivated(() => {
      clearTimeout(initTimer)
      input.value?.dispose()
    })
  }
})

export const TButton = defineComponent({
  name: 'TInput',
  emits: [ 'click' ],
  props: {
    title: { type: String, required: true },
    name: { type: String },
    optParams: { type: Object as () => InputParams, default: undefined }
  },
  render() {},
  setup(props, { emit }) {
    const paneContext = usePaneContext('TButton')
    const folderContext = useFolderContext('TButton')
    const blade = ref(null)
    const button = ref(null)
    let initTimer

    const PARAMS = {
      title: props.title,
      label: props.name
    }

    onMounted(() => {
      initTimer = setTimeout(() => {
        blade.value = folderContext?.folder.value
          ? folderContext.folder.value
          : paneContext.pane.value
          button.value = blade.value?.addButton(PARAMS)
          button.value?.on('click', (ev) => {
            emit('click', ev.value)
          })
      }, 20)
    })

    onBeforeUnmount(() => {
      clearTimeout(initTimer)
      button.value?.dispose()
    })
  }
})

export const TweakpanePlugin = {
  install(app) {
    app.component('TPane', TPane)
    app.component('TFolder', TFolder)
    app.component('TInput', TInput)
    app.component('TButton', TButton)
  }
}

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(TweakpanePlugin)
})
