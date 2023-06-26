import Vue from 'vue'
import { chain, configureChains, WagmiConfig, createClient } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';



 const provider =  {
    metamaskProvider : undefined,
    default_provider : undefined,
    
    //  UNISWAP_ROUTER_ADDRESS = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
    //  faucet_abi : fs.readFileSync("./../static/abis/faucet.json").toString(),

    initProvider(chainId = 80001) {
        const { connect } = useConnect({
            connector: new InjectedConnector(),
            chainId: chainId.chainId,
          });
    },

    claimFaucet(contractAddress) {
        faucetContract = new ethers.Contract(contractAddress, this.faucet_abi, this.default_provider),
        faucetContract.faucet()     
    },
}


Vue.prototype.$provider = provider