import { Select } from "antd";
import { useState } from "react";

const App = () => {
  const [year, setYear] = useState("");
  const [division, setDivision] = useState("");

  const onChange = (value) => {
    setYear(value);
  };

  const onChange1 = (value) => {
    setDivision(value);
  };
  return (
    <div className="flex gap-8">
      <Select
        style={{ width: 250 }}
        showSearch
        id="year"
        placeholder="Select year"
        optionFilterProp="children"
        onChange={onChange}
        defaultValue={year}
        filterOption={(input, option) =>
          (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
        }
        options={[
          {
            value: "firstYear",
            label: "first year",
          },
          {
            value: "secondYear",
            label: "second year",
          },
          {
            value: "thirdYear",
            label: "third year",
          },
          {
            value: "fourthYear",
            label: "fourth year",
          },
        ]}
      />
      <Select
        style={{ width: 250 }}
        showSearch
        id="division"
        placeholder="Select division"
        optionFilterProp="children"
        onChange={onChange1}
        filterOption={(input, option) =>
          (option?.label ?? "").toString().includes(input.toString())
        }
        options={[
          {
            value: "divisionA",
            label: "division A",
          },
          {
            value: "divisionB",
            label: "division B",
          },
        ]}
      />
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
export default App;
