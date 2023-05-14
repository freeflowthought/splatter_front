import Vue from 'vue'

Vue.directive('font', {
  bind(el, binding, vnode) {
    const value = () => {
      const hasNumber = binding.arg?.match(/\d+/g)
      const hasLetter = binding.arg?.match(/[a-zA-Z]/)

      if (hasNumber)
        return `max(${binding.value}px, ${hasLetter ? binding.arg : `${binding.arg}em`})`
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
    console.log(value());

    if (binding.modifiers.all) {
      for (const element of el.children)
        element.style.fontFamily = value();
      if (binding.modifiers.in) return;
    }

    el.style.fontFamily = value()
  },
})
