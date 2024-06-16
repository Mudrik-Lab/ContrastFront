import React from "react";
import Navbar from "../../../sharedComponents/Navbar";
import Footer from "../../../sharedComponents/Footer";

export default function ModesOfGoverance() {
  return (
    <div>
      <Navbar />
      <div className="mt-24 mb-20 w-[80%] sm:px-20 mx-auto text-base ">
        <h1 className="text-2xl text-center text-blue font-bold mb-2">
          Modes Of Goverance
        </h1>
        <p className="mb-4">
          The UnconTrust database website is an open access interactive website,
          featuring the database for behavioral studies of unconscious
          processing. The website allows researchers and interested users to get
          a bird’s eye view on how such unconscious processes have been studied
          and conduct their own queries of the data. It is based on the ConTraSt
          website created by Itay Yaron (see Yaron et al., 2022), and it shares
          the aim of becoming a major hub for the community of consciousness
          studies. It will be maintained and operated by the Mudrik lab at Tel
          Aviv University, and governed by a Steering Committee (see further
          details below). It is funded by the Templeton World Charity Foundation
          and the CIFAR organization.
        </p>

        <h2 className="text-2xl font-semibold mb-2">Definition of Scope</h2>
        <ul className="list-disc list-inside mb-4">
          <li>
            The UnconTrust database includes all papers reported in the original
            manuscripts on which the database is based (Schreiber et al., in
            preparation; Stockart et al., in preparation), as well as papers
            classified since at TAU, by Maor Schreiber.
          </li>
          <li>
            The papers in the database must probe the processing of a stimulus
            which is suppressed from conscious awareness. They must be empirical
            papers (i.e., not reviews/perspectives), published in peer-reviewed
            journals (i.e., not preprints), in English. Currently, the database
            does not include neuroscientific data; it consists only of
            behavioral studies.
          </li>
          <li>
            New papers are added to the website as long as they involve such
            processing.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mb-2">
          Website Modes of Operation
        </h2>
        <ul className="list-disc list-inside mb-4">
          <li>
            The website is operated and maintained by designated personnel in
            the Mudrik lab at Tel Aviv University. Their responsibilities
            include:
            <ul className="list-decimal list-inside ml-8">
              <li>
                Periodically search of the literature (conducted every two
                months) to detect relevant papers
              </li>
              <li>
                Contact authors who did not upload their paper and suggest them
                doing so
              </li>
              <li>Classify and upload new papers</li>
              <li>
                Manage the paper vetting mechanism, and – in case no
                confirmation from the authors is obtained – go over the
                classifications and approve them
              </li>
              <li>Handle any technical aspect of the website operation</li>
              <li>Supervise any changes made to the website</li>
              <li>Handle social media engagement</li>
              <li>Periodically analyze feedback responses</li>
            </ul>
          </li>
          <li>
            The detailed website modes of operations are described in the
            Standard Operating Procedure; they were previously approved by the
            ConTraSt Founding Board.
          </li>
          <li>
            The website is free to all. Registration is needed in the following
            cases:
            <ul className="list-decimal list-inside ml-8">
              <li>Downloading data/paper lists</li>
              <li>Uploading new papers</li>
              <li>Requesting to vet a paper or amend its classification</li>
              <li>Suggesting a new query that can be added to the website</li>
              <li>Provide feedback</li>
              <li>Register to get notifications when new articles are added</li>
            </ul>
          </li>
          <li>
            The SOP details the types of data that will be collected upon
            registration.
          </li>
          <li>
            During registration, users will be asked to indicate if they agree
            that their data is saved. Information about future data use will be
            provided on the website. These include, among others:
            <ul className="list-decimal list-inside ml-8">
              <li>
                Conducting analyses to better understand the profile of the
                users
              </li>
              <li>
                Present such information at conferences, papers, grant
                applications etc.
              </li>
            </ul>
          </li>
          <li>
            Individual users (authors/interested parties) can upload papers to
            the website. These papers are vetted before being added to the
            database.
          </li>
          <li>
            Paper upload will be done via online forms. Once uploaded, the paper
            will be sent by the website manager to a Steering Committee member.
            Upon approval for inclusion in the database, it will be sent to the
            original authors for approval of all classifications, asking them to
            reply within two weeks. Then, the procedure will follow according to
            these scenarios:
            <ul className="list-decimal list-inside ml-8">
              <li>
                If the authors approve, the website manager will add the
                classified entry to the database, so it is automatically updated
                to the website (without further vetting of the classifications,
                beyond checking completeness and consistency).
              </li>
              <li>
                If the authors make changes, the website manager will add the
                revised entry to the database.
              </li>
              <li>
                If the authors fail to respond within the predefined time
                window, a reminder will be sent, asking them to reply within a
                week.
              </li>
              <li>
                If no response is obtained within three weeks, the website
                manager will vet the classifications, consulting with L.M. where
                needed.
              </li>
            </ul>
          </li>
          <li>
            Papers vetting will be marked on the database, differentiating
            between papers that have been vetted by the authors, by the website
            team, or as part of the initial work reported in the original
            papers.
          </li>
          <li>
            Authors whose papers are already included in the database can ask to
            vet the classifications of their paper and ask for amendments.
          </li>
          <li>
            Users will be asked to cite the original papers upon using
            information generated on the website and/or the database DOI.
          </li>
          <li>
            The analyses codes used by the website will be shared via GitHub. A
            link will be provided on the website.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mb-2">Steering Committee</h2>
        <ul className="list-disc list-inside mb-4">
          <li>
            The Steering Committee has two major roles:
            <ul className="list-decimal list-inside ml-8">
              <li>Decide on changes to the database and website</li>
              <li>Act as an editorial board for the paper vetting procedure</li>
            </ul>
          </li>
          <li>
            The decisions made by the Steering Committee may pertain to the
            following topics (non-exhaustive list):
            <ul className="list-decimal list-inside ml-8">
              <li>Decide on adding new queries to the website</li>
              <li>Decide on adding new classification parameters</li>
              <li>
                Decide on classification amendments following a request from an
                external user, in case the website manager and L.M. are unable
                to reach a decision
              </li>
              <li>
                Decide on other changes to the database/website based on
                feedback from users
              </li>
              <li>Decide on changes to Modes of Governance and/or SOP</li>
            </ul>
          </li>
          <li>
            As an editorial board, the Steering Committee decides which papers
            should be included in the database. Upon uploading a new paper, the
            website manager will send it to one of the committee members, who
            will be asked to decide if it is eligible for inclusion within one
            week (at this stage, no form is filled; the paper itself will be
            sent to the relevant member, based on their field of expertise).
          </li>
          <li>
            The Steering Committee does not vet the interpretation of the
            findings or the validity of the methods or the classification
            itself, and this will be clearly stated on the website. It only
            makes sure the paper should be included in the database.
          </li>
          <li>
            The steering committee meets once a year to discuss potential
            changes and review website engagement.
          </li>
          <li>
            The members of the steering committee were contacted and all agreed
            to take the role.
          </li>
          <li>
            Currently, there is no predefined term for committee membership.
            When a member decides to leave the committee, they should notify the
            website manager at TAU university, giving two months’ notice, to
            allow enough time to find a replacement. Then, the other members
            will suggest replacements and conduct a vote to decide who should be
            invited to serve as a new member.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mb-2">Measures of Success</h2>
        <ul className="list-disc list-inside mb-4">
          <li>
            The website will include a designated key for feedback, to collect
            responses from users. This will be a short online form. The results
            will be periodically analyzed by the website manager and reported to
            the Steering committee during the annual meeting.
          </li>
          <li>
            Additional measures of success include:
            <ul className="list-decimal list-inside ml-8">
              <li>Number of visits to the website</li>
              <li>Number of conducted queries per type of query</li>
              <li>Number of downloaded lists of papers</li>
              <li>
                Number of citations to either the original paper or the website
              </li>
              <li>Number of uploaded papers by users</li>
              <li>Number of papers using the database for publications</li>
            </ul>
          </li>
        </ul>
      </div>
      <Footer />
    </div>
  );
}
