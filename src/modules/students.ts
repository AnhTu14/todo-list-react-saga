export interface Student {
  id?: string;
  name: string;
  age: number;
  mark: number;
  gender: "male" | "female";
  city: string;
  creatAt?: number;
  updateAt?: number;
}
