import { ListParams, ListReponsive, Student } from "modules";
import axiosClients from "./axiosClient";
const studentApi = {
  getAll(params: ListParams): Promise<ListReponsive<Student>> {
    const url = "/students";
    return axiosClients.get(url, { params });
  },
  getById(id: string): Promise<Student> {
    const url = `/students/${id}`;
    return axiosClients.get(url);
  },
  add(data: Student): Promise<Student> {
    const url = "/students";
    return axiosClients.post(url, data);
  },
  update(data: Student): Promise<Student> {
    const url = `/students/${data.id}`;
    return axiosClients.patch(url, data);
  },
  remove(id: string): Promise<any> {
    const url = `/students/${id}`;
    return axiosClients.delete(url);
  },
};
export default studentApi;
