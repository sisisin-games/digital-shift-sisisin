<script>
import Vue from 'vue'

export default Vue.extend({
  render: () => undefined,
  mounted() {
    setTimeout(() => {
      Object.keys(this.$listeners).forEach(type => {
        document.addEventListener(type, this.$listeners[type])
      })
    })
  },
  beforeDestroy() {
    Object.keys(this.$listeners).forEach(type => {
      document.removeEventListener(type, this.$listeners[type])
    })
  },
})
</script>
