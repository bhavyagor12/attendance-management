import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { CalendarIcon } from "@heroicons/react/24/outline";
import { modalState } from "../atoms/modalState";
import { useRecoilState, useRecoilValue } from "recoil";
import { eventState } from "../atoms/eventState";
import { infoState } from "../atoms/infoState";
import { timestampToDatetimeInputString } from "../utils/helpers";
import { createLecture } from "../utils/services";
export default function EventModal({ startD, endD }) {
  const userInfo = useRecoilValue(infoState);
  const [modal, setModal] = useRecoilState(modalState);
  const [SubjectCode, setSubjectCode] = useState("");
  const [SubjectName, setSubjectName] = useState("");
  const [division, setDivision] = useState("A");
  const [year, setYear] = useState("FE");
  // const [type, setType] = useState("Lecture");
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState(startTime);
  const [eventsData, setEventsData] = useRecoilState(eventState);
  const [error, setError] = useState(false);
  const cancelButtonRef = useRef(null);

  function timeSet() {
    if (startD === null && endD === null) {
      const start = timestampToDatetimeInputString(Date.now(), "start");
      const end = timestampToDatetimeInputString(Date.now(), "end");
      setStartTime(start);
      setEndTime(end);
    } else {
      const start = timestampToDatetimeInputString(startD.getTime(), "start");
      const end = timestampToDatetimeInputString(endD.getTime(), "start");
      setStartTime(start);
      setEndTime(end);
    }
  }
  useEffect(() => {
    timeSet();
  }, []);
  const onSubmit = async () => {
    if (SubjectCode === "") {
      // alert("Please enter a valid event name");
      setError(true);
    } else {
      let bdy = {
        date_of_lecture: startTime,
        start_time: startTime,
        end_time: endTime,
        subject_id: SubjectCode,
        division: division,
        year: year,
        faculty_id: userInfo.ID,
      };

      createLecture(bdy);
      setEventsData([
        ...eventsData,
        {
          title: SubjectName,//TODO: somehow get the subject name
          start: new Date(startTime),
          end: new Date(endTime),
        },
      ]);
      setModal(false);
    }
  };
  const startChange = (e) => {
    var cringeFormat = e.target.value;
    setStartTime(cringeFormat);
  };
  const endChange = (e) => {
    var cringeFormat = e.target.value;
    setEndTime(cringeFormat);
  };

  return (
    <Transition.Root show={modal} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setModal}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pt-4 pb-4 sm:p-6 sm:pb-4">
                  <div className="flex items-center">
                    <div className="flex h-12 w-12  items-center justify-center rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                      <CalendarIcon
                        className="h-6 w-6 text-green-600"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="text-left sm:mt-0 sm:ml-4 sm:text-left">
                      <Dialog.Title
                        as="h3"
                        className="text-base font-semibold leading-6 text-gray-900"
                      >
                        Create Lecture
                      </Dialog.Title>
                    </div>
                  </div>
                  <div className="text-center mt-4 px-2 flex flex-col">
                  <div className="flex flex-col items-start my-1">
                      <label>Year</label>
                      <select
                      onChange={(e) => {
                        setYear(e.target.value);
                        setError(false);
                        if (e.target.value === "") {
                          setError(true);
                        }
                      }}
                      name="Year"
                      id="Year"
                      className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-0 focus:ring-offset-0 sm:text-sm sm:leading-6"
                      // value={year} // Make sure to set the value here if you want to show a default value
                    >
                      <option value="">Select Year</option> {/* Empty value for default selection */}
                      <option value="1">FE</option>
                      <option value="2">SE</option>
                      <option value="3">TE</option>
                      <option value="4">BE</option>
                      {/* Add more options as needed */}
                    </select>

                      {error && (
                        <div className="text-red-400 text-sm">
                          please enter valid year
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col items-start my-1">
                      <label>Subject Code</label>
                      <input
                        onChange={(e) => {
                          setSubjectCode(e.target.value);
                          setError(false);
                          if (e.target.value === "") {
                            setError(true);
                          }
                        }}
                        type="text"
                        name="SubjectCode"
                        id="SubjectCode"
                        className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-0 focus:ring-offset-0 sm:text-sm sm:leading-6"
                        placeholder="Subject Code"
                      />

                      {error && (
                        <div className="text-red-400 text-sm">
                          please enter valid subject code
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col items-start my-1">
                      <label>Division</label>
                      <input
                        onChange={(e) => {
                          setDivision(e.target.value);
                          setError(false);
                          if (e.target.value === "") {
                            setError(true);
                          }
                        }}
                        type="text"
                        name="Dvision"
                        id="Division"
                        className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-0 focus:ring-offset-0 sm:text-sm sm:leading-6"
                        placeholder="Division"
                      />

                      {error && (
                        <div className="text-red-400 text-sm">
                          please enter valid division
                        </div>
                      )}
                    </div>
                    {/* <div className="flex flex-col items-start my-1">
                      <label>Subject Name</label>
                      <input
                        onChange={(e) => {
                          setSubjectName(e.target.value);
                          setError(false);
                          if (e.target.value === "") {
                            setError(true);
                          }
                        }}
                        type="text"
                        name="SubjectName"
                        id="SubjectName"
                        className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-0 focus:ring-offset-0 sm:text-sm sm:leading-6"
                        placeholder="Subject Name"
                      />

                      {error && (
                        <div className="text-red-400 text-sm">
                          please enter a valid subject name
                        </div>
                      )}
                    </div> */}
                    <div className="flex flex-col items-start my-1">
                      <label>Start Time</label>
                      <input
                        defaultValue={startTime}
                        onChange={startChange}
                        type="datetime-local"
                        name="StartTime"
                        id="StartTime"
                        className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-0 focus:ring-offset-0 sm:text-sm sm:leading-6"
                        placeholder="Start Time"
                      />
                    </div>
                    <div className="flex flex-col items-start my-1">
                      <label>End Time</label>
                      <input
                        defaultValue={endTime}
                        onChange={endChange}
                        type="datetime-local"
                        name="EndTime"
                        id="EndTime"
                        className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-0 focus:ring-offset-0 sm:text-sm sm:leading-6"
                        placeholder="End Time"
                      />
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto"
                    onClick={onSubmit}
                  >
                    Create
                  </button>
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={() => setModal(false)}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
