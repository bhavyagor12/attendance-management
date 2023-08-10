import { atom } from "recoil";
export const filtersState = atom({
  key: "filters",
  default: { year: 2024, division: "A", startDate: "2023-06-01", endDate: "2023-09-14" },
});
