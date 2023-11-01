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
const chainParams = {
  '0x8274f': {
    chainId: '0x8274f',
    rpcUrls: 'https://scroll-sepolia.blockpi.network/v1/rpc/public',
    chainName: 'Scroll Sepolia Testnet',
    blockExplorerUrls:['https://sepolia-blockscout.scroll.io'],
    nativeCurrency: {
      symbol:'ETH',
      decimals: 18
    }
  },
  '0x82750': {
    chainId: '0x82750',
    rpcUrls: 'https://rpc.ankr.com/scroll',
    chainName: 'Scroll',
    blockExplorerUrls:['https://scrollscan.com'],
    nativeCurrency: {
      symbol:'ETH',
      decimals: 18
    }
  },
};

const metamask = {
  userConnected : false,
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
    this.updateChainId()
    this.handleAccountsChanged(accounts)
  },

  handleAccountsChanged(accounts) {

    if (accounts.length === 0) {
      this.userAccount = undefined;
      this.userConnected = false
    } else if (accounts[0] !== this.userAccount) {
      this.userAccount = accounts[0];
      this.userConnected = true
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

  async switchToChain(id) {
    console.log(id)
    console.log(chainParams[id].chainId)
    console.log(ethereum.chainId, "ethereum chain id")
    try {
      await ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: chainParams[id].chainId }],
      });

    } catch (switchError) {
      // The network has not been added to MetaMask
      if (switchError.code === 4902) {
        try {
          await ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
                {
                  chainId: chainParams[id].chainId,
                  chainName: chainParams[id].chainName,
                  rpcUrls: chainParams[id].rpcUrls,
                  blockExplorerUrls: chainParams[id].blockExplorerUrls,
                  nativeCurrency: chainParams[id].nativeCurrency
                }
              ]
          });
        } catch (err) {

        }
      }
    }
    this.updateChainId()
  },

  changeUserCurrentChain: async () => {

    try {
      await ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x8274f' }],
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
                  chainId: '0x8274f',
                  chainName:'Scroll Sepolia',
                  rpcUrls:['https://scroll-sepolia.blockpi.network/v1/rpc/public'],
                  blockExplorerUrls:['https://sepolia-blockscout.scroll.io'],
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
    this.updateChainId()
  },



  disconnect() {
    ethereum.disconnect();
  },
  watch: {}
}

Vue.prototype.$metamask = metamask
