import { Select, Input, DatePicker } from "antd";
import { useState } from "react";
const { RangePicker } = DatePicker;
const Filters = ({ loading, fetchData }) => {
  const [year, setYear] = useState("3");
  const [division, setDivision] = useState("I1");
  const [startDate, setStartDate] = useState("2024-06-01");
  const [endDate, setEndDate] = useState("2024-09-01");

  const yearOnchange = (e) => {
    setYear(e.target.value);
  };

  const divOnchange = (value) => {
    setDivision(value);
  };

  const handleChange = (value) => {
    setStartDate(value[0].format("YYYY-MM-DD"));
    setEndDate(value[1].format("YYYY-MM-DD"));
  };

  const onButtonClick = () => {
    let filterData = { year, division, startDate, endDate };
    fetchData(filterData);
  };

  return (
    <div className="flex items-center justify-center gap-8 flex-wrap">
      <Input
        placeholder="Current Year"
        id="year"
        value={year}
        disabled={loading}
        onChange={yearOnchange}
        style={{ width: 75 }}
      />
      <Select
        style={{ width: 250 }}
        showSearch
        id="division"
        defaultValue="I1"
        placeholder="Select division"
        optionFilterProp="children"
        onChange={divOnchange}
        disabled={loading}
        filterOption={(input, option) =>
          (option?.label ?? "").toString().includes(input.toString())
        }
        options={[
          {
            value: "I1",
            label: "I1",
          },
          {
            value: "I2",
            label: "I2",
          },
          {
            value: "I3",
            label: "I3",
          },
        ]}
      />
      <RangePicker disabled={loading} onChange={handleChange} />
      <button
        className={`bg-blue-500 hover:bg-blue-700 ${
          loading && "cursor-not-allowed"
        }  text-white font-bold py-2 px-4 rounded`}
        type="button"
        disabled={loading}
        onClick={onButtonClick}
      >
        Get Data
      </button>
    </div>
  );
};
export default Filters;
