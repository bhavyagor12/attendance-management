import { Select, Input, DatePicker } from "antd";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { filtersState } from "../atoms/filtersState";

const { RangePicker } = DatePicker;
const Filters = () => {
  const [year, setYear] = useState("3");
  const [division, setDivision] = useState("B");
  const [filters, setFilters] = useRecoilState(filtersState);
  const[startDate, setStartDate] = useState("2024-06-01");
  const[endDate, setEndDate] = useState("2024-09-01");

  const yearOnchange = (value) => {
    setYear(parseInt(value));
  };

  const divOnchange = (value) => {
    setDivision(value);
  };

  const handleChange = (value) => {
    setStartDate(value[0].format('YYYY-MM-DD'));
    setEndDate(value[1].format('YYYY-MM-DD'));
  }

  const onButtonClick = () => {
    setFilters({ year, division, startDate, endDate });
  };
  return (
    <div className="flex items-center justify-center gap-8 flex-wrap">
      <Input
        placeholder="PassOut Year"
        id="year"
        defaultValue={year}
        onChange={yearOnchange}
        style={{ width: 75 }}
      />
      <Select
        style={{ width: 250 }}
        showSearch
        id="division"
        defaultValue="B"
        placeholder="Select division"
        optionFilterProp="children"
        onChange={divOnchange}
        filterOption={(input, option) =>
          (option?.label ?? "").toString().includes(input.toString())
        }
        options={[
          {
            value: "A",
            label: "A",
          },
          {
            value: "B",
            label: "B",
          },
          {
            value: "C",
            label: "C",
          },
          {
            value: "D",
            label: "D",
          },
        ]}
      />
      <RangePicker onChange={handleChange} />
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        type="button"
        onClick={onButtonClick}
      >
        Get Data
      </button>

      {/* <Select
    style={{ width: 250, marginLeft: 65 }}
    showSearch
    placeholder="Select batch"
    optionFilterProp="children"
    // onChange={onChange}
    // onSearch={onSearch}
    filterOption={(input, option) =>
      (option?.label ?? '').toString().includes(input.toString())
    }
    options={[
      {
        value: 'batch1',
        label: 'batch 1',
      },
      {
        value: 'batch2',
        label: 'batch 2',
      }
    ]}
  /> */}
    </div>
  );
};
export default Filters;
