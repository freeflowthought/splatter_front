import Vue from 'vue'
// Get the swap route using Squid API

import { Squid } from "@0xsquid/sdk"

const squid = new Squid({
  baseUrl: "https://v2.api.squidrouter.com",
  integratorId: process.env.squidAxelarApi
})


const squidAxelar = {
  async init() {
    await squid.init()

  },

  getChains () {
    return squid.chains
  },

  getTokens () {
    return squid.tokens
  },

  /*
  params
  {
    fromChain: 43114, // Avalanche
    toChain: 137, // Polygon
    fromToken: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
    toToken: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
    fromAmount: "100000000000000000", // 0.1 AVAX
    fromAddress: '0x1EAbF384277c5647f2cdB00b586317510c737f81',
    toAddress: '0x1EAbF384277c5647f2cdB00b586317510c737f81',
    slippageConfig: {
      autoMode: 1
    }
  }
  */
  async getRoute ( params) {

    /* try {
      const result = await context.$axios.post(
        "https://v2.api.squidrouter.com/v2/route",
        params,
        {
          headers: {
            "x-integrator-id": process.env.squidAxelarApi,
            "Content-Type": "application/json",
          },
        }
      );
      const requestId = result.headers["x-request-id"];
      return { data: result.data, requestId };
    } catch (error) {
      // Log the error response if it's available.
      if (error.response) {
        console.error("API error:", error.response.data);
      }
      console.error("Error with parameters:", params);
      throw error;
    } */
    const { route, requestId } = await squid.getRoute(params);
    return { route, requestId }
  },

  async executeRoute(signer, route) {

  const tx = (await squid.executeRoute({
    signer,
    route,
  }));
  const txReceipt = await tx.wait();

    return await txReceipt;
  },


}
Vue.prototype.$squidAxelar = squidAxelar

