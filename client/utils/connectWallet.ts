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
  setIsConnected: (val: boolean) => void,
  setUserAddress: (val: string) => void,
  setSigner: (val: any) => void,
  setSignature?: (val: string) => void // optional
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
    const address = accounts[0];
    setUserAddress(address);
    setIsConnected(true);

    const { chainId } = await provider.getNetwork();
    const coreTestnet2Id = 1114;

    if (parseInt(chainId.toString(), 10) !== coreTestnet2Id) {
      try {
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: CORE_TESTNET_2_PARAMS.chainId }],
        });
        toast.success("🔗 Switched to Core Blockchain Testnet2!");
      } catch (switchError: any) {
        if (switchError.code === 4902) {
          try {
            await window.ethereum.request({
              method: "wallet_addEthereumChain",
              params: [CORE_TESTNET_2_PARAMS],
            });
            toast.success("✅ Core Testnet2 added and connected!");
          } catch (addError) {
            toast.error("❌ Failed to add Core Testnet2. Try manually.");
            console.error("Add network error:", addError);
          }
        } else {
          toast.error("🔄 Failed to switch network. Try manually.");
          console.error("Switch error:", switchError);
        }
      }
    } else {
      toast.success("🎉 Wallet connected! Welcome to Voice Chain!");
    }

    // ✍️ Prompt for signature if handler is provided
    if (setSignature) {
      const message = `VoiceChain Authentication\nAddress: ${address}\nTime: ${new Date().toISOString()}`;
      try {
        const signature = await signer.signMessage(message);
        setSignature(signature);
        toast.success("🖊️ Wallet signature complete!");
        console.log("Signature:", signature);
      } catch (signError) {
        toast.error("⚠️ Signature declined.");
        console.error("Signature error:", signError);
      }
    }
  } catch (error) {
    toast.error("⚠️ Wallet connection failed. Try again.");
    console.error("Connection error:", error);
  }
};
