import Vue from 'vue'

Vue.directive('font', {
  bind(el, binding, vnode) {
    const value = () => {
      const hasNumber = binding.arg?.match(/\d+/g)
      const hasLetter = binding.arg?.match(/[a-zA-Z]/)

      if (hasNumber) {
        const number = binding.arg.split(",").join(".")
        return `max(${binding.value}px, ${hasLetter ? number : `${number}em`})`
      }
      return `${binding.value}${binding.arg || 'px'}`
    }

    if (binding.modifiers.all) {
      for (const element of el.children)
        element.style.fontSize = value();
      if (binding.modifiers.in) return;
    }

    el.style.fontSize = value()
  },
})


Vue.directive('family', {
  bind(el, binding, vnode) {
    const value = () => binding.value

    if (binding.modifiers.all) {
      for (const element of el.children)
        element.style.fontFamily = value();
      if (binding.modifiers.in) return;
    }

    el.style.fontFamily = value()
  },
})


Vue.directive('flex', {
  bind(el, binding, vnode) {
    el.style.display = 'flex'

    if (binding.modifiers.column) el.style.flexDirection = 'column'
    if (binding.modifiers.align) el.style.alignItems = 'center'
    if (binding.modifiers.alignStart) el.style.alignItems = 'flex-start'
    if (binding.modifiers.alignEnd) el.style.alignItems = 'flex-end'
    if (binding.modifiers.justify) el.style.justifyContent = 'center'
    if (binding.modifiers.justifyStart) el.style.justifyContent = 'flex-start'
    if (binding.modifiers.justifyEnd) el.style.justifyContent = 'flex-end'
    if (binding.modifiers.center) {
      el.style.alignItems = 'center'
      el.style.justifyContent = 'center'
    }
    if (binding.modifiers.space) el.style.justifyContent = 'space-between'
    if (binding.modifiers.spaceA) el.style.justifyContent = 'space-around'
    if (binding.modifiers.spaceE) el.style.justifyContent = 'space-evenly'
    if (binding.modifiers.wrap) el.style.flexWrap = 'wrap'
    if (binding.value)
      if (binding.modifiers.self)
        el.style.flex = binding.value
      else for (const item of el.children)
        item.style.flex = binding.value
  },
})
