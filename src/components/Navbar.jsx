import React from "react";

export default function Navbar() {
  const [graphMenue, setGraphMenue] = React.useState(false);
  return (
    <div>
      <nav className="bg-gray-800 px-2 py-2.5 fixed w-full z-20 top-0 left-0">
        <div className="container flex flex-wrap items-center justify-between mx-auto">
          <div className="flex items-center justify-between w-2/4">
            <div>
              <span className="text-white">LOGO</span>
            </div>
            <div
              className="items-center justify-between flex"
              id="navbar-sticky"
            >
              <ul className="flex flex-row text-white space-x-12">
                <li className="flex items-center relative">
                  <button
                    id="dropdownNavbarLink"
                    data-dropdown-toggle="dropdownNavbar"
                    class="flex items-center text-white border-0 "
                    onClick={() => setGraphMenue(!graphMenue)}
                  >
                    Graphs
                    <svg
                      class="w-5 h-5 ml-1"
                      aria-hidden="true"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </button>

                  {graphMenue && (
                    <div
                      id="dropdownNavbar"
                      class="z-10  bg-white rounded-md shadow w-44 absolute top-10"
                    >
                      <ul
                        class="py-2 text-sm text-gray-700 dark:text-gray-400"
                        aria-labelledby="dropdownLargeButton"
                      >
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
          <div className="flex flex-row items-center justify-between space-x-4 text-white">
            <div className=" w-6 h-6 bg-slate-400 rounded-full"></div>
            <span>Login</span>
            <button
              type="button"
              className="text-gray-800 bg-gray-100 hover:bg-gray-500 font-medium rounded-sm text-sm px-5 py-1.5 text-center mr-3 "
            >
              Submit Research
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
}
