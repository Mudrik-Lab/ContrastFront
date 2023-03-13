import React from "react";
import { ReactComponent as Arrow } from "../assets/drop-arrow.svg";
import { ReactComponent as Profile } from "../assets/profile-circle.svg";

import { BlueButton } from "./Reusble";

export default function Navbar() {
  const [graphMenue, setGraphMenue] = React.useState(false);
  return (
    <div>
      <nav className="bg-white px-4 py-2.5 fixed w-full z-20 top-0 left-0 shadow-lg ">
        <div className=" flex flex-wrap items-center justify-between w-full ">
          <div className="flex items-center justify-between w-2/4">
            <div>
              <span className="text-black">LOGO</span>
            </div>
            <div
              className="items-center justify-between flex"
              id="navbar-sticky">
              <ul className="flex flex-row text-black space-x-12">
                <li className="flex items-center relative">
                  <button
                    class="flex items-center text-white border-0 "
                    onClick={() => setGraphMenue(!graphMenue)}>
                    Graphs
                    <Arrow />
                  </button>

                  {graphMenue && (
                    <div
                      id="dropdownNavbar"
                      class="z-10  bg-white rounded-md shadow w-44 absolute top-10">
                      <ul
                        class="py-2 text-sm text-gray-700 dark:text-gray-400"
                        aria-labelledby="dropdownLargeButton">
                        <li>
                          <a href="#" class="block px-4 py-2 hover:bg-gray-100">
                            Free Queries
                          </a>
                          <hr className="mx-3" />
                        </li>
                        <li>
                          <a href="#" class="block px-4 py-2 hover:bg-gray-100">
                            Settings
                          </a>
                          <hr className="mx-3" />
                        </li>
                        <li>
                          <a href="#" class="block px-4 py-2 hover:bg-gray-100">
                            Earnings
                          </a>
                          <hr className="mx-3" />
                        </li>
                        <li>
                          <a href="#" class="block px-4 py-2 hover:bg-gray-100">
                            Earnings
                          </a>
                        </li>
                      </ul>
                    </div>
                  )}
                </li>
                <li>
                  <a href="#">About</a>
                </li>
                <li>
                  <a href="#" aria-current="page">
                    Help
                  </a>
                </li>
                <li>
                  <a href="#" aria-current="page">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex flex-row items-center justify-between space-x-4 text-black">
            {/* <div className=" w-6 h-6 bg-slate-400 rounded-full"></div> */}
            <Profile />
            <span>Login</span>
            <BlueButton type="button">Submit Research</BlueButton>
          </div>
        </div>
      </nav>
    </div>
  );
}
