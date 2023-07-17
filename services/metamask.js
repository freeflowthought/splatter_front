import Vue from 'vue'
import { MetaMaskSDK } from '@metamask/sdk';

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
    localStorage.setItem("wallets", this.userAccounts[0])
    localStorage.setItem("chainId", ethereum.chainId)
    

    this.userAccount = this.userAccounts[0]
    this.userCurrentChainId = ethereum.chainId
  },
  haveMetamask: () => {
    if (typeof window.ethereum !== 'undefined') {
      console.log('MetaMask is installed!');
      return true
    }
    return false
  },

 /*  refreshAccounts: (accounts) => {if (accounts.length > 0) {
    updateWallet(accounts)
  } else {
    // if length 0, user is disconnected
    setWallet(initialState)
  }},
 */
  changeUserCurrentChain: async (desiredChainId) => {
    try {

      await ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: desiredChainId }],
      });
      console.log("You have switched to the right network")
      
    } catch (switchError) {
      
      // The network has not been added to MetaMask
      if (switchError.code === 4902) {
       console.log("Please add the Polygon network to MetaMask")
      }
      console.log("Cannot switch to the network")
      
    }
  },
  



  /* // it would be nice to take network params and choose wich to provide with some switch statement
  addNetworkToMetamask: async (desiredChain) => {
    // poligon chain 0x89
    try {
      await provider.request({
        method: 'wallet_addEthereumChain',
        params: [
            {
              chainId: '0x89', 
              chainName:'Polygon',
              rpcUrls:['https://polygon-rpc.com '],                   
              blockExplorerUrls:['https://polygonscan.com/'],  
              nativeCurrency: { 
                symbol:'MATIC',   
                decimals: 18
              }     
            }
          ]});
    } catch (err) {
       console.log(err);
  } 
  } */
}


 Vue.prototype.$metamask = metamask
