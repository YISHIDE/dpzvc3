import { computed } from "vue";
const spinnerProps = {
  props: {
    size: {
      type: [Number, String]
    },
    color: {
      type: String
    }
  },
  setup(props) {
    const spinnerStyle = computed(() => {
      if (props.size) {
        return {
          height: typeof Number(props.size) === "number" ? `${props.size}px` : props.size,
          width: typeof Number(props.size) === "number" ? `${props.size}px` : props.size
        };
      }
      return {};
    });
    return {
      spinnerStyle
    };
  }
};
export {
  spinnerProps as s
};
//# sourceMappingURL=props-CI3pQeT7.mjs.map
