<template lang="pug">
.physics-blocks(
  ref="el"
  :class="{ 'is-inited': isInited }"
)
  client-only
    .icon-item.block-item(
      v-for="logoUrl in goodbyeLogos"
      :ref="setItemRef"
      :class="`${logoUrl.replace(/^.*[\\/]/, '').split('.')[0]}`"
    )
      .bg-img(
        :style="{ backgroundImage: `url(${logoUrl})` }"
      )
</template>

<script setup lang="ts">
import { gsap } from 'gsap'
import type Matter from 'matter-js'
import type { Engine, Body } from 'matter-js'
import { useRafFn, useResizeObserver, useScroll } from '@vueuse/core'
import { getScrollSpeed } from '@/utils/dom'

const goodbyeLogos = [
  '/overview/goodbye-logos/airtable.svg',
  '/overview/goodbye-logos/clip-path.svg',
  '/overview/goodbye-logos/google-1.svg',
  '/overview/goodbye-logos/google-2.svg',
  '/overview/goodbye-logos/google-3.svg',
  '/overview/goodbye-logos/jira.svg',
  '/overview/goodbye-logos/mailchimp.svg',
  '/overview/goodbye-logos/miro.svg',
  '/overview/goodbye-logos/notion.svg',
  '/overview/goodbye-logos/trello.svg',
  '/overview/goodbye-logos/zoom.svg',
]

const initProgress = ref(0)

// @REF: https://github.com/significa/significa.co
const GRAVITY_DEFAULT_VALUE = 0.0008 as const
// Matter
let matterInstance: typeof Matter
// Active engine
let engine: Engine
let isAddingBox: boolean
// Where engine will live and use as reference
const el = ref()
let containerRef: HTMLElement
// Items where Matter will be applied
let items = []
let refs: HTMLElement[] = []
let boxes: ({
  body: Body
  elem: HTMLElement
  render(): void
} | null)[]

// Quantity of initial items
let initialBoxesN = items?.length ?? 0
let currentBodies = 0
let recalc = ref(false)

const isInited = ref(false)

watch(recalc, (val) => {
  if (!val || currentBodies <= 0) return
  const newBoxes = getBoxes(matterInstance)

  // add limits to engine
  matterInstance.Composite.add(engine.world, [
    ...newBoxes.filter((bx) => bx !== null).map((b) => b!.body)
  ])

  // remove old boxes from engine
  boxes
    .filter((bx) => bx !== null)
    .forEach((box) => matterInstance.Composite.remove(engine.world, box!.body))

  // update boxes state as source of truth
  boxes = newBoxes
  recalc.value = false
})

// Limits for resize handling
let boxGround: Body
let boxLeftWall: Body
let boxRightWall: Body

const setItemRef = (el: HTMLElement) => {
  if (el) {
    refs.push(el)
  }
}

const getBoxes = (matter: typeof Matter) => {
  // Create boxes from current rendered items
  const boxes = refs.map((boxRef) => {
    if (getComputedStyle(boxRef).display === 'block') {
      const getCircleBody = () => matter.Bodies.circle(
        containerRef.clientWidth * Math.random() * 0.4,
        -containerRef.clientHeight *  Math.random() * 0.5,
        boxRef.clientWidth/2,
        {
          friction: 1
        }
      )
      const getRectBody = () => {
        return matter.Bodies.rectangle(
          containerRef.clientWidth * Math.random() * 0.4,
          -containerRef.clientHeight *  Math.random() * 0.5,
          boxRef.clientWidth,
          boxRef.clientHeight,
          {
            friction: 1
          }
        )
      }
      const body = boxRef.className.includes('zoom')
        ? getCircleBody()
        : getRectBody()

      return {
        body,
        elem: boxRef,
        render() {
          if (boxRef?.clientHeight && boxRef?.clientWidth) {
            const { x, y } = this.body.position;
            this.elem.style.top = `${y - boxRef.clientHeight / 2}px`;
            this.elem.style.left = `${x - boxRef.clientWidth / 2}px`;
            this.elem.style.transform = `rotate(${this.body.angle}rad)`;
          }
        }
      }
    } else {
      return null
    }
  })

  return boxes
}

