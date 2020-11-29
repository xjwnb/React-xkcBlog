/*
 * @Author: your name
 * @Date: 2020-11-28 22:14:18
 * @LastEditTime: 2020-11-29 12:19:42
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \react-blog\src\components\Search\index.js
 */
import React from "react";

import { Input } from 'antd';
const { Search } = Input;

export default function SearchInput() {

  const onSearch = value => {
    console.log(value);
  }
  return (
    <div>
      <Search
        placeholder="input search text"
        onSearch={onSearch}
        style={{ width: 200 }}
      />
    </div>
  );
}
