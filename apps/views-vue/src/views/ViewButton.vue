<template>
  <div class="Button">
    <DpButton type="primary" @click="jump"> Primary </DpButton>
    <DpButton type="success" :loading="loading" @click="onClick">
      Success
    </DpButton>
    <DpButton type="warning" :loading="loading" @click="onClick">
      Warning
    </DpButton>
    <DpButton type="danger"> Danger </DpButton>
    <DpButton type="normal"> Normal </DpButton>
    <DpButton type="normal" disabled> Disabled </DpButton>
  </div>
</template>
<script lang="ts" setup>
import type { ButtonProps, ButtonEmits } from "@dpzvc3/vue";
const router = useRouter();
console.log(
  getCurrentInstance()?.vnode,
  typeof window !== "undefined" ? "client" : "server",
);
const loading = ref<ButtonProps["loading"]>(false);

const onClick: ButtonEmits["click"] = (e) => {
  loading.value = !loading.value;
};
const jump = () => {
  router.push({ name: "guide" });
};
onMounted(() => {
  console.log("ViewButton mounted");
});
</script>

<style lang="less" scoped>
.Button {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}
</style>
