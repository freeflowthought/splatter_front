import Vue from "vue"
import computeds from "~/mixins/computeds"

// Make sure to pick a unique name for the flag
// so it won't conflict with any other mixin.
if (!Vue.computeds) {
  Vue.computeds = true
  Vue.mixin(computeds) // Set up your mixin then
}