const getLimits = (matter: typeof Matter) => {
  const ceil = matter.Bodies.rectangle(
    containerRef.clientWidth / 2,
    -containerRef.clientHeight / 2,
    containerRef.clientWidth,
    60,
    {
      isStatic: true,
      friction: 1
    }
  )
  const ground = matter.Bodies.rectangle(
    containerRef.clientWidth / 2,
    containerRef.clientHeight + 60 / 2,
    containerRef.clientWidth,
    64,
    { isStatic: true, friction: 1 }
  )
  const leftWall = matter.Bodies.rectangle(
    containerRef.clientWidth + 60 / 2,
    containerRef.clientHeight / 2,
    60,
    containerRef.clientHeight * 2,
    { isStatic: true, friction: 1 }
  )
  const rightWall = matter.Bodies.rectangle(
    -60 / 2,
    containerRef.clientHeight / 2,
    60,
    containerRef.clientHeight * 2,
    { isStatic: true, friction: 1 }
  )

  return { ground, leftWall, rightWall, ceil }
}

let canvas: HTMLCanvasElement
let context: CanvasRenderingContext2D
const enableDebugView = false
const renderDebugView = () => {
  if (!enableDebugView) return

  if (!canvas) {
    canvas = document.createElement('canvas'),
    context = canvas.getContext('2d')
    canvas.width = 800
    canvas.height = 600
    canvas.style.position = 'fixed'
    canvas.style.zIndex = '2'
    canvas.style.opacity = '0.3'
    canvas.style.top = '0'
    canvas.style.left = '0'
    canvas.style.pointerEvents = 'none'
    document.body.appendChild(canvas)
  }

  var bodies = matterInstance.Composite.allBodies(engine.world);

  context.fillStyle = '#fff';
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.beginPath();

  for (var i = 0; i < bodies.length; i += 1) {
    var vertices = bodies[i].vertices;

    context.moveTo(vertices[0].x, vertices[0].y);

    for (var j = 1; j < vertices.length; j += 1) {
        context.lineTo(vertices[j].x, vertices[j].y);
    }

    context.lineTo(vertices[0].x, vertices[0].y);
  }

  context.lineWidth = 1;
  context.strokeStyle = '#999';
  context.stroke();
}

const initialization = (matter: typeof Matter) => {
  const Engine = matter.Engine,
      MouseConstraint = matter.MouseConstraint,
      Mouse = matter.Mouse,
      Composite = matter.Composite

    // Create engine
    engine = Engine.create({ gravity: { scale: GRAVITY_DEFAULT_VALUE } })

    // Create boxes from current rendered items
    const initialBoxes = getBoxes(matter)

    // Update boxes state with created boxes
    boxes = initialBoxes

    // Limits
    const { ground, leftWall, rightWall, ceil } = getLimits(matter)

    // Update limits state to allow resize calculation if needed
    boxGround = ground
    boxLeftWall = leftWall
    boxRightWall = rightWall

    // Mouse Constraints
    const mouse = Mouse.create(containerRef),
      mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
          stiffness: 0.04,
          render: {
            visible: true
          }
        }
      })

    // Add event listener to void draggable Objects stuck on container edges
    el.value.addEventListener("mouseleave", () => {
      // fire mouseup event to let go of the dragged item
      mouseConstraint.mouse.mouseup(event);
    });

    // This looks hideous but it's really needed
    // Allow page scroll when mouse is hovering canvas or touch device is interacting
    mouseConstraint.mouse.element.removeEventListener(
      'mousewheel',
      (mouseConstraint.mouse as any).mousewheel
    )
    mouseConstraint.mouse.element.removeEventListener(
      'DOMMouseScroll',
      (mouseConstraint.mouse as any).mousewheel
    )
    mouseConstraint.mouse.element.removeEventListener(
      'touchstart',
      (mouseConstraint.mouse as any).mousedown
    )
    mouseConstraint.mouse.element.removeEventListener(
      'touchmove',
      (mouseConstraint.mouse as any).mousemove
    )
    mouseConstraint.mouse.element.removeEventListener(
      'touchend',
      (mouseConstraint.mouse as any).mouseup
    )

    // Add all of the bodies and walls to the world
    Composite.add(engine.world, [
      ...initialBoxes.filter((bx) => bx !== null).map((b) => b!.body),
      leftWall,
      rightWall,
      ceil,
      ground,
      mouseConstraint
    ])

    currentBodies = refs?.filter((ref) => getComputedStyle(ref).display === 'block').length || 0

    // Main loop
    useRafFn(() => {
      boxes.forEach((box) => box?.render())
      Engine.update(engine, 1000 / 60)
      renderDebugView()
    })
}

const setupResize = () => {
  useResizeObserver(el, () => {
    const prevCurrent = currentBodies

    if (!isInited.value) return

    if (
      prevCurrent !== (refs?.filter((ref) => getComputedStyle(ref).display === 'block').length || 0)
    ) {
      currentBodies = refs?.filter((ref) => getComputedStyle(ref).display === 'block').length || 0
      recalc.value = true
    }

    // re-calculate limits
    const { ground, leftWall, rightWall } = getLimits(matterInstance)

    // add limits to engine
    matterInstance.Composite.add(engine.world, [ground, leftWall, rightWall])

    // remove old limits from engine
    matterInstance.Composite.remove(engine.world, boxGround)
    matterInstance.Composite.remove(engine.world, boxLeftWall)
    matterInstance.Composite.remove(engine.world, boxRightWall)

    // update limits state as source of truth
    boxGround = ground
    boxLeftWall = leftWall
    boxRightWall = rightWall
  })
}

const clamp = (num: number, min: number, max: number) => Math.min(Math.max(num, min), max)

const setupScroll = () => {
  const { y, directions } = useScroll(document)
  const { isMobile } = useDevice()

  watch(y, () => {
    if (!isMobile || initProgress.value < 0.9) return

    engine.gravity = {
      x: 0,
      y: 1,
      scale: clamp(getScrollSpeed(), -30, 30) * -0.0001
    };

    // prevent negative gravity being stuck
    setTimeout(() => {
      engine.gravity = {
        x: 0,
        y: 1,
        scale: GRAVITY_DEFAULT_VALUE
      };
    }, 250);
  })
}

const initMatter = () => {
  if (isInited.value || !matterInstance) return
  containerRef = el.value
  initialization(matterInstance)
  setupResize()
  setupScroll()
  isInited.value = true
}

const setupScrollTrigger = () => {
  gsap.to(initProgress, {
    scrollTrigger: {
      trigger: el.value,
      start: "top center",
      markers: false,
      toggleActions: "play none none none",
      onEnter: () => {
        initMatter()
      }
    },
    value: 1,
    duration: 1
  })
}

onActivated(async () => {
  const matter = await import('matter-js')
  matterInstance = matter
  setupScrollTrigger()
})
</script>

<style lang="stylus">
.physics-blocks
  opacity: 0
  overflow: hidden

  &.is-inited
    opacity: 1

  .block-item
    position: absolute

  .icon-item
    font-size: 60px
    width: 1em
    user-select: none
    overflow: hidden

    .bg-img
      width: 100%
      height: 100%
      background-size: contain
      background-repeat: no-repeat

    &.zoom
      aspect-ratio: 78/79

    &.airtable
      aspect-ratio: 97/81

    &.clip-path
      aspect-ratio: 68/78

    &.jira
      aspect-ratio: 1/1

      .bg-img
        transform: scale(2)

    &.mailchimp
      aspect-ratio: 68/72

    &.notion
      aspect-ratio: 78/83

    &.trello
      aspect-ratio: 84/84

    &.miro
      aspect-ratio: 84/84

    &.google-1
      aspect-ratio: 64/87
      width: 0.8em

    &.google-2
      aspect-ratio: 78/68

    &.google-3
      aspect-ratio: 64/87
      width: 0.8em

</style>
