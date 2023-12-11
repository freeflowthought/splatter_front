export default {
  computed: {
    baseUrl() {
      return this.$axios.defaults.baseURL
    },
    // isLogged() {
    //   return this.$store.state.isLogged
    // },
    user() {
      return this.$store.state.dataUser
    },
    appIsLaunched() {
      return localStorage.getItem("appIsLaunched")
    },
  },
  methods: {
    basePath(url, prefix = "/app") {
      return this.localePath(`${this.appIsLaunched ? prefix : ''}${url}`)
    },

    basePath2(url, prefix = "/app") {
      return this.localePath(`${prefix}${url}`);
    }
  }
}
