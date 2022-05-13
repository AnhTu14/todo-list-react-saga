import { City, ListReponsive } from "modules";
import axiosClients from "./axiosClient";
const cityApi = {
  getAll(): Promise<ListReponsive<City>> {
    const url = "/cities";
    return axiosClients.get(url, {
      params: {
        _page: 1,
        _limit: 10,
      },
    });
  },
};
export default cityApi;
