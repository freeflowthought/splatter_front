import Vue from 'vue'
import { MetaMaskSDK } from '@metamask/sdk';
import alertsVue from '~/components/alerts.vue';

const MMSDK = new MetaMaskSDK(
  {
    storage: { enabled: true, },
    injectProvider: true,
    forceInjectProvider: false,
    enableDebug: true,
    shouldShimWeb3: true,
  }
);

const ethereum = MMSDK.getProvider();

const metamask = {
  userCurrentChainId : undefined,
  userAccounts : undefined,
  userAccount : undefined,

  init: async function getWallets() {
    this.userAccounts = await ethereum.request({ method: 'eth_requestAccounts', params: [] }).catch((err) => {
      if (err.code === 4001) {

        console.log('Please connect to MetaMask.');
        alert("Connection rejected, please connect your metamask wallet")
      } else {
         console.error(err);
      }
    });
    localStorage.accountId = this.userAccounts[0]
    localStorage.setItem("userConnected", "true")
    localStorage.setItem("wallet", this.userAccounts[0])
    localStorage.setItem("chainId", ethereum.chainId)
    

    this.userAccount = this.userAccounts[0]
    this.userCurrentChainId = ethereum.chainId
  },
  haveMetamask: () => {
    if (typeof window.ethereum !== 'undefined' && window.ethereum.isMetaMask) {
      console.log('MetaMask is installed!');
      return true
    }
    return false
  },

  updateWallet() {

  },

  updateChainId() {

  },


  changeUserCurrentChain: async () => {

    try {
      await ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x82751' }],
      });
      
      window.location.reload();
    } catch (switchError) {
      // The network has not been added to MetaMask
      if (switchError.code === 4902) {
        alert("Please add ScrollAplhaChain to Metamask");
        this.addTestnetToMetamask()
      }
    }
  },
  
  addTestnetToMetamask: async () => {
    try {
      await ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [
            {
              chainId: '0x82751', 
              chainName:'Scroll Alpha Testnet',
              rpcUrls:['https://scroll-alpha-public.unifra.io'],                   
              blockExplorerUrls:['https://blockscout.scroll.io'],  
              nativeCurrency: { 
                symbol:'ETH',   
                decimals: 18
              }     
            }
          ]
      });
    } catch (err) {
      alertsVue()
    } 
  },
}

Vue.prototype.$metamask = metamask
