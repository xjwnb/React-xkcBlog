/*
 * @Author: your name
 * @Date: 2021-01-01 15:44:27
 * @LastEditTime: 2021-01-01 18:11:42
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \react-blog\src\components\TagCloud\index.js
 */
import React from "react";

import "./index.less";

import { Divider, Tag } from "antd";

import { withRouter } from "react-router-dom";

function TagCloud(props) {
  const tagClickHandle = (tagName) => {
    props.history.push(`/blog?tagName=${tagName}`);
  };

  let { tagInfo } = props;
  return (
    <div className="tag-cloud">
      <div className="tag-cloud-title">
        <Divider orientation="left">
          <span>标签云</span>
        </Divider>
      </div>
      <div className="tag-cloud-div">
        {tagInfo &&
          tagInfo.map((tag) => {
            return (
              <Tag
                key={tag.tagName}
                color={tag.tagColor}
                onClick={() => tagClickHandle(tag.tagName)}
              >
                {tag.tagName}
              </Tag>
            );
          })}
      </div>
    </div>
  );
}

export default withRouter(TagCloud);
