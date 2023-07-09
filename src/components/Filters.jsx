import { Select } from "antd";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { filtersState } from "../atoms/filtersState";

const Filters = () => {
  const [year, setYear] = useState(0);
  const [division, setDivision] = useState("");
  const [filters, setFilters] = useRecoilState(filtersState);

  const onChange = (value) => {
    setYear(value);
  };

  const onChange1 = (value) => {
    setDivision(value);
  };

  useEffect(() => {
    setFilters({ year, division });
  }, [year, division]);

  return (
    <div className="flex items-center justify-center gap-8">
      <Select
        style={{ width: 250 }}
        showSearch
        id="year"
        defaultValue="2026"
        placeholder="Select year"
        optionFilterProp="children"
        onChange={onChange}
        filterOption={(input, option) =>
          (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
        }
        options={[
          {
            value: "2026",
            label: "first year",
          },
          {
            value: "2025",
            label: "second year",
          },
          {
            value: "2024",
            label: "third year",
          },
          {
            value: "2023",
            label: "fourth year",
          },
        ]}
      />
      <Select
        style={{ width: 250 }}
        showSearch
        id="division"
        defaultValue="A"
        placeholder="Select division"
        optionFilterProp="children"
        onChange={onChange1}
        filterOption={(input, option) =>
          (option?.label ?? "").toString().includes(input.toString())
        }
        options={[
          {
            value: "A",
            label: "division A",
          },
          {
            value: "B",
            label: "division B",
          },
        ]}
      />
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        type="button"
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
