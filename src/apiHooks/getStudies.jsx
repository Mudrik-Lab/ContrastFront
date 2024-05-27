import { queryApi } from "../Utils/api";

export async function getMySubmittedStudies(isUncontrast) {
  return await queryApi({
    url: isUncontrast
      ? `uncontrast_studies/submitted_studies/my_studies`
      : `studies/submitted_studies/my_studies`,
    method: "GET",
    isProtected: true,
  });
}
export async function getStudy({ id }) {
  return await queryApi({
    url: `studies/submitted_studies/${id}`,
    method: "GET",
    isProtected: true,
  });
}

export async function EditUncompletedStudy({
  id,
  authors,
  DOI,
  title,
  source_title,
  countries,
  year,
  authors_key_words,
  is_author_submitter,
}) {
  return await queryApi({
    url: `studies/submitted_studies/${id}/`,
    method: "PATCH",
    isProtected: true,
    data: {
      authors,
      DOI,
      title,
      source_title,
      countries,
      year,
      authors_key_words,
      is_author_submitter,
    },
  });
}

export async function submitStudy({
  authors,
  DOI,
  title,
  source_title,
  countries,
  year,
  authors_key_words,
  is_author_submitter,
  isUncontrast,
}) {
  return await queryApi({
    url: isUncontrast
      ? `uncontrast_studies/submitted_studies/`
      : `studies/submitted_studies/`,
    method: "POST",
    isProtected: true,
    data: {
      authors,
      DOI,
      title,
      source_title,
      countries,
      year,
      authors_key_words,
      is_author_submitter,
    },
  });
}
