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
<script lang="ts">
import { ref, getCurrentInstance, defineComponent, onMounted } from "vue";
import DpButton from "../components/button";
import { useRouter } from "vue-router";
import type { ButtonProps, ButtonEmits } from "../components/button/types";
export default defineComponent({
  name: "ViewButton",
  components: {
    DpButton,
  },
  setup() {
    const router = useRouter();
    console.log(
      getCurrentInstance()?.vnode,
      typeof window !== "undefined" ? "client" : "server",
    );
    const loading = ref<ButtonProps["loading"]>(false);

    const onClick: ButtonEmits["click"] = (e) => {
      // console.trace('onClick triggered')
      loading.value = !loading.value;
      // alert(loading.value)
    };
    const jump = () => {
      router.push({ name: "guide" });
    };
    onMounted(() => {
      console.log("ViewButton mounted");
    });
    return {
      loading,
      onClick,
      jump,
    };
  },
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
