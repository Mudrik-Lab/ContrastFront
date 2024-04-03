import {useSnapshot} from "valtio";
import {state} from "../../../state.jsx";
import {useNavigate} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import getExtraConfig from "../../../apiHooks/getExtraConfig.jsx";
import copy from "copy-to-clipboard";
import {isMoblile} from "../../../Utils/HardCoded.jsx";
import mobileBrain from "../../../assets/images/mobile-brain.jpeg";
import brain from "../../../assets/images/XwW4T0UQ.jpeg";
import Navbar from "../../../sharedComponents/Navbar.jsx";
import {Button, Text, WhiteButton} from "../../../sharedComponents/Reusble.jsx";
import PapersIconsMenu from "./PapersIconsMenu.jsx";
import CommunityBox from "./CommunityBox.jsx";
import UnconTraStUseCases from "./UnconTraStUseCases.jsx";
import Footer from "../../../sharedComponents/Footer.jsx";
import React from "react";
import {ReactComponent as Graph} from "../../../assets/icons/start-exploring.svg";
import {ReactComponent as Profile} from "../../../assets/icons/profile-negative-icon.svg";
import {ReactComponent as Quote} from "../../../assets/icons/cite-quote.svg";
import {ReactComponent as QouteIcon} from "../../../assets/icons/copy-to-clipboard-icon.svg";

export default function Homepage() {
    const snap = useSnapshot(state);
    const navigate = useNavigate();

    const {data, isSuccess} = useQuery([`more_configurations`], getExtraConfig);
    const cite =
        "Yaron, I., Melloni, L., Pitts, M., & Mudrik, L. (2022). The ConTraSt database for analysing and comparing empirical studies of consciousness theories. Nature Human Behaviour. https://www.nature.com/articles/s41562-021-01284-5";
    const copyToClipboard = () => {
        copy(cite);
    };
    const containerStyle = {
        backgroundImage: `url(${isMoblile ? mobileBrain : brain})`,
    };
    return (
        <div>

            <Navbar/>
            <div
                style={containerStyle}
                className="header h-full sm:h-[512px] py-10 sm:py-20 px-2 sm:px-28 mt-14 bg-no-repeat bg-cover bg-center ">
                <div className="headline w-full text-center sm:text-left">
                    <h1 className="text-white text-5xl font-bold mb-10">
                        UnconTrust Database
                    </h1>
                    <h1 className="text-white text-3xl">Examine trends</h1>
                    <h1 className="text-blue text-3xl">
                        {" "}
                        in {data?.data.approved_experiments_count} experiments
                    </h1>
                    <h1 className="text-white text-3xl">
                        studying unconscious processing
                    </h1>
                </div>
                <div
                    className="header-buttons flex flex-col items-center sm:flex-row sm:justify-start gap-4 mt-60 sm:mt-24">
                    <WhiteButton
                        onClick={() => navigate("/parameter-distribution-free-queries")}>
                        <Graph/> Start Exploring
                    </WhiteButton>
                    <div className="flex items-center gap-2">
                        <Profile/>
                        <a
                            className="underline text-white font-bold"
                            href={snap.auth ? "/upload-new-paper" : "/register"}>
                            Register & Contribute
                        </a>
                    </div>
                </div>
            </div>
            <div className="px-4">
                <div className="citing sm:max-w-[870px] mx-auto mt-10">
                    <div
                        className=" border cite-box bg-grayLight mx-auto sm:flex justify-between items-center gap-2 p-4">
                        <div className="w-16">
                            <Quote/>
                        </div>
                        <Text>
                            Yaron, I., Melloni, L., Pitts, M., & Mudrik, L. (2022). The
                            ConTraSt database for analysing and comparing empirical studies of{" "}
                            consciousness theories. Nature Human Behaviour.{" "}
                            <a
                                className="text-darkBlue underline break-all"
                                href="https://www.nature.com/articles/s41562-021-01284-5"
                                target="_blank">
                                https://www.nature.com/articles/s41562-021-01284-5
                            </a>
                        </Text>
                        <div className=" border-b my-4 sm:my-0 sm:border-r border-black sm:h-16 "></div>
                        <div className=" flex flex-row justify-center sm:justify-start">
                            <Button
                                extraClass="text-lg sm:text-sm "
                                black
                                onClick={copyToClipboard}>
                                <QouteIcon/> Copy Citation to Clipboard
                            </Button>
                        </div>
                    </div>
                </div>
                <PapersIconsMenu/>
                <CommunityBox/>
                <UnconTraStUseCases/>
            </div>
            <Footer/>

        </div>
    )
}