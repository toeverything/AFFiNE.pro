export const getScrollSpeed = (() => {
  let lastPos: number | null
  let newPos: number
  let timer: NodeJS.Timeout
  let delta: number
  const delay = 40

  function clear() {
    lastPos = null
    delta = 0
  }

  clear()

  return () => {
    newPos = window.scrollY
    if (lastPos != null) {
      delta = newPos - lastPos
    }
    lastPos = newPos
    clearTimeout(timer)
    timer = setTimeout(clear, delay)
    return delta
  }
})()
