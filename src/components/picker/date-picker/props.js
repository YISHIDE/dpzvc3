/**
 * Created by yishide on 2025/9/13.
 */
export default {
  props: {
    dateValue: String,
    year: {
      type: [Boolean, Array],
      default: true
    },
    month: {
      type: [Boolean, Array],
      default: true
    },
    day: {
      type: [Boolean, Array],
      default: true
    },
    valueSeparator: {
      type: String,
      default: '/'
    }
  }
}
