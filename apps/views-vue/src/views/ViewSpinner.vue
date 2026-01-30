<template>
  <div class="Spinner">
    <Spinner :type="type" />
  </div>
</template>

<script lang="ts" setup>
import type { SpinnerProps } from "@dpzvc3/vue/es/spinner";
const type = ref<SpinnerProps["type"]>("double-bounce");
  
</script>

<style scoped></style>
