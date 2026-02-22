<template>
  <div class="Popup">
    <DpButton width="50%" @click="() => showPop('top')"> Top </DpButton>
    <DpButton width="50%" @click="() => showPop('right')"> Right </DpButton>
    <DpButton width="50%" @click="() => showPop('bottom')"> Bottom </DpButton>
    <DpButton width="50%" @click="() => showPop('left')"> Left </DpButton>

    <Popup
      v-model="show"
      :position="side"
      :width="width"
      :height="height"
      :show-mask="true"
    />
  </div>
</template>

<script lang="ts" setup>
import type { PopupProps } from '@dpzvc3/vue/es/popup';
type Side = 'top' | 'right' | 'bottom' | 'left';

const side = ref<PopupProps['position']>('top');
const show = ref<PopupProps['modelValue']>(false);
const width = ref<PopupProps['width']>('100%');
const height = ref<PopupProps['height']>('100%');
const sideList: Side[] = ['top', 'right', 'bottom', 'left'];

const showPop = (s: Side) => {
  show.value = false;
  nextTick(() => {
    if (!sideList.includes(s)) s = 'top';

    switch (s) {
      case 'top':
        width.value = '100%';
        height.value = '70%';
        break;
      case 'right':
        width.value = '70%';
        height.value = '100%';
        break;
      case 'bottom':
        width.value = '100%';
        height.value = '70%';
        break;
      case 'left':
        width.value = '70%';
        height.value = '100%';
        break;
    }

    side.value = s;

    setTimeout(() => {
      show.value = true;
    }, 350);
  });
};
</script>

<style scoped>
.Popup {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}
</style>
