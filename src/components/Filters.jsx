import { Select } from 'antd';
import { useState } from 'react';
// const onChange = (value) => {
//   console.log(`selected ${value}`);
// };
// const onSearch = (value) => {
//   console.log('search:', value);
// };
const App = () => {
    const[clicked, setClicked] = useState(false)
    const[clicked2, setClicked2] = useState(false)
    const onChange = (value) => {
        console.log(`selected ${value}`);
        setClicked(true)
    }
    const onChange2 = (value) => {
        console.log(`selected ${value}`);
        setClicked2(true)
    }
    return (
    <div>
  <Select
    style={{ width: 250, marginLeft: 65 }}
    showSearch
    placeholder="Select year"
    optionFilterProp="children"
    onChange={onChange}
    // onSearch={onSearch}
    filterOption={(input, option) =>
      (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
    }
    options={[
      {
        value: 'firstYear',
        label: 'first year',
      },
      {
        value: 'secondYear',
        label: 'second year',
      },
      {
        value: 'thirdYear',
        label: 'third year',
      },
      {
        value: 'fourthYear',
        label: 'fourth year',
      }
    ]}
  />
  {clicked?<Select
    style={{ width: 250, marginLeft: 65 }}
    showSearch
    placeholder="Select division"
    optionFilterProp="children"
    onChange={onChange2}
    // onSearch={onSearch}
    filterOption={(input, option) =>
      (option?.label ?? '').toString().includes(input.toString())
    }
    options={[
      {
        value: 'divisionA',
        label: 'division A',
      },
      {
        value: 'divisionB',
        label: 'division B',
      }
    ]}
  />:<div></div>}
  {clicked2?<Select
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
  />:<div></div>}
  </div>
    );
};
export default App;