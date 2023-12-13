<template>
  <div id="alerts">
    <v-snackbar
      v-for="(item,i) in dataAlerts" :key="i"
      v-model="item.model"
      transition="slide-Y-reverse-transition"
      :style="`
        --color-snackbar: ${item.color};
        --bg-snackbar: ${item.key === 'success' ? '#E1D8D1'
        : item.key === 'warning' ? '#E1D8D1'
        : item.key === 'cancel' ? '#E1D8D1'
        : item.key === 'info' ? '#E1D8D1'
        : ''}`
      "
    >
      <div class="center font3" style="gap: 8px">
        <v-icon :color="item.color" size="1.375em">{{ item.icon }}</v-icon>
        <span class="hspan" style="--fs: 1em; --c: #2D3748">{{$t(item.message)}}</span>
      </div>
      
      <v-btn icon @click="dataAlerts.splice(i, 1)">
        <v-icon color="#2D3748" size="1.1875em">mdi-close</v-icon>
      </v-btn>
    </v-snackbar>
  </div>
</template>

<script>
export default {
  name: "AlertsComponent",
  data() {
    return {
      dataAlerts: []
    };
  },
  methods: {
    GenerateAlert(key, message = `${key}Message`) {
      // // create alert
      const alert = {
        key,
        message,
        color: `var(--${key === 'cancel' ? 'error' : key === 'info' ? 'info' : key})`,
        icon: key === 'success' ? 'mdi-check-circle' : 'mdi-information',
        model: true
      }
      this.dataAlerts.push(alert)
      // clear alerts
      setTimeout(() => this.dataAlerts?.shift(), 5000);
    },
  }
};
</script>

<style src="~/assets/styles/components/alerts.scss" lang="scss" />
