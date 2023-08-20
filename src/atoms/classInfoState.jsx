import { atom } from "recoil";
export const classInfoState = atom({
  key: "classInfo",
  default: { year: "", division: "", batch: 0 },
});
