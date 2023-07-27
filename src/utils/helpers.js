export const makeAttendanceForTeacher = (subjectsList) => {
  //goal of the function is to get a subjectsList from backend in this format

  {
    events: {
      monday: [
        {
          id: 1,
          name: "Homework",
          type: "custom",
          startTime: moment("2018-02-23T11:30:00"),
          endTime: moment("2018-02-23T13:30:00"),
        },

        {
          id: 2,
          name: "Classwork",
          type: "custom",
          startTime: moment("2018-02-23T09:30:00"),
          endTime: moment("2018-02-23T11:00:00"),
        },
        {
          id: 3,
          name: "Test",
          type: "custom",
          startTime: moment("2018-02-22T14:30:00"),
          endTime: moment("2018-02-22T15:30:00"),
        },
        {
          id: 4,
          name: "Test",
          type: "custom",
          startTime: moment("2018-02-22T15:30:00"),
          endTime: moment("2018-02-22T16:30:00"),
        },
      ];
    }
  }

  const hello = {
    title: "Sad Hour",
    id: "123",
    start: new Date(2023, 2, 6, 17, 0, 0),
    end: new Date(2023, 2, 6, 17, 30, 0),
  };
};
