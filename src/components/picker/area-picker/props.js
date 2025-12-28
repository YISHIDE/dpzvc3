/**
 * Created by admin on 2025/10/13.
 */
export default {
  props: {
    addressValue: String,
    styles: {
      type: Object,
      default: () => {
      }
    },
    valueSeparator: {
      type: String,
      default: '/'
    }
  }
}
