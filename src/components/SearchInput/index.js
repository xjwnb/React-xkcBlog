/*
 * @Author: your name
 * @Date: 2020-11-28 22:14:18
 * @LastEditTime: 2020-12-01 14:08:32
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \react-blog\src\components\Search\index.js
 */
import React, { useEffect } from "react";

import { Input } from 'antd';
const { Search } = Input;

export default function SearchInput(props) {

  const onSearch = value => {
    props.searchInput(value);
  }
  return (
    <div>
      <Search
        placeholder=""
        onSearch={onSearch}
        style={{ width: 200 }}
      />
    </div>
  );
}
