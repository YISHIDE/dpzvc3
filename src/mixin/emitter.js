/**
 * Emitter - Vue 3 版本
 * 使用 provide / inject 实现组件树通信
 */

import { inject, provide, getCurrentInstance, onUnmounted } from 'vue'

const EMITTER_KEY = Symbol('dpzvc3-emitter')

function createEmitter () {
  const components = new Map()

  function register (name, instance) {
    if (!name) return
    components.set(instance.uid, { name, instance })
  }

  function unregister (instance) {
    components.delete(instance.uid)
  }

  function dispatch (componentName, eventName, params = []) {
    for (const { name, instance } of components.values()) {
      if (name === componentName) {
        instance.emit(eventName, ...params)
        break
      }
    }
  }

  function broadcast (componentName, eventName, params = []) {
    for (const { name, instance } of components.values()) {
      if (name === componentName) {
        instance.emit(eventName, ...params)
      }
    }
  }

  return {
    register,
    unregister,
    dispatch,
    broadcast
  }
}

export function provideEmitter () {
  const emitter = createEmitter()
  provide(EMITTER_KEY, emitter)
  return emitter
}

export function useEmitter (componentName) {
  const emitter = inject(EMITTER_KEY, null)
  const instance = getCurrentInstance()

  if (!emitter || !instance) {
    console.warn('[Emitter] must be used inside setup() and under provideEmitter()')
    return {}
  }

  emitter.register(componentName, instance)

  onUnmounted(() => {
    emitter.unregister(instance)
  })

  return {
    dispatch: emitter.dispatch,
    broadcast: emitter.broadcast
  }
}
