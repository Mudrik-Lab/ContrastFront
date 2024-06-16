import React, { useEffect } from "react";
import classNames from "classnames";
import { ReactComponent as Arrow } from "../assets/icons/drop-arrow.svg";
import { ReactComponent as ProfileIcon } from "../assets/icons/profile-negative-icon.svg";
import { ReactComponent as Burger } from "../assets/icons/hamburger.svg";
import { ReactComponent as X } from "../assets/icons/x-icon.svg";
import Logo from "../assets/logoes/logo.png";
import UnconLogo from "../assets/logoes/uncon-logo.png";
import CifarLogo from "../assets/logoes/cifar.png";
import { useQuery } from "@tanstack/react-query";
import { Button, Text } from "./Reusble";
import { NavLink, useNavigate } from "react-router-dom";
import { graphsHeaders } from "../Utils/GraphsDetails";
import { isMoblile } from "../Utils/HardCoded";
import { useSnapshot } from "valtio";
import { state } from "../state";
import { removeToken } from "../Utils/tokenHandler";
import getUser from "../apiHooks/getUser";
import { Tooltip } from "flowbite-react";
import { Site } from "../config/siteType";

export default function Navbar() {
  const [graphMenue, setGraphMenue] = React.useState(false);
  const [isMobileOpen, setIsMobileOpen] = React.useState(false);
  const navigate = useNavigate();

  const isUncontrast = Site.type === "uncontrast";
  const graphs = isUncontrast
    ? Object.values(graphsHeaders).filter(
        (x) => x.siteToDisplay === "uncontrast" || x.siteToDisplay === "both"
      )
    : Object.values(graphsHeaders).filter(
        (x) => x.siteToDisplay === "contrast" || x.siteToDisplay === "both"
      );

  const page = window.location.pathname;

  const snap = useSnapshot(state);
  const { data: userData, isSuccess: userSuccess } = useQuery([`user`], () => {
    if (snap.auth) {
      return getUser();
    } else {
      return null;
    }
  });

  useEffect(() => {
    if (userData?.data) {
      state.user = userData?.data;
    }
  }, [userSuccess]);

  const handleLogout = async () => {
    await removeToken();
    state.auth = null;
    state.user = {};
  };
  return (
    <div>
      {isMoblile ? (
        <nav className="bg-white px-6 py-2.5 fixed w-full z-20 top-0 left-0 shadow-lg ">
          <div className="flex items-center justify-between w-full ">
            <div
              className="logo-right flex gap-3 items-center cursor-pointer"
              onClick={() => navigate("/")}>
              <img src={isUncontrast ? UnconLogo : Logo} alt="logo-right" />
              <div className=" border-r border-black h-10 "></div>
              <Text xs color="grayHeavy">
                {" "}
                High Level <br /> Cognition Lab
              </Text>
            </div>

            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              aria-label="hamburger-menu">
              {!isMobileOpen ? <Burger /> : <X />}
            </button>
          </div>
          <div className="">
            {isMobileOpen && (
              <div>
                <ul className="flex flex-col items-center justify-center gap-6 text-black ">
                  <li className="flex items-center relative">
                    <button
                      className="flex items-center text-black border-0 gap-1 "
                      onClick={() => setGraphMenue(!graphMenue)}>
                      Explore
                      <Arrow />
                    </button>
                    {graphMenue && (
                      <div
                        className="fixed z-10 inset-0 flex justify-center modal overflow-y-auto"
                        onClick={() => setGraphMenue(false)}>
                        <div
                          id="dropdown-navbar"
                          className="z-30 bg-white rounded-md shadow-lg w-80 absolute top-10">
                          <ul
                            className="py-2 text-lg text-gray-700 dark:text-gray-400"
                            aria-labelledby="dropdownLargeButton">
                            {graphs.map((row) => (
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
                      className={
                        page === "/contact" ? "text-blue font-bold" : ""
                      }
                      href="contact"
                      aria-current="page">
                      Contact
                    </a>
                  </li>
                  <li>
                    <a
                      href="/upload-new-paper"
                      aria-current="page"
                      className={classNames(
                        `${!snap.auth && " pointer-events-none opacity-50"}`
                      )}>
                      Upload New Paper
                    </a>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </nav>
      ) : (
        <nav className="bg-white px-16 py-2.5 flex items-center fixed w-full z-30 top-0 left-0 shadow-lg ">
          <div className=" flex flex-wrap items-center justify-between w-full ">
            <div className="flex items-center gap-2 w-1/3">
              <div
                className="logo-right flex gap-1 items-center cursor-pointer"
                onClick={() => navigate("/")}>
                <img
                  src={isUncontrast ? UnconLogo : Logo}
                  width={85}
                  alt="logo-right"
                />
                <div className=" border-r border-black h-10 "></div>
                <Text xs color="grayHeavy">
                  {" "}
                  High Level <br /> Cognition Lab{" "}
                </Text>
              </div>
              <div className="logo-cifar flex gap-1 items-center ">
                <img src={CifarLogo} alt="CifarLogo" width={"60px"} />
                <div className=" border-r border-black h-10 "></div>
                <Text xs color="grayHeavy">
                  {" "}
                  Brain, Mind and <br /> Consciousness program
                </Text>
              </div>
            </div>
            <div className="navigate-buttons w-1/3 items-center justify-center flex ">
              <ul className="flex flex-row text-black space-x-12">
                <li className="flex items-center relative">
                  <button
                    className="flex items-center text-black border-0 gap-1 text-base "
                    onClick={() => setGraphMenue(!graphMenue)}>
                    Explore
                    <Arrow />
                  </button>
                  {graphMenue && (
                    <div
                      className="fixed z-10 inset-0 flex justify-center modal overflow-y-auto"
                      onClick={() => setGraphMenue(false)}>
                      <div
                        id="dropdown-navbar"
                        className="z-30 bg-white rounded-md shadow-lg w-[340px] absolute top-10">
                        <ul
                          className="py-2 text-lg text-gray-700 dark:text-gray-400"
                          aria-labelledby="dropdownLargeButton">
                          {graphs.map((row) => (
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
                  <NavLink
                    className={
                      page === "/about"
                        ? "text-blue font-bold text-base"
                        : "text-base"
                    }
                    to="/about">
                    About
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    className={
                      page === "/contact"
                        ? "text-blue font-bold text-base"
                        : "text-base"
                    }
                    to="/contact"
                    aria-current="page">
                    Contact
                  </NavLink>
                </li>
                <li>
                  <Tooltip
                    placement="right"
                    content={
                      !snap.auth
                        ? "Registration is needed before uploading study"
                        : "Add your paper to site's data"
                    }>
                    <NavLink
                      to="/upload-new-paper"
                      className={classNames(
                        `${
                          page === "/upload-new-paper"
                            ? "text-blue font-bold text-base"
                            : "text-base"
                        } ${`${
                          !snap.auth && " pointer-events-none opacity-50"
                        }`}`
                      )}
                      aria-current="page">
                      Upload New Paper
                    </NavLink>
                  </Tooltip>
                </li>
              </ul>
            </div>
            <div className="login-register w-1/3 flex flex-row items-center justify-end space-x-4 text-black">
              {snap.auth ? (
                <>
                  <Button type="button" onClick={() => navigate("/profile")}>
                    {" "}
                    <ProfileIcon /> {snap.user?.username || snap.tempUsername}
                  </Button>
                  <a href="/" className="text-base" onClick={handleLogout}>
                    Logout
                  </a>
                </>
              ) : (
                <>
                  <Button type="button" onClick={() => navigate("/register")}>
                    {" "}
                    <ProfileIcon /> Register now
                  </Button>
                  <NavLink
                    className={page === "/login" ? "text-blue font-bold" : ""}
                    to="/login">
                    Login
                  </NavLink>
                </>
              )}
            </div>
          </div>
        </nav>
      )}
    </div>
  );
}
