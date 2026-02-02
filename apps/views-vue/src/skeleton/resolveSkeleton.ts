// src/skeleton/resolveSkeleton.ts
import Home from './HomeSkeleton.html?raw'
import Detail from './DetailSkeleton.html?raw'
import type { Router } from 'vue-router'

const skeletonMap: Record<string, string> = {
  home: Home,
  detail: Detail
}

export function resolveSkeleton(router: Router) {
  const route = router.currentRoute.value
  const key = route.meta.skeleton as string | undefined
  return key ? skeletonMap[key] || '' : ''
}