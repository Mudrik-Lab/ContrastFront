import React from "react";
import classNames from "classnames";
import { ReactComponent as Arrow } from "../assets/drop-arrow.svg";
import { ReactComponent as Profile } from "../assets/profile-circle.svg";
import { ReactComponent as ProfileIcon } from "../assets/icons/profile-negative-icon.svg";
import Logo from "../assets/logoes/logo.png";

import { Button, Text } from "./Reusble";
import { useNavigate } from "react-router-dom";
import { graphsHeaders } from "../Utils/GraphsDetails";

export default function Navbar() {
  const [graphMenue, setGraphMenue] = React.useState(false);
  const navigate = useNavigate();

  const page = window.location.pathname;

  return (
    <div>
      <nav className="bg-white px-16 py-2.5 flex items-center fixed w-full z-20 top-0 left-0 shadow-lg ">
        {/* <div className="bg-orange bg-pink bg-navyBlue bg-lightTeal bg-lightGreen bg-teal bg-darkTeal bg-yellow bg-purple bg-lilac"></div> */}
        <div className=" flex flex-wrap items-center justify-between w-full ">
          <div className="flex items-center justify-between">
            <div
              className="logo-right flex gap-3 items-center cursor-pointer"
              onClick={() => navigate("/")}>
              <img src={Logo} alt="" />
              <div className=" border-r border-black h-10 "></div>
              <Text sm color="grayHeavy">
                {" "}
                High Level <br /> Cognition Lab{" "}
              </Text>
            </div>
          </div>
          <div className="navigate-buttons items-center justify-between flex ">
            <ul className="flex flex-row text-black space-x-12">
              <li className="flex items-center relative">
                <button
                  className="flex items-center text-black border-0 gap-1 "
                  onClick={() => setGraphMenue(!graphMenue)}>
                  Explore
                  <Arrow />
                </button>
                {graphMenue && (
                  <div
                    className="fixed z-10 inset-0 flex  justify-center modal overflow-y-auto"
                    onClick={() => setGraphMenue(false)}>
                    <div
                      id="dropdown-navbar"
                      className="z-30 bg-white rounded-md shadow-lg w-80 absolute top-10">
                      <ul
                        className="py-2 text-lg text-gray-700 dark:text-gray-400"
                        aria-labelledby="dropdownLargeButton">
                        {graphsHeaders.map((row) => (
                          <li id={row.color} key={row.text}>
                            <a
                              href={row.route}
                              className="px-4 py-2 hover:bg-gray-100 flex justify-start items-center gap-2.5 hover:font-bold">
                              <div
                                className={classNames(
                                  `${
                                    "bg-" + row.color
                                  }  green rounded-full w-3 h-3`
                                )}></div>
                              {row.text}
                            </a>

                            <hr className="mx-3" />
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </li>
              <li>
                <a
                  className={page === "/about" ? "text-blue font-bold" : ""}
                  href="about">
                  About
                </a>
              </li>

              <li>
                <a
                  className={page === "/contact" ? "text-blue font-bold" : ""}
                  href="contact"
                  aria-current="page">
                  Contact
                </a>
              </li>
              <li>
                <a href="/upload-new-paper" aria-current="page">
                  Upload New Paper
                </a>
              </li>
            </ul>
          </div>
          <div className="login-register flex flex-row items-center justify-between space-x-4 text-black">
            {/* <div className=" w-6 h-6 bg-slate-400 rounded-full"></div> */}
            <Profile />
            <span>Login</span>
            <Button type="button">
              {" "}
              <ProfileIcon /> Register
            </Button>
          </div>
        </div>
      </nav>
    </div>
  );
}
