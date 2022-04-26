import axios from "axios";

const api = () => {
  return axios.create({
    baseURL: "https://hbysmobil.erciyes.edu.tr/api/personel",
    //"https://localhost:44350/personel",
  });
};

export default api;
