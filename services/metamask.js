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
   userAccounts : undefined,
   userAccount : undefined,
   init: async function getWallets() {
     this.userAccounts = await ethereum.request({ method: 'eth_requestAccounts', params: [] }).catch((err) => {
       if (err.code === 4001) {
         // EIP-1193 userRejectedRequest error
         // If this happens, the user rejected the connection request.
         console.log('Please connect to MetaMask.');
         alert("Connection rejected, please connect your metamask wallet")
       } else {
         console.error(err);
       }
     });

     this.userAccount = this.userAccounts[0]
   },
   haveMetamask: () => {
     if (typeof window.ethereum !== 'undefined') {
       console.log('MetaMask is installed!');
       return true
     }
     alert("Connection rejected, please connect your metamask wallet");
     return false
   }
 }

 Vue.prototype.$metamask = metamask
