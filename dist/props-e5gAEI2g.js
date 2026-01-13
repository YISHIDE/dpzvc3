"use strict";
const vue = require("vue");
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
    const spinnerStyle = vue.computed(() => {
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
exports.spinnerProps = spinnerProps;
//# sourceMappingURL=props-e5gAEI2g.js.map
