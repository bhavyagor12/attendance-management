import { atom } from "recoil";

export const eventState = atom({
  key: "events",
  default: [],
});
