import { atom } from "recoil";
export const filtersState = atom({
  key: "filters",
  default: { year: 2024, division: "A", startDate: "", endDate: "" },
});
