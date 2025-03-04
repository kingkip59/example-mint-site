import React from "react";
import { ethers } from "ethers";

import abi from '../contract/abi.json';

export default function Login(props) {

	const contractAddress = "0x56C72fADe149b6B180283936207B2E7dc851836a";

	const DoConnect = async () => {

		console.log('Connecting....');
		try {
			const provider = new ethers.providers.Web3Provider(window.ethereum)
			await provider.send("eth_requestAccounts", []);
			const signer = provider.getSigner();
			const instance = new ethers.Contract(contractAddress, abi, provider);
			const account = await signer.getAddress();
			props.callback({ ethers, signer, account, contract: instance });

		} catch (error) {
			console.error("Could not connect to wallet.", error);
		}
	};

	if (!props.connected) return <button className="login" onClick={DoConnect}>Connect Wallet</button>;

	return <>[{props.address.slice(0, 6)}]</>;
}