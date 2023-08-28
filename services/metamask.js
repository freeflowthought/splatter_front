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
  userConnected : undefined,
  userCurrentChainId : undefined,
  userAccounts : undefined,
  userAccount : undefined,

  init: function() {
    return new Promise((resolve, reject) => {
      ethereum
        .request({ method: 'eth_requestAccounts', params: [] })
        .then((userAccounts) => {
          localStorage.accountId = userAccounts[0];
          localStorage.setItem("wallet", userAccounts[0]);
          localStorage.setItem("chainId", ethereum.chainId);
          this.userAccount = userAccounts[0];
          this.userCurrentChainId = ethereum.chainId;
          resolve(userAccounts[0]); // Resolve the promise with the account address
        })
        .catch((err) => {
          if (err.code === 4001) {
            console.log('Please connect to MetaMask.');
            alert("Connection rejected, please connect your MetaMask wallet");
          } else {
            console.error(err);
          }
          reject(err); // Reject the promise with the error
        });
    });
  },

  async connect() {
    await ethereum
      .request({ method: 'eth_requestAccounts' })
      .then(this.handleAccountsChanged)
      .catch((err) => {
        if (err.code === 4001) {
          console.log('Please connect to MetaMask.');
        } else {
          console.error(err);
        }
      });
  },

  detectMetamask () {
    if (typeof window.ethereum !== 'undefined' && window.ethereum.isMetaMask) {
      window.ethereum.on('accountsChanged', this.handleAccountsChanged);
      this.checkConnection()
      return false
    }
    return true
  },
  
  async checkConnection() {
    window.ethereum.on('accountsChanged', this.handleAccountsChanged);
    const accounts = await ethereum.request({ method: 'eth_accounts' })
    console.log(accounts)
    console.log(accounts)

    this.handleAccountsChanged(accounts)
  },

  handleAccountsChanged(accounts) {
    if (accounts.length === 0) {
      //  $('#connection-status').innerText = "You're not connected to MetaMask";
      this.userConnected = false
      console.log(this.userConnected)
      console.log("--------- should be false ---------")

    } else if (accounts[0] !== this.currentAccount) {
      this.currentAccount = accounts[0];
      this.userConnected = true
      console.log(this.userConnected)
      console.log("--------- should be true ---------")
    }
  },

  updateWallet() {
    ethereum.on('accountsChanged', (accounts) => {
      // Handle the updated accounts array
      // In most cases, it will have a single address, but it can be more in some situations (e.g., hardware wallet)
      this.currentAddress = accounts[0];
      console.log('New address:', this.currentAddress);
      this.currentAddress === undefined ? localStorage.removeItem("wallet") : localStorage.setItem("wallet", this.currentAddress);
      window.location.reload();
    });
  },

  updateChainId() {
    this.userCurrentChainId = ethereum.chainId
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
          
        }
      }
    }
  },

  disconnect() {
      ethereum.disconnect();
      localStorage.removeItem("wallet")
  },
  watch: {}
}

Vue.prototype.$metamask = metamask
