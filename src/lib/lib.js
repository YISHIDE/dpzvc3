const rafTimeout = (callback, delay) => {
  let start = null
  let rafId

  function loop (timestamp) {
    if (!start) start = timestamp

    if (timestamp - start >= delay) {
      callback()
      cancelAnimationFrame(rafId)
    } else {
      rafId = requestAnimationFrame(loop)
    }
  }

  rafId = requestAnimationFrame(loop)

  // 返回清除方法
  return () => cancelAnimationFrame(rafId)
}

export default rafTimeout
