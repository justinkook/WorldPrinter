import "./App.css";
import React from "react";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";

import "@rainbow-me/rainbowkit/dist/index.css";

import { getDefaultWallets, RainbowKitProvider, lightTheme } from "@rainbow-me/rainbowkit";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";

const { chains, provider } = configureChains(
	[chain.polygonMumbai],
	// [chain.polygon],
	[publicProvider()],
);

const { connectors } = getDefaultWallets({
	appName: "Bundlr Tools",
	chains,
});

const wagmiClient = createClient({
	autoConnect: true,
	connectors,
	provider,
});

function App() {
  return (
    <WagmiConfig client={wagmiClient}>
			<RainbowKitProvider
				chains={chains}
				theme={lightTheme({
					accentColor: "var(--primary)",
					accentColorForeground: "var(--background)",
					borderRadius: "small",
					fontStack: "system",
					overlayBlur: "small",
				})}
			>
    <Router>
      <Switch>
        <Route path="/:path(|landing-page)">
          <LandingPage {...landingPageData} />
        </Route>
      </Switch>
    </Router>
    </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default App;
const maskGroup1Data = {
    laptopStand3DPrint1: "/img/laptop-stand-3d-print-1@2x.png",
};

const maskGroup2Data = {
    laptopStand3DPrint1: "/img/laptop-stand-3d-print-1-2@2x.png",
};

const faceSmile2Data = {
    className: "face-1",
};

const aPersonbust3Data = {
    faceSmileProps: faceSmile2Data,
};

const landingPageData = {
    x3D_Printer_Logo__3_Removebg1: "/img/3d-printer-logo--3--removebg-1@2x.png",
    place: "Home",
    orderPrint: "Order Print",
    connectWallet: "Connect Wallet",
    x0Xpat: "0xPat",
    laptopStand1: "Laptop Stand",
    printed1: "Printed",
    address1: "4 days ago",
    x00032Eth1: "0.0032 ETH",
    thisPrintTurnedO: <React.Fragment>“This print turned out amazing!<br />I’ll be using it daily!”</React.Fragment>,
    maskGroup1: "/img/big-box@2x.png",
    laptopStand3DPrint11: "/img/laptop-stand-3d-print-1-1@2x.png",
    x0Xmatt: "0xMatt",
    x3DHubFren: "3D Hub Fren",
    printed2: "Printed",
    address2: "2 days ago",
    x00042Eth: "0.0042 ETH",
    iWillAlwaysLove: "“I will always love and cherish what this fren stood for”",
    x0Xandrew: "0xAndrew",
    lilBoat: "lil Boat",
    printed3: "Printed",
    address3: "9 days ago",
    x00012Eth: "0.0012 ETH",
    iWasSurprisedWhe: "“I was surprised when I saw the price, printing more!”",
    maskGroup2: "/img/big-box@2x.png",
    laptopStand3DPrint12: "/img/laptop-stand-3d-print-1-3@2x.png",
    x0Xjustin: "0xJustin",
    laptopStand2: "Laptop Stand",
    printed4: "Printed",
    address4: "7 days ago",
    x00032Eth2: "0.0032 ETH",
    imATeacherMyC: "“I’m a teacher, my classroom loved this!”",
    title: "Print Anything Anywhere",
    butIMustExplainT1: "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give",
    dontBreakTheBank: "Don’t break the bank",
    butIMustExplainT2: "But I must explain to you how all this mistaken idea of denouncing pleasure and",
    highestQualityOnly: "Highest quality only",
    butIMustExplainT3: "But I must explain to you how all this mistaken idea of denouncing pleasure and",
    makeIdeasReality: "Make ideas reality",
    butIMustExplainT4: "But I must explain to you how all this mistaken idea of denouncing pleasure and",
    group: "/img/group.png",
    printAnythingAnywhere: "Upload to Arweave",
    butIMustExplainT5: "Upload an stl file to arweave using Bundlr. The file will be stored for 60 days on a testnet version",
    getStarted1: "Upload",
    readyToStartPrintingYourIdeas: "Ready to order?",
    butIMustExplainT6: "The volume of the 3D Print will be calculated using Chainlink Functions for the payment contract to read",
    getStarted2: "Order",
    wifeMad3DPrintSomeMoney: <React.Fragment>Wife mad?<br />3D print some money</React.Fragment>,
    butIMustExplainT7: "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give",
    listAPrinter: "List a printer",
    maskGroup1Props: maskGroup1Data,
    maskGroup2Props: maskGroup2Data,
    aPersonbust3Props: aPersonbust3Data,
};

