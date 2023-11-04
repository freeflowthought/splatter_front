import axios from 'axios'

export default ({ app }) => {
  // Set the base URL for your API requests


  // Inject axios into the Vue prototype
  app.$axios = axios
}
