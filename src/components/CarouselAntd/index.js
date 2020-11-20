/*
 * @Author: your name
 * @Date: 2020-11-20 16:59:21
 * @LastEditTime: 2020-11-20 20:53:54
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \react-blog\src\components\Carousel\index.js
 */
import React from "react";

import { Carousel, Image } from "antd";

const contentStyle = {
  height: "300px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};

export default function CarouselAntd(props) {
  return (
    <Carousel autoplay>
      {
        props.carouselImages.map(item => {
          return (
            <div key={item.id}>
              <Image style={contentStyle} height="350px"  src={item.src} />
            </div>
          )
        })
      }
    </Carousel>
  );
}
