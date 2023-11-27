import { useAccount, useContractWrite } from "wagmi";
import { NFTAddress } from "../constants";
import NFTAbi from "../abis/NFTAbi.json";

const useNFTTransfer = () => {
  const { address, isConnected } = useAccount();

  const { writeAsync, status } = useContractWrite({
    mode: "recklesslyUnprepared",
    address: NFTAddress,
    abi: NFTAbi,
    functionName: "safeTransferFrom",
  });

  return {
    transferAsync: writeAsync,
    transferStatus: status,
    transferFrom: address,
    isConnected,
  };
};

export default useNFTTransfer;
