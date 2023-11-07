import Vue from 'vue'

const routerAddress = { '0x8274f': '0xf18c4ed3250f4A14279F5f79eD00b5A1Cd0391B0',  '0x82750': '0xB6120De62561D702087142DE405EEB02c18873Bc'};
const factoryAddress = { '0x8274f': '0x756Afd4cA8cE2ef38bD16b8BBB9e39e5e72D1c8c',  '0x82750': '0xad88D4ABbE0d0672f00eB3B83E6518608d82e95d'};

const protocolAddresses = {
  getRouterAddress(chainId) {
    return routerAddress[chainId]
  },

  getFactoryAddress(chainId) {
    return factoryAddress[chainId]
  }
}

Vue.prototype.$protocolAddresses = protocolAddresses
