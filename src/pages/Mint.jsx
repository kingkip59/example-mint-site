import { useState } from "react";
import { Address } from "../components/Address";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { connect } from "../utilities/connect";
import { publicMint, getMintInfo } from "../utilities/mint";

const STATUS = {
	ERROR: 'error',
	SUCCESS: 'success',
};

export default function Mint() {
	const [status, setStatus] = useState();
	const [loading, setLoading] = useState();
	const [mintInfo, setMintInfo] = useState({});
	const [quantity, setQuantity] = useState(1);
	const {
		address,
		signer,
		totalSupply,
	} = mintInfo;

	async function handleConnect() {
		try {
			setLoading(true)
			const { address, provider, signer } = await connect();
			const { chainId } = await provider.getNetwork();
			if (chainId !== 1 && chainId !== 4) {
				throw Error("Wrong network, please change to the correct network and try again.")
			}
			const {
				totalSupply,
			} = await getMintInfo();
			setMintInfo({
				address,
				provider,
				signer,
				totalSupply,
				chainId
			})
			setLoading(false)
		} catch (error) {
			console.log('connect', error)
			setStatus({
				type: STATUS.ERROR,
				message: error?.error?.message || error?.reason || error?.message
			});
			setLoading(false);
		}
	}


	async function handleMint() {
		try {
			const receipt = await publicMint({
				amount: quantity * 0.0418,
				signer,
			})
			setStatus({
				type: STATUS.SUCCESS,
				message: `<a href="https://etherscan.io/tx/${receipt?.hash}" target="_blank" rel="noreferrer">Check out your transaction on Etherscan</a>.`,
			});
		} catch (error) {
			setStatus({
				type: STATUS.ERROR,
				message: error?.error?.message || error?.reason || error?.message
			});
		}
	}

	return (
		<>
			<Address address={address} />
			<a>
				<p></p>
			</a>
			<h2>Welcome to Lucy's Colorful Friends NFT</h2>
			<a> <img src="hearts.png" alt="Acceptance" width="600" height="343" />
			<p></p>
			</a>
			<a href="https://medium.com/@kipinvestment1/lucys-colorful-friends-f5c655af98a5" target="_blank">
				<button> View Medium </button>
				
				<p></p>
			</a>
			
			{
				status?.type && (
					<div className="content">
						<p className={status?.type} dangerouslySetInnerHTML={{ __html: status?.message }} />
					
					</div>
				)
			}
			{
				!address && !loading ? (
					<button onClick={handleConnect}>Connect Wallet</button>
				) : (<></>)
				
			}
			<div><p></p><a> <img src="dogs.png" alt="Acceptance" width="600" height="480" />
				<p></p>
			</a></div>
			{
				loading && (
					<LoadingSpinner />
				)
			}
			{
				address && (
					<h1>{totalSupply} / 300</h1>
				)
			}
			{
				address && (
					<>
						<div className="amount">
							<label htmlFor="One">Number of Friends</label>
							<br />
							<input type="number" id="One" name="mint_amount" defaultValue={1} onChange={(e) => setQuantity(e.target.value)} />
						</div>
						<br />
						<button onClick={() => handleMint()}>Mint</button>
					</>
				)
			}
		</>
	)
}