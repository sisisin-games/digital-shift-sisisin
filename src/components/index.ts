import Vue from 'vue'

const requireComponent = require.context('', true, /(?<![/\\]index)\.(?:ts|vue)$/)
requireComponent.keys().forEach(filePath => {
  const component = requireComponent(filePath)
  const name = filePath.match(/[^/\\]+(?=\.vue$)/)?.[0]
  if (name) {
    Vue.component(name, component.default)
  }
})
