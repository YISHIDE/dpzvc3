import { defineComponent } from 'vue'
import './Badge.less'
import Badge from '@/components/badge/index'

export default defineComponent({
  name: 'ViewBadge',
  setup() {
    return () => (
      <div class="Badge">
        <Badge size="sss" number="10">
          <div class="item" />
        </Badge>
        <Badge number="100" max={99} dot={false}>
          <div class="item" />
        </Badge>
        <Badge number="100" max={99} dot={true}>
          <div class="item" />
        </Badge>
      </div>
    )
  }
})

