import axiosClient from "./axiosClient";

const scoreApi = {
  getAllScores: (page = 1, limit = 20) =>
    axiosClient.get("/api/scores", {
      params: { page, limit },
    }),
  getScoresByRegistrationNumber: (registrationNumber) =>
    axiosClient.get(`/api/scores/check/${registrationNumber}`),
  getReportBySubject: (subject) =>
    axiosClient.get(`/api/scores/report/${subject}`),
  getTopGroupA: () => axiosClient.get("/api/scores/top-group-a"),
};

export default scoreApi;
