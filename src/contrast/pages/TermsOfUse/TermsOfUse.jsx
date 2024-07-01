import React from "react";
import Navbar from "../../../sharedComponents/Navbar";
import Footer from "../../../sharedComponents/Footer";
import { Site } from "../../../config/siteType";

export default function TermOfUse() {
  const siteName = Site.type === "contrast" ? "Contrast" : "UnconTrust";
  console.log(siteName);
  const htmlEl = (
    <div className="text-base">
      <h1 className="text-2xl text-center text-blue font-bold mt-2   ">
        Terms of use of the {siteName + " "} Website
      </h1>

      <h2 className="text-base font-bold mt-2   ">1. General</h2>
      <p className="  ">
        Upon entering the website of "{siteName + " "}" (henceforth: "the
        website"), and prior to carrying out any action on the website and/or
        using any service or information of any kind offered on the website, you
        are requested to read, carefully, the terms of service detailed below,
        including the website content, the services and usage options found and
        offered through it (henceforth: the "Terms of Use").
      </p>

      <h2 className="text-base font-bold mt-2   ">
        2. What is the {siteName + " "} website?
      </h2>
      <p className="  ">
        The {siteName + " "} website aims at providing a bird's eye view on the
        field of consciousness studies, and specifically, on how leading
        theories of consciousness have been studied. It allows users to analyze
        prominent trends and generate figures, conduct queries of the data, and
        upload new papers to be added to the paradigm.
      </p>
      <p className="  ">
        Use of the {siteName + " "} website constitutes your agreement to the
        following topics, without you being explicitly required to consent to
        these terms.
      </p>
      <h2 className="text-base font-bold mt-2   ">
        3.  Information and figures on the website:
      </h2>
      <p className="  ">
        The PI may change from time to time and as it sees fit the information,
        content and images on the website. The PI does not guarantee that
        information you have found on the website at any given time will
        continue to be published in the future.
      </p>
      <h2 className="text-base font-bold mt-2   ">4. Privacy:</h2>
      <p className="leading-tight   mb-0">
        <span className=" text-black text-base">
          <span className="font-bold mt-2">4.1</span>&nbsp; The University and
          the PI respects the privacy of users who access the website and/or use
          the various services offered as part of it. The purpose of the terms
          set out in this Privacy Policy, which is an integral part of the terms
          of use, is to review, inter alia, how the website uses information
          provided by users on the website and/or collected by the university
          during website use, as well as the way the user uses the information
          found on the website and/or the information the user is exposed to
          through the website.
        </span>
      </p>

      <p className="leading-tight  mb-0">
        <span className=" text-black text-base">
          <span className="font-bold mt-2">4.2</span>&nbsp; When using the
          website, it is possible that information will be collected about the
          pages presented to you, the content that you were interested in, how
          long you spent on the website and what actions you performed during
          your visit. The information does not identify you personally, so the
          information collected is of a general, statistical nature only.
        </span>
      </p>

      <p className="leading-tight mb-0">
        <span className=" text-black text-base">
          <span className="font-bold mt-2">4.3</span>&nbsp; The PI may retain
          the information and use it in accordance with the limitations included
          in the Terms of Use and the provisions of the law.
        </span>
      </p>

      <p className="leading-tight   mb-0">
        <span className=" text-black text-base">
          <span className="font-bold mt-2">4.4</span>&nbsp; The PI may use the
          information accumulated about the use of the website for the purposes
          of producing and analyzing statistical information. The PI may provide
          this statistical data to a third party, as long as the data does not
          reference or identify you personally.
        </span>
      </p>

      <p className="leading-tight   mb-0">
        <span className=" text-black text-base">
          <span className="font-bold mt-2">4.5</span>&nbsp; Beyond information
          about usage, the User may be requested to provide additional
          information about users through forms that are located on some of the
          pages of the website. The PI is allowed to collect this information,
          as long as the user has elected to fill out his details into these
          forms. The details are provided to PI by the user and are not used to
          identify the user upon entering the website. The information may be
          stored by the PI only, for the purpose of responding to or contacting
          Users for further details.
        </span>
      </p>
      <p className="leading-tight   mb-0">
        <span className=" text-black text-base">
          <span className="font-bold mt-2">4.5</span>&nbsp; Beyond information
          about usage, the User may be requested to provide additional
          information about users through forms that are located on some of the
          pages of the website. The PI is allowed to collect this information,
          as long as the user has elected to fill out his details into these
          forms. The details are provided to PI by the user and are not used to
          identify the user upon entering the website. The information may be
          stored by the PI only, for the purpose of responding to or contacting
          Users for further details.
        </span>
      </p>
      <p className="leading-tight   mb-0">
        <span className=" text-black text-base">
          <span className="font-bold mt-2">4.6</span>&nbsp; The PI might be
          interested in periodically sending you information about the website.
          Such information will be sent to you only if you have given explicit
          consent, and at any time you may withdraw your consent and cease
          receiving such information.
        </span>
      </p>

      <p className="leading-tight mb-0">
        <span className=" text-black text-base">
          <span className="font-bold mt-2">4.7</span>&nbsp; The PI uses
          information security systems and procedures on its websites. While
          these systems and procedures reduce the risks of unauthorized access,
          they do not provide absolute safety. Therefore, the PI/University do
          not guarantee that its services will be completely immune from
          unauthorized access to the information stored within them.
        </span>
      </p>

      <h2 className="text-base font-bold mt-2   ">
        <span className=" text-black text-base">
          <span className="font-bold mt-2">5. Using "Cookies":</span>
        </span>
      </h2>
      <p className="leading-tight   mb-0">
        <span className=" text-black text-base">
          <span className="font-bold mt-2">5.1</span>&nbsp; The website uses
          first-party cookies files (such as a Google Analytics cookie) and
          third-party cookies files (such as the DoubleClick cookie) together,
          to notify the PI/University of website traffic, for optimization of
          pages on the site and to display, from time to time, ads based on a
          user’s previous visits to the website.
        </span>
      </p>

      <h2 className="text-base font-bold mt-2   ">
        <span className=" text-black text-base">
          <span className="font-bold mt-2">6. Intellectual Property:</span>
        </span>
      </h2>
      <p className="leading-tight   mb-0">
        <span className=" text-black text-base">
          <span className="font-bold mt-2">6.1</span>&nbsp; All intellectual
          property rights, including copyrights, distribution rights, trade
          secrets, and other intellectual property rights, in connection with
          the information and services found on the website, are owned solely by
          the PI/University or third parties. The user shall have no rights with
          respect to them whatsoever.
        </span>
      </p>

      <p className="leading-tight   mb-0">
        <span className=" text-black text-base">
          <span className="font-bold mt-2">6.2</span>&nbsp; You may not copy,
          distribute, make changes, broadcast, publicly display, reproduce,
          publish, issue a license, create derivative works from the information
          and data published on the website and/or deliver to any third party
          any of the above, without citing the {siteName + " "} website as the
          source of this information.
        </span>
      </p>

      <p className="leading-tight   mb-0">
        <span className=" text-black text-base">
          <span className="font-bold mt-2">6.3</span>&nbsp; The user commits not
          to remove, conceal, disable, and/or modify any notice and/or any marks
          relating to the intellectual property rights and/or to the
          PI/University's rights and exclusivity.
        </span>
      </p>

      <p className="leading-tight   mb-0">
        <span className=" text-black text-base">
          <span className="font-bold mt-2">6.4</span>&nbsp; The intellectual
          property rights of the PI/University apply to the graphic design of
          the site, its databases, the computer code of the site, content on the
          website pages, and any other details related to its operation. No data
          may be copied, reproduced, distributed, sold, marketed, or translated
          from the website, nor may any data published on the website be used
          for the purpose of displaying such data on any other website or
          service without citing the {siteName + " "} website.
        </span>
      </p>

      <h2 className="text-base font-bold mt-2   ">
        <span className=" text-black text-base">
          <span className="font-bold mt-2">
            7. Restricting commercial use of the website:
          </span>
        </span>
      </h2>
      <p className="leading-tight   mb-0">
        <span className=" text-black text-base">
          No commercial use may be made of the website or the data published
          therein.
        </span>
      </p>

      <h2 className="text-base font-bold mt-2   ">
        <span className=" text-black text-base">
          <span className="font-bold mt-2">8. Changes to the Site:</span>
        </span>
      </h2>
      <p className="leading-tight   mb-0">
        <span className=" text-black text-base">
          The PI may change, from time to time, the structure of the site, the
          appearance, scope and availability of the services offered therein,
          the links found therein and any other aspect connected with the site
          and its operation - all without any advance notice. By nature, such
          changes may involve malfunctions, or may initially cause
          inconvenience, and so forth. You will not have any claim or demand
          against the PI/University for making such changes, or malfunctions
          that may occur in the course of their execution.
        </span>
      </p>

      <h2 className="text-base font-bold mt-2   ">
        <span className=" text-black text-base">
          <span className="font-bold mt-2">9. Limited Liability:</span>
        </span>
      </h2>
      <p className="leading-tight   mb-0">
        <span className=" text-black text-base">
          <span className="font-bold mt-2">9.1</span>&nbsp;The PI and the
          University shall provide the user with the services as described in
          the Terms of Use. In any case where the PI/University will not be able
          to provide the user with the services of the website, for any reason
          whatsoever, including due to an act and/or omission of the
          PI/University or in the event that the PI/University requests to
          change and/or cancel the services in accordance with the provisions of
          section 1.4 above, the user will not be entitled to any compensation
          and/or indemnity of any kind whatsoever for the aforesaid, and hereby
          waives fully and irrevocably and shall be prevented and waived from
          raising any claim and/or suit of any kind and type whatsoever in this
          regard.
        </span>
      </p>

      <p className="leading-tight   mb-0">
        <span className=" text-black text-base">
          {" "}
          <span className="font-bold mt-2">9.2</span>&nbsp; Without derogating
          from the PI/University's rights under section 4.1 above, the
          PI/University and/or anyone acting on its behalf shall bear no
          liability whatsoever for direct or indirect damage and/or loss,
          including compensation for loss of work and business, loss of profits,
          damage to reputation, loss and/or other financial damages arising
          and/or related to the user's ability to benefit from the use of the
          site and the adaptation of the services to the user's needs;
          circumstances that are not under the control of the university or that
          the PI/University could not foresee; use or reliance on information
          and content published on the site, including by third parties; any act
          and/or omission performed with the information or details provided by
          the user to third parties; Disruption of functionality and/or
          availability of the tenders websites and/or other services arising
          from malfunctions or failures of the Internet or TV networks and/or
          overload of traffic in email; damage or loss caused by error,
          accident, inaccuracy, etc., in the content of the information provided
          by the user on the tender site; Without derogating from the aforesaid,
          any damage or loss that the university was unable to anticipate and/or
          prevent by reasonable means.
        </span>
      </p>

      <p className="leading-tight   mb-0">
        <span className=" text-black text-base">
          <span className="font-bold mt-2">9.3</span>&nbsp; The user
          acknowledges that the services and all that is related thereto are
          provided by the PI/University in their condition, as they are, and
          subject to their availability. The user hereby declares and guarantees
          that they are solely and fully responsible for any use they make of
          the services or information found on the website, and is aware that
          the PI/University is not responsible, directly or indirectly, for any
          use the user makes of such services or information.
        </span>
      </p>
      <p className="leading-tight mb-0"></p>
    </div>
  );

  return (
    <div>
      <Navbar />
      <div className="mt-24 mb-20 w-[80%]  mx-auto text-base ">{htmlEl} </div>
      <Footer />
    </div>
  );
}
