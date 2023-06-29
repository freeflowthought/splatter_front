import Vue from 'vue'
const { ethers } = require("ethers");
const metaMaskProvider = new ethers.providers.Web3Provider(this.$metamask.$ethereum)
const rpcProvider = new ethers.providers.JsonRpcProvider('https://alpha-rpc.scroll.io/l2')
const signer = metaMaskProvider.getSigner();
const fs = require('fs');
// const { getAddress } = require("ethers/lib/utils");

const defaultProvider = new ethers.providers.Web3Provider(window.ethereum)

const ethersProvider = {
    chainId : undefined,
    //defaultProvider,
    metaMaskProvider,
    rpcProvider,
    signer,

    async claimFaucet(contracAddress) {
        faucetAbi = fs.readFileSync("./../static/abisfaucet.json").toString().trim()
        tokenContract = new ethers.Contract(contracAddress, faucetAbi, this.signer)
        let tx = await tokenContract.faucet;
        
    }
}

Vue.prototype.$provider = ethersProvider

