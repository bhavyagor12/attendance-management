import { atom } from "recoil";
export const infoState = atom({
    key: "info",
    default: { sap_id: null, name: "", ID: "" },
  });