<template>
  <view
    :class="classes"
    @click="handleClick"
    @touchstart="cellTouchStart"
    @touchmove="cellTouchMove"
    @touchend="cellTouchEnd"
  >
    <!-- mask -->
    <view v-if="hasMask" :class="maskClass" />

    <!-- left -->
    <view :class="leftClasses">
      <slot name="left" />
    </view>

    <!-- main -->
    <view :class="wrapperClasses">
      <view :class="titleClass">
        <slot name="icon" />
        <template v-if="$slots.title">
          <slot name="title" />
        </template>
        <template v-else>
          <text>{{ title }}</text>
          <text :class="labelClass">{{ label }}</text>
        </template>
      </view>

      <view :class="valueClass">
        <slot name="value">
          <text>{{ value }}</text>
        </slot>
      </view>
    </view>

    <!-- right -->
    <view :class="rightClasses">
      <slot name="right" />
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue'

/**
 * props
 */
const props = defineProps<{
  title?: string
  value?: any
  label?: string
  link?: string
  hasMask?: boolean
}>()

/**
 * emits
 */
const emit = defineEmits<{
  (e: 'click', evt: Event): void
  (e: 'touchstart', evt: TouchEvent): void
  (e: 'touchmove', evt: TouchEvent): void
  (e: 'touchend', evt: TouchEvent): void
}>()

const prefixCls = 'dpzvc3-cell'

/**
 * class computed
 */
const classes = computed(() => [prefixCls])
const maskClass = computed(() => [`${prefixCls}-mask`])
const leftClasses = computed(() => [`${prefixCls}-left`])
const rightClasses = computed(() => [`${prefixCls}-right`])
const wrapperClasses = computed(() => [
  `${prefixCls}-main`,
  'dpzvc3-1px-top',
])
const titleClass = computed(() => [`${prefixCls}-main-title`])
const valueClass = computed(() => [`${prefixCls}-main-value`])
const labelClass = computed(() => [`${prefixCls}-main-label`])

/**
 * events
 */
const handleClick = (e: Event) => {
  if (props.link) {
    uni.navigateTo({
      url: props.link,
    })
  } else {
    emit('click', e)
  }
}

const cellTouchStart = (e: TouchEvent) => emit('touchstart', e)
const cellTouchMove = (e: TouchEvent) => emit('touchmove', e)
const cellTouchEnd = (e: TouchEvent) => emit('touchend', e)
</script>

<style scoped>
/* 样式你可以直接复用原来的 */
@import "@dpzvc3/styles/dist/base/reset.css";
@import "@dpzvc3/styles/dist/utils/nowrap.css";
@import "@dpzvc3/styles/dist/utils/1px.css";
@import "@dpzvc3/styles/dist/components/cell.css";
</style>