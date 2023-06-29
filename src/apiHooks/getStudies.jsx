import { queryApi } from "../Utils/api";

// export async function getStudies() {
//   return await queryApi({
//     url: `studies/studies/`,
//     method: "GET",
//     isProtected: true,
//   });
// }
// export async function getStudy({ id }) {
//   return await queryApi({
//     url: `studies/studies/${id}`,
//     method: "GET",
//     isProtected: true,
//   });
// }

export async function getMySubmittedStudies() {
  return await queryApi({
    url: `studies/submitted_studies/my_studies`,
    method: "GET",
    isProtected: true,
  });
}
