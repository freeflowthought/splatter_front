import Vue from 'vue'
const { ethers } = require("ethers");
// const { getAddress } = require("ethers/lib/utils");
const metaMaskProvider = new ethers.providers.Web3Provider(this.$metamask.$ethereum)
// mumbaqi testnet 80001
// scroll alpha 534353
// eslint-disable-next-line new-cap
const defaultProvider = new ethers.getDefaultProvider(80001);

const ethersProvider = {
    chainId : undefined,
    defaultProvider,
    metaMaskProvider,    
}

Vue.prototype.$provider = ethersProvider

