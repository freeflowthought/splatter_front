/* import Vue from 'vue'
const { ethers } = require("ethers");
const metaMaskProvider = new ethers.providers.Web3Provider(this.$metamask.$ethereum)
const rpcProvider = new ethers.providers.JsonRpcProvider('https://alpha-rpc.scroll.io/l2')
const signer = metaMaskProvider.getSigner();
// const { getAddress } = require("ethers/lib/utils");

const defaultProvider = new ethers.providers.Web3Provider(window.ethereum)



const ethersProvider = {
    chainId : undefined,
    defaultProvider,
    metaMaskProvider,
    rpcProvider,
    signer,

    async claimFaucet(contracAddress) {
        
        const tokenContract = new ethers.Contract(contracAddress, faucetAbi, this.signer)
        const tx = await tokenContract.faucet;
    }
}

Vue.prototype.$provider = ethersProvider */

