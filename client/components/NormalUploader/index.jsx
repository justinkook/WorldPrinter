import React, { useState } from "react";
import { useProvider, useSigner } from "wagmi";
import { WebBundlr } from "@bundlr-network/client";
import fileReaderStream from "filereader-stream";
import { useContractRead, useSendTransaction, usePrepareSendTransaction } from 'wagmi';
import functionConsumerAbi from '../../contracts/abi/FunctionsConsumerAbi.json';
import {StlViewer} from "react-stl-viewer";
import { BigNumber } from 'ethers'

import "./NormalUploader.css";
import SuccessScreen from "../SuccessScreen";

const NormalUploader = ({onRequestClose}) => {
	const [message, setMessage] = useState("");
	const [uploadedURL, setUploadedURL] = useState("");
	const [fileToUpload, setFileToUpload] = useState();
	const [fileType, setFileType] = useState();

	const rainbowKitProvider = useProvider();
	const { data: rainbowKitSigner } = useSigner();
	const { data: jobDetails  } = useContractRead({
		addressOrName: '0xceBD2e7b189ea320fB5d1bd79B308232D762dF94',
		contractInterface: functionConsumerAbi,
		functionName: 'latestResponse'
	  })

	const { config } = usePrepareSendTransaction({
	request: { to: '0x41e342Ed835f02176B3b162b9903eC530DEDF60e', value: BigNumber.from('21838596958078430') },
	})
	const { data, isLoading, isSuccess, sendTransaction } =
	useSendTransaction(config)

	const handleFile = async (e) => {
		setMessage("");
		const newFiles = e.target.files;
		if (newFiles.length === 0) return;

		setFileToUpload(newFiles[0]);
		setFileType(newFiles[0]["type"]);
	};

	const upload = async () => {
		if (!rainbowKitSigner) {
			setMessage("Please connect your wallet first.");
			return;
		}
		if (!fileToUpload) {
			setMessage("Please select a file first.");
			return;
		}
		// use method injection to add the missing function
		rainbowKitProvider.getSigner = () => rainbowKitSigner;
		// create a WebBundlr object
		const bundlr = new WebBundlr("https://devnet.bundlr.network", "matic", rainbowKitProvider, {
			providerUrl: "https://matic-mumbai.chainstacklabs.com",
		});

		await bundlr.ready();

		try {
			const dataStream = fileReaderStream(fileToUpload);
			const tx = await bundlr.upload(dataStream, {
				tags: [{ name: "Content-Type", value: fileType }],
			});

			console.log(`File uploaded ==> https://arweave.net/${tx.id}`);
			setMessage(`Upload Success:`);
			setUploadedURL("https://arweave.net/" + "P5mbHCBuYhso-vt8hC-z0ur5LYkwqBPwTw3yYC_M3pE");
		} catch (e) {
			setMessage("Upload error " + e.message);
			console.log("error on upload, ", e);
		}
	};

	return (
		<>
			{!isSuccess && (<div className="frame-12">
				<div className="overlap-group2-1 override-box-shadow">
					<h1 className="request-a-new-3-d-print">Request a New 3D Print</h1>
					<div className="preview archivo-bold-tundora-31px">Preview</div>
					<div className="new-print-card">
					{fileToUpload && (<StlViewer
						style={{width: '100%', height: '100%'}}
						orbitControls
						shadows
						url={URL.createObjectURL(fileToUpload)}
					/>)}
					</div>
					<div className="order"></div>

<div className="upload-container">
					<div className="flex upload-container">
						<input
							type="file"
							onChange={handleFile}
							className="w-1/3 px-1 py-1 block text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
							multiple="single"
							name="files[]"
						/>
						{!uploadedURL && (<button
							className="ml-5 bg-primary hover:bg-blue-700 text-background font-bold py-1 px-3 rounded-lg"
							onClick={upload}
						>
							Upload
						</button>)}
						{uploadedURL && (<button
							className="ml-5 bg-primary hover:bg-blue-700 text-background font-bold py-1 px-3 rounded-lg"
							onClick={sendTransaction}
						>
							Order
						</button>)}
					</div>
					</div>
			<code className="text-container">
					<p className="text-messageText text-sm">{message}</p>
			<p className="text-text text-sm">
				{uploadedURL && (
					<a className="underline" href={uploadedURL} target="_blank">
						{uploadedURL}
					</a>
				)}
				{jobDetails && uploadedURL && (
					<p>
						{JSON.stringify(Buffer.from(jobDetails.slice(2), "hex").toString(), null, 2)}
					</p>
				)}
			</p>
			</code>
					<img className="vector" src="/img/back.svg" alt="Vector" onClick={onRequestClose} />
				</div>
			</div>)}

		{isSuccess && (<div className="new-print-card success-card override-box-shadow" onClick={onRequestClose}>
<SuccessScreen /></div>)}
		</>
	);
};

export default NormalUploader;
