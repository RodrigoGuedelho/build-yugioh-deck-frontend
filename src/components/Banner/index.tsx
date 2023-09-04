import React from "react";
import "./banner.css";
import { Carousel } from "antd";


function Banner(){
  return (
    <Carousel className="banner">
      <div className="item-banner"> 
        <img src="bakura.png" alt="img bakura" />
        <img src="yugi.png" alt="img yugi" />
        <img src="pegasus.png" alt="img pegasus" />
      </div>
      <div className="item-banner">
        <img src="bakura.png" alt="img bakura" />
        <img src="yugi.png" alt="img yugi" />
        <img src="pegasus.png" alt="img pegasus" />
      </div>
    </Carousel>
  );

}


export default Banner;