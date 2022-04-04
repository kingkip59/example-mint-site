import { ethers } from "ethers";
import abi from "../contract/abi.json";

const CONTRACT = "0xC9044bEB7Af735cDDCd070a541727886baaA5a06";

export async function publicMint({ amount, signer }) {
    const contract = new ethers.Contract(CONTRACT, abi, signer);

    const receipt = await contract.publicMint({
        value: ethers.utils.parseEther(amount.toString()),
    });
    return receipt;
}

export const getMintInfo = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(CONTRACT, abi, provider);

    const totalSupply = await contract.totalSupply();    

    return {
        totalSupply: totalSupply.toNumber(),
    }
}
