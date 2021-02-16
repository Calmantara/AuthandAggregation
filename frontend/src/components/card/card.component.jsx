import React from "react";
import "./card.styles.css";
const OtherCard = ({ data }) => {
  console.log(data);
  return (
    <div className="card-background">
      <h1>{`Province Area: ${data.area_provinsi}`}</h1>
      <h2>{`City Area: ${data.area_kota}`}</h2>
      <h4>{`Commodity: ${data.komoditas}`}</h4>
      <h4>{`Parsed Date: ${data.tgl_parsed}`}</h4>
      <h4>{`Price in IDR: ${data.price}`}</h4>
      <h4>{`Price in USD: ${Math.round(data.USDPrice).toFixed(2)}`}</h4>
      <h4>{`UUID: ${data.uuid}`}</h4>
    </div>
  );
};

const AdminCard = ({ data }) => {
  console.log(data);
  return (
    <div className="card-background">
      <h1>{`Province Area: ${data.area_provinsi}`}</h1>
      <h2>{`City Area: ${data.area_kota}`}</h2>
      <h4>{`Commodity: ${data.komoditas}`}</h4>
      <h4>{`Parsed Date: ${data.tgl_parsed}`}</h4>
      <div className="admin-card-style">
        <h4>{`Price in IDR: ${data.price}`}</h4>
        <h4>{`Mean Price: ${Math.round(data.mean).toFixed(2)}`}</h4>
        <h4>{`Max Price: ${data.max}`}</h4>
        <h4>{`Min Price: ${data.min}`}</h4>
        <h4>{`Median Price: ${data.median}`}</h4>
        <h4>{`Data Batch: ${data.batch}`}</h4>
      </div>

      <h4>{`UUID: ${data.uuid}`}</h4>
    </div>
  );
};

export { OtherCard, AdminCard };
