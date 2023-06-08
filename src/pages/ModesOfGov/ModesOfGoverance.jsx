import React from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { Text } from "../../components/Reusble";

export default function ModesOfGoverance() {
  return (
    <div>
      <Navbar />
      <div className="mt-24 mb-20 w-[80%] sm:px-20 mx-auto text-lg ">
        <Text size={28} weight="bold" color="blue" center>
          ModesOfGoverance
        </Text>
        <div className="mt-4 bg-blue p-8">
          The ConTraSt database website is an open access interactive website,
          featuring the Consciousness Theories Studies (ConTraSt) database. The
          website allows researchers and interested users to get a bird’s eye
          view on how theories of consciousness have been studied and conduct
          their own queries of the data. It was first created by Itay Yaron (see
          Yaron et al., 2022), with the aim of it becoming a major hub for the
          community of consciousness studies. It will be maintained and operated
          by the Mudrik lab at Tel Aviv University, and governed by a Steering
          Committee (see further details below). It is funded by the Templeton
          World Charity Foundation.
          <br /> In September 2022, the founding board of the ConTraSt hub met
          and decided on the modes of governance, which are detailed below. They
          are centered around four topics: Definition of scope, Website modes of
          operation, Steering committee, and Measures of success.
          <br /> The founding board included the following members
          (alphabetically ordered): Ned Block, Lucie Charles, Axel Cleeremans,
          Stephen Fleming, Lucia Melloni, Liad Mudrik (henceforth, L.M.), Megan
          Peters, Anil Seth, Karine Jospe and Itay Yaron. All approved the Modes
          of Governance, detailed below, on December 1st, 2022 .
        </div>

        <div className="mt-4">
          <h1 className="font-bold text-2xl">1. Definition of Scope</h1>
          <h3 className="font-bold">1A. The ConTraSt database includes...</h3>
          <p>
            The ConTraSt database includes all papers reported in the original
            manuscript in which the database was introduced (Yaron et al.,
            2022), as well as papers classified since at TAU, by Karine Jospe
            (in collaboration with Itay Yaron).
          </p>
          <h3 className="font-bold">
            1B. The papers in the database must refer to...
          </h3>
          <p>
            The papers in the database must refer to at least one theory of
            consciousness (see section 1C below). They must be empirical papers
            (i.e., not reviews/perspectives), published in peer-reviewed
            journals (i.e., not preprints), in English. As opposed to the
            original database, papers do not have to include neuroscientific
            data (i.e., behavioral papers interpreting their findings in light
            of the theories can also be uploaded).
          </p>
          <h3 className="font-bold">
            1C. The website also includes a section for papers that are not
            included in the database...
          </h3>
          <p>
            The website also includes a section for papers that are not included
            in the database, but are relevant to the study of theories of
            consciousness (i.e., reviews, meta-analyses, papers that used the
            database and refer to it). These will not be included in the
            different queries provided by the website, but will be listed on the
            website for interested readers.
          </p>
          <h3 className="font-bold">
            1D. New papers are added to the website as long as they refer to
            theories belonging to one of the following classes...
          </h3>
          <p>
            New papers are added to the website as long as they refer to
            theories belonging to one of the following classes (in alphabetical
            order):
          </p>
          <ul>
            <li className="ml-4">
              i. First order & predictive processing theories
            </li>
            <li className="ml-4">ii. Global workspace theories</li>
            <li className="ml-4">iii. Higher order theories</li>
            <li className="ml-4">iv. Integrated information theories</li>
            <li className="ml-4">v. Other</li>
          </ul>
          <h3 className="font-bold">
            1E. Adding an additional class of theories is done upon a decision
            of the ConTraSt Steering committee (see section 3)...
          </h3>
          <p>
            Adding an additional class of theories is done upon a decision of
            the ConTraSt Steering committee (see section 3). The committee also
            monitors the "Other" category every 3 months; if a critical mass of
            papers belonging to a specific class of theories is found, the
            committee will decide if it should be added as a new class of
            theories to the database. In this case, the website will include a
            statement about the date this class was added, providing also a list
            of past papers that meet the inclusion criteria (as defined by Yaron
            et al., 2022) and have not yet been uploaded to the database.
          </p>
        </div>
        <div className="mt-4">
          <h2 className="font-bold text-2xl">2. Website Modes of Operation</h2>
          <h3 className="font-bold">
            2A. The website is operated and maintained by designated personnel
            in the Mudrik lab at Tel Aviv University. Their responsibilities
            include:
          </h3>
          <ul>
            <li className="ml-4">
              <h3>
                <span> i. </span> Periodically search of the literature
                (conducted every two months) to detect relevant papers
              </h3>
            </li>
            <li className="ml-4">
              <h3>
                <span> ii. </span> Contact authors who did not upload their
                paper and suggest them doing so
              </h3>
            </li>
            <li className="ml-4">
              <h3>
                <span> iii. </span> Potentially classify and upload new papers
                (if time permits)
              </h3>
            </li>
            <li className="ml-4">
              <h3>
                <span> iv. </span> Manage the paper vetting mechanism (see
                section 2G), and – in case no confirmation from the authors is
                obtain – go over the classifications and approve them
              </h3>
            </li>
            <li className="ml-4">
              <h3>
                <span> v. </span> Handle any technical aspect of the website
                operation
              </h3>
            </li>
            <li className="ml-4">
              <h3>
                <span> vi. </span> Supervise any changes made to the website
              </h3>
            </li>
            <li className="ml-4">
              <h3>
                <span> vii. </span> Handle social media engagement
              </h3>
            </li>
            <li className="ml-4">
              <h3>
                <span> viii. </span> Periodically analyze feedback responses
                (see section 4A)
              </h3>
            </li>
          </ul>
          <h3 className="font-bold">
            2B. The detailed website modes of operations are described in the
            Standard Operating Procedure, approved by the ConTraSt Founding
            Board.
          </h3>
          <h3 className="font-bold">
            2C. The website is free to all. Registration is needed in the
            following cases:
          </h3>
          <ul>
            <li className="ml-4">
              <h3>
                <span> i. </span> Downloading data/paper lists (see section SOP)
              </h3>
            </li>
            <li className="ml-4">
              <h3>
                <span> ii. </span> Uploading new papers (see sections 2F&2G)
              </h3>
            </li>
            <li className="ml-4">
              <h3>
                <span> iii. </span> Requesting to vet a paper or amend its
                classification (see section 2G&2H)
              </h3>
            </li>
            <li className="ml-4">
              <h3>
                <span> iv. </span> Suggesting a new query that can be added to
                the website (see SOP)
              </h3>
            </li>
            <li className="ml-4">
              <h3>
                <span> v. </span> Provide feedback (see SOP)
              </h3>
            </li>
            <li className="ml-4">
              <h3>
                <span> vi. </span> Register to get notifications when new
                articles are added (see SOP)
              </h3>
            </li>
          </ul>
          <h3 className="font-bold">
            2D. The SOP details the types of data that will be collected upon
            registration.
          </h3>
          <h3 className="font-bold">
            2E. During registration, users will be asked to indicate if they
            agree that their data is saved. Information about future data use
            will be provided on the website. These include, among others:
          </h3>
          <ul>
            <li className="ml-4">
              <h3>
                <span> i. </span> Conducting analyses to better understand the
                profile of the users
              </h3>
            </li>
            <li className="ml-4">
              <h3>
                <span> ii. </span> Present such information at conferences,
                papers, grant applications, etc.
              </h3>
            </li>
          </ul>
          <h3 className="font-bold">
            2F. Individual users (authors/interested parties) can upload papers
            to the website (see SOP for the actual procedure). These papers are
            vetted before being added to the database (see section 2G).
          </h3>
          <h3 className="font-bold">
            2G. Paper upload will be done via online forms (see SOP). Once
            uploaded, the paper will be sent by the website manager to a
            Steering Committee member (see section 3C). Upon approval for
            inclusion in the database, it will be sent to the original authors
            for approval of all classifications, asking them to reply within two
            weeks. Then, the procedure will follow according to these scenarios:
          </h3>
          <ul>
            <li className="ml-4">
              <h3>
                <span> i. </span> If the authors approve, the website manager
                will add the classified entry to the database, so it is
                automatically updated to the website (without further vetting of
                the classifications, beyond checking completeness and
                consistency (see SOP).
              </h3>
            </li>
            <li className="ml-4">
              <h3>
                <span> ii. </span> If the authors make changes, the website
                manager will add the revised entry to the database.
              </h3>
            </li>
            <li className="ml-4">
              <h3>
                <span> iii. </span> If the authors fail to respond within the
                predefined time window, a reminder will be sent, asking them to
                reply within a week.
              </h3>
            </li>
            <li className="ml-4">
              <h3>
                <span> iv. </span> If no response is obtained within three
                weeks, the website manager will vet the classifications,
                consulting with L.M. where needed.
              </h3>
            </li>
          </ul>
          <h3 className="font-bold">
            2H. Papers vetting will be marked on the database, differentiating
            between papers that have been vetted by the authors, by the website
            team, or as part of the initial work reported in Yaron et al. (2022;
            these papers will not be re-vetted).
          </h3>
          <h3 className="font-bold">
            2I. Authors whose papers are already included in the database (e.g.,
            as they appeared in the original ConTraSt paper) can ask to vet the
            classifications of their paper and ask for amendments (see the SOP
            for the procedure for such amendments).
          </h3>
          <h3 className="font-bold">
            2J. Users will be asked to cite the original paper upon using
            information generated on the website (Yaron et al., 2022) and/or the
            database DOI.
          </h3>
          <h3 className="font-bold">
            2K. The analysis code used by the website will be shared via GitHub.
            A link will be provided on the website.
          </h3>
        </div>
        <div className="mt-4">
          <h2 className="font-bold text-2xl">3. Steering committee:</h2>
          <h3 className="font-bold">
            3A. The Steering Committee has two major roles:
          </h3>
          <ul>
            <li className="ml-4">
              <h3>
                <span> i. </span> Decide on changes to the database and website
                (see section 3B)
              </h3>
            </li>
            <li className="ml-4">
              <h3>
                <span> ii. </span> Act as an editorial board for the paper
                vetting procedure
              </h3>
            </li>
          </ul>
          <h3 className="font-bold">
            3B. The decisions made by the Steering Committee may pertain to the
            following topics (non-exhaustive list):
          </h3>
          <ul>
            <li className="ml-4">
              <h3>
                <span> i. </span> Classification of theories into classes (see
                section 1E).
              </h3>
            </li>
            <li className="ml-4">
              <h3>
                <span> ii. </span> Decide on key papers for new classes of
                theories
              </h3>
            </li>
            <li className="ml-4">
              <h3>
                <span> iii. </span> Decide on adding new queries to the website
              </h3>
            </li>
            <li className="ml-4">
              <h3>
                <span> iv. </span> Decide on adding new classification
                parameters
              </h3>
            </li>
            <li className="ml-4">
              <h3>
                <span> v. </span> Decide on classification amendments following
                a request from an external user, in case the website manager and
                L.M. are unable to reach a decision
              </h3>
            </li>
            <li className="ml-4">
              <h3>
                <span> vi. </span> Decide on other changes to the
                database/website based on feedback from users (see SOP)
              </h3>
            </li>
            <li className="ml-4">
              <h3>
                <span> vii. </span> Decide on changes to Modes of Governance
                and/or SOP
              </h3>
            </li>
          </ul>
          <h3 className="font-bold">
            3C. As an editorial board, the Steering Committee decides which
            papers should be included in the database. Upon uploading a new
            paper, the website manager will send it to one of the committee
            members, who will be asked to decide if it is eligible for inclusion
            within one week (at this stage, no form is filled; the paper itself
            will be sent to the relevant member, based on their field of
            expertise).
          </h3>
          <h3 className="font-bold">
            3D. The Steering Committee does not vet the interpretation of the
            findings or the validity of the methods or the classification itself
            (see section 2Aiv above), and this will be clearly stated on the
            website. It only makes sure the paper should be included in the
            database.
          </h3>
          <h3 className="font-bold">
            3E. The steering committee meets once a year to discuss potential
            changes and review website engagement.
          </h3>
          <h3 className="font-bold">
            3F. The founding board members all agreed to serve as the first
            steering committee.
          </h3>
          <h3 className="font-bold">
            3G. Currently, there is no predefined term for committee membership.
            When a member decides to leave the committee, they should notify the
            website manager at TAU University, giving two months’ notice, to
            allow enough time to find a replacement. Then, the other members
            will suggest replacements and conduct a vote to decide who should be
            invited to serve as a new member.
          </h3>
        </div>
        <div className="mt-4">
          <h2 className="font-bold text-2xl">4. Measures of success:</h2>
          <h3 className="font-bold">
            4A. The website will include a designated key for feedback, to
            collect responses from users. This will be a short online form. The
            results will be periodically analyzed by the website manager and
            reported to the Steering committee during the annual meeting.
          </h3>
          <h3 className="font-bold">
            4B. Additional measures of success include:
          </h3>
          <ul>
            <li className="ml-4">
              <h3>
                <span> i. </span> Number of visits to the website
              </h3>
            </li>
            <li className="ml-4">
              <h3>
                <span> ii. </span> Number of conducted queries per type of query
              </h3>
            </li>
            <li className="ml-4">
              <h3>
                <span> iii. </span> Number of downloaded lists of papers
              </h3>
            </li>
            <li className="ml-4">
              <h3>
                <span> iv. </span> Number of citations to either the original
                paper or the website
              </h3>
            </li>
            <li className="ml-4">
              <h3>
                <span> v. </span> Number of uploaded papers by users
              </h3>
            </li>
            <li className="ml-4">
              <h3>
                <span> vi. </span> Number of papers using the database for
                publications
              </h3>
            </li>
          </ul>
        </div>
      </div>
      <Footer />
    </div>
  );
}
