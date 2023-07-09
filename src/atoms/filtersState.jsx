import { atom } from "recoil";
import events from "../components/events";
export const filtersState = atom({
  key: "filters",
  default: {},
});
