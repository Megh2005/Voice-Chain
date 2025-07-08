/* eslint-disable @typescript-eslint/no-explicit-any */
import { BrowserProvider } from "ethers";
import { toast } from "sonner";

declare global {
  interface Window {
    ethereum?: any;
  }
}

const CORE_TESTNET_2_PARAMS = {
  chainId: "0x45a",
  chainName: "Core Blockchain Testnet2",
  nativeCurrency: {
    name: "Test Core 2",
    symbol: "tCORE2",
    decimals: 18,
  },
  rpcUrls: ["https://rpc.test2.btcs.network"],
  blockExplorerUrls: ["https://scan.test.btcs.network/"],
};

export const connectWallet = async (
  setIsConnected: any,
  setUserAddress: any,
  setSigner: any
) => {
  if (!window.ethereum) {
    toast.error(
      "🦊 No crypto wallet detected! Please install MetaMask or another Web3 wallet."
    );
    return;
  }

  try {
    const provider = new BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    setSigner(signer);

    const accounts = await provider.send("eth_requestAccounts", []);
    setUserAddress(accounts[0]);
    setIsConnected(true);

    const { chainId } = await provider.getNetwork();
    const coreTestnet2Id = 1114;

    if (parseInt(chainId.toString(), 10) !== coreTestnet2Id) {
      try {
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: CORE_TESTNET_2_PARAMS.chainId }],
        });
        toast.success("🔗 Successfully switched to Core Blockchain Testnet2!");
      } catch (switchError: any) {
        if (switchError.code === 4902) {
          try {
            await window.ethereum.request({
              method: "wallet_addEthereumChain",
              params: [CORE_TESTNET_2_PARAMS],
            });
            toast.success(
              "✅ Core Testnet2 network added and connected successfully!"
            );
          } catch (addError) {
            toast.error(
              "❌ Failed to add Core Testnet2 network. Please try again."
            );
            console.error("Error adding network:", addError);
          }
        } else {
          toast.error(
            "🔄 Unable to switch networks. Please change manually in your wallet."
          );
          console.error("Network switch error:", switchError);
        }
      }
    } else {
      toast.success("🎉 Wallet connected! Welcome to Voice Chain!");
    }
  } catch (error) {
    toast.error(
      "⚠️ Connection failed. Please check your wallet and try again."
    );
    console.error("Connection error:", error);
  }
};
