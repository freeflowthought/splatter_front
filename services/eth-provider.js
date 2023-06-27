import Vue from 'vue'
const { ethers } = require("ethers");
// const { getAddress } = require("ethers/lib/utils");
const metaMaskProvider = new ethers.providers.Web3Provider(this.$metamask.$ethereum)
const provider = new ethers.providers.JsonRpcProvider('https://alpha-rpc.scroll.io/l2')
// mumbaqi testnet 80001
// scroll alpha 534353
// eslint-disable-next-line new-cap
const defaultProvider = new ethers.getDefaultProvider(80001);

const ethersProvider = {
    chainId : undefined,
    defaultProvider,
    metaMaskProvider,   
    provider 
}

Vue.prototype.$provider = ethersProvider

