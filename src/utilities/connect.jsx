import { ethers } from "ethers";

export async function connect() {
    if (!window.ethereum) {
        throw new Error("No crypto wallet found. Please install it.");
    }

    const provider = new ethers.providers.Web3Provider(window.ethereum);

    await provider.send("eth_requestAccounts", []);

    const signer = provider.getSigner();
    const address = await signer.getAddress();

    return {
        address,
        provider,
        signer,
    }
}