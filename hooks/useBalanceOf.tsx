import { useAccount, useContractRead } from "wagmi";
import { NFTAddress } from "../constants";
import NFTAbi from "../abis/NFTAbi.json";
import { BigNumber } from "ethers";

const useBalanceOf = () => {
  const { address, isConnected } = useAccount();

  const { data, status, refetch } = useContractRead({
    address: NFTAddress,
    abi: NFTAbi,
    functionName: "balanceOf",
    args: [address, 0],
  });

  return {
    balanceOf: data as BigNumber,
    balanceOfStatus: status,
    refetchBalanceOf: refetch,
    isConnected,
  };
};

export default useBalanceOf;
