import { Select, Input, DatePicker } from "antd";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { filtersState } from "../atoms/filtersState";

const { RangePicker } = DatePicker;
const Filters = () => {
  const [year, setYear] = useState("2024");
  const [division, setDivision] = useState("A");
  const [filters, setFilters] = useRecoilState(filtersState);
  const[startDate, setStartDate] = useState(null);
  const[endDate, setEndDate] = useState(null);
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
    setFilters({ year, division });
    console.log(year, division);
  };
  useEffect(() => {
    console.log(filters)
    setFilters({ year, division, startDate, endDate });
  }, [year, division, startDate, endDate]);

  return (
    <div className="flex items-center justify-center gap-8">
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
        defaultValue="A"
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
