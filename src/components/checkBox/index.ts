/**
 
 */
// import CheckBox from './checkbox.vue'
// import CheckGroup from './checkbox-group.vue'

// CheckBox.group = CheckGroup
// export default CheckBox
import CheckBox from './checkbox.vue'
import CheckBoxGroup from './checkbox-group.vue'

// type CheckBoxWithGroup = DefineComponent & {
//     group: typeof CheckGroup
// }

// const _CheckBox = CheckBox as unknown as CheckBoxWithGroup

// _CheckBox.group = CheckGroup

export {
    CheckBox,
    CheckBoxGroup
}
