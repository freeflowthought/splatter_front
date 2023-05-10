export default {
  computed: {
    baseUrl() {
      return this.$axios.defaults.baseURL
    },
    isLogged() {
      return this.$store.state.isLogged
    },
    user() {
      return this.$store.state.dataUser
    },
  },
  methods: {
    basePath(url, prefix = "/app") {
      const appIsLaunched = localStorage.getItem("appIsLaunched");
      return this.localePath(`${appIsLaunched ? prefix : ''}${url}`)
    },
  }
}
