import Vue from 'vue'

const routerAddress = { '0x8274f': '0x2f2f7197d19A13e8c72c1087dD29d555aBE76C5C',  '0x82750': '0xB6120De62561D702087142DE405EEB02c18873Bc'};
const factoryAddress = { '0x8274f': '0xa8ef07AEbC64A96Ae264f3Bd5cC37fF5B28B1545',  '0x82750': '0xad88D4ABbE0d0672f00eB3B83E6518608d82e95d'};

const protocolAddresses = {
  getRouterAddress(chainId) {
    return routerAddress[chainId]
  },

  getFactoryAddress(chainId) {
    return factoryAddress[chainId]
  }
}

Vue.prototype.$protocolAddresses = protocolAddresses
