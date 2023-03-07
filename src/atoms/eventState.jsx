import {atom} from 'recoil';
import events from "../components/events";
export const eventState = atom({
    key: "events",
    default: events,
  });