import React, { useState } from "react";
import MaskGroup from "../MaskGroup";
import APersonbust from "../APersonbust";
import APersonbust2 from "../APersonbust2";
import APersonbust3 from "../APersonbust3";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Modal from "../Modal";

import "./LandingPage.css";

function LandingPage(props) {
  const {
    x3D_Printer_Logo__3_Removebg1,
    place,
    orderPrint,
    connectWallet,
    x0Xpat,
    laptopStand1,
    printed1,
    address1,
    x00032Eth1,
    thisPrintTurnedO,
    maskGroup1,
    laptopStand3DPrint11,
    x0Xmatt,
    x3DHubFren,
    printed2,
    address2,
    x00042Eth,
    iWillAlwaysLove,
    x0Xandrew,
    lilBoat,
    printed3,
    address3,
    x00012Eth,
    iWasSurprisedWhe,
    maskGroup2,
    laptopStand3DPrint12,
    x0Xjustin,
    laptopStand2,
    printed4,
    address4,
    x00032Eth2,
    imATeacherMyC,
    title,
    butIMustExplainT1,
    dontBreakTheBank,
    butIMustExplainT2,
    highestQualityOnly,
    butIMustExplainT3,
    makeIdeasReality,
    butIMustExplainT4,
    group,
    printAnythingAnywhere,
    butIMustExplainT5,
    getStarted1,
    readyToStartPrintingYourIdeas,
    butIMustExplainT6,
    getStarted2,
    wifeMad3DPrintSomeMoney,
    butIMustExplainT7,
    listAPrinter,
    maskGroup1Props,
    maskGroup2Props,
    aPersonbust3Props,
  } = props;

  const [isModalOpen, setModalIsOpen] = useState(false);

  const toggleModal = () => {
		setModalIsOpen(!isModalOpen);
	};

  return (
    <div className="landing-page screen">
      <div className="nav">
        <div className="flex-row">
          <img
            className="x3-d_printer_logo__3_-removebg-1"
            src={x3D_Printer_Logo__3_Removebg1}
            alt="3D_printer_logo__3_-removebg 1"
          />
          <div className="overlap-group-2">
            <div className="place archivo-bold-tundora-31px">{place}</div>
          </div>
          <div className="overlap-group1">
            <div className="order-print archivo-bold-tundora-31px" onClick={toggleModal}>{orderPrint}</div>
            {isModalOpen && <Modal onRequestClose={toggleModal} />}
          </div>
          <div className="overlap-group2">
            <div className="connect-wallet archivo-bold-tundora-31px"><ConnectButton showBalance={false}/></div>
          </div>
        </div>
      </div>
      <div className="hero-div">
        <div className="overlap-group5">
          <div className="frame-4">
            <div className="card-1">
              <MaskGroup laptopStand3DPrint1={maskGroup1Props.laptopStand3DPrint1} />
              <div className="overlap-group">
                <div className="flex-row-1">
                  <div className="flex-col-1">
                    <div className="x0x-pat archivo-medium-tundora-31px">{x0Xpat}</div>
                    <div className="laptop-stand archivo-normal-regal-blue-20px">{laptopStand1}</div>
                  </div>
                  <div className="flex-col">
                    <div className="overlap-group-1">
                      <div className="printed archivo-normal-tundora-20px">{printed1}</div>
                      <div className="address archivo-thin-tundora-20px">{address1}</div>
                    </div>
                    <div className="x00032-eth archivo-thin-regal-blue-20px">{x00032Eth1}</div>
                  </div>
                </div>
                <p className="this-print-turned-o archivo-extra-light-tundora-20px">{thisPrintTurnedO}</p>
              </div>
            </div>
            <div className="card">
              <div className="mask-group" style={{ backgroundImage: `url(${maskGroup1})` }}>
                <img className="laptop-stand-3-d-print-1" src={laptopStand3DPrint11} alt="laptop stand 3D print 1" />
              </div>
              <div className="overlap-group">
                <div className="flex-row-2">
                  <div className="flex-col-2">
                    <div className="x0x-matt archivo-medium-tundora-31px">{x0Xmatt}</div>
                    <div className="x3-d-hub-fren archivo-normal-regal-blue-20px">{x3DHubFren}</div>
                  </div>
                  <div className="flex-col-3">
                    <div className="overlap-group-1">
                      <div className="printed archivo-normal-tundora-20px">{printed2}</div>
                      <div className="address archivo-thin-tundora-20px">{address2}</div>
                    </div>
                    <div className="x00042-eth archivo-thin-regal-blue-20px">{x00042Eth}</div>
                  </div>
                </div>
                <p className="i-will-always-love archivo-extra-light-tundora-20px">{iWillAlwaysLove}</p>
              </div>
            </div>
            <div className="card-3">
              <MaskGroup laptopStand3DPrint1={maskGroup2Props.laptopStand3DPrint1} />
              <div className="overlap-group">
                <div className="flex-row-3">
                  <div className="flex-col-4">
                    <div className="x0x-andrew archivo-medium-tundora-31px">{x0Xandrew}</div>
                    <div className="lil-boat archivo-normal-regal-blue-20px">{lilBoat}</div>
                  </div>
                  <div className="flex-col-5">
                    <div className="overlap-group-3">
                      <div className="printed-1 archivo-normal-tundora-20px">{printed3}</div>
                      <div className="address-1 archivo-thin-tundora-20px">{address3}</div>
                    </div>
                    <div className="x00012-eth archivo-thin-regal-blue-20px">{x00012Eth}</div>
                  </div>
                </div>
                <p className="i-was-surprised-whe archivo-extra-light-tundora-20px">{iWasSurprisedWhe}</p>
              </div>
            </div>
            <div className="card">
              <div className="mask-group" style={{ backgroundImage: `url(${maskGroup2})` }}>
                <img className="laptop-stand-3-d-print-1-1" src={laptopStand3DPrint12} alt="laptop stand 3D print 1" />
              </div>
              <div className="overlap-group">
                <div className="flex-row-4">
                  <div className="flex-col-6">
                    <div className="x0x-justin archivo-medium-tundora-31px">{x0Xjustin}</div>
                    <div className="laptop-stand archivo-normal-regal-blue-20px">{laptopStand2}</div>
                  </div>
                  <div className="flex-col">
                    <div className="overlap-group-1">
                      <div className="printed archivo-normal-tundora-20px">{printed4}</div>
                      <div className="address archivo-thin-tundora-20px">{address4}</div>
                    </div>
                    <div className="x00032-eth archivo-thin-regal-blue-20px">{x00032Eth2}</div>
                  </div>
                </div>
                <p className="im-a-teacher-my-c archivo-extra-light-tundora-20px">{imATeacherMyC}</p>
              </div>
            </div>
          </div>
          <div className="inner-shadow"></div>
          <h1 className="title aleo-bold-tundora-60px">{title}</h1>
          <p className="but-i-must-explain-t archivo-light-regal-blue-24px">{butIMustExplainT1}</p>
        </div>
      </div>
      <div className="pain-points">
        <div className="overlap-group-container">
          <div className="overlap-group-4">
            <div className="dont-break-the-bank aleo-bold-tundora-60px">{dontBreakTheBank}</div>
            <p className="but-i-must-explain-t-1 archivo-light-regal-blue-24px">{butIMustExplainT2}</p>
          </div>
          <div className="overlap-group1-1">
            <div className="highest-quality-only aleo-bold-tundora-60px">{highestQualityOnly}</div>
            <p className="but-i-must-explain-t-2 archivo-light-regal-blue-24px">{butIMustExplainT3}</p>
          </div>
          <div className="overlap-group2-1">
            <div className="make-ideas-reality aleo-bold-tundora-60px">{makeIdeasReality}</div>
            <p className="but-i-must-explain-t-3 archivo-light-regal-blue-24px">{butIMustExplainT4}</p>
          </div>
        </div>
      </div>
      <div className="map">
        <div className="group-1">
          <div className="frame-5">
            <div className="overlap-group-container-1">
              <div className="overlap-group1-2">
                <img className="group" src={group} alt="Group" />
                <div className="print-anything-anywhere aleo-bold-tundora-60px">{printAnythingAnywhere}</div>
                <p className="but-i-must-explain-t-4 archivo-light-regal-blue-24px">{butIMustExplainT5}</p>
              </div>
              <div className="overlap-group-5">
                <div className="get-started archivo-bold-tundora-31px">{getStarted1}</div>
              </div>
            </div>
          </div>

        </div>
      </div>
      <div className="buyer-cta">
        <div className="overlap-group6">
          <div className="rectangle-32"></div>
          <p className="ready-to-start-printing-your-ideas aleo-bold-tundora-60px">{readyToStartPrintingYourIdeas}</p>
          <p className="but-i-must-explain-t-5 archivo-light-regal-blue-24px">{butIMustExplainT6}</p>
          <APersonbust />
          <div className="overlap-group3">
            <div className="get-started archivo-bold-tundora-31px">{getStarted2}</div>
          </div>
        </div>
      </div>
      <div className="seller-cta">
        <div className="overlap-group-container-2">
          <div className="overlap-group8">
            <p className="wife-mad-3-d-print-some-money aleo-bold-tundora-60px">{wifeMad3DPrintSomeMoney}</p>
            <APersonbust2 />
            <APersonbust3 faceSmileProps={aPersonbust3Props.faceSmileProps} />
          </div>
          <div className="overlap-group7">
            <p className="but-i-must-explain-t-6 archivo-light-regal-blue-24px">{butIMustExplainT7}</p>
            <div className="overlap-group4">
              <div className="list-a-printer archivo-bold-tundora-31px">{listAPrinter}</div>
            </div>
          </div>
        </div>
      </div>
      <footer className="footer">
        <img className="group-3-_1_-2" src="/img/group-3--1--2.svg" alt="Group-3-_1_ 2" />
      </footer>
    </div>
  );
}

export default LandingPage;
