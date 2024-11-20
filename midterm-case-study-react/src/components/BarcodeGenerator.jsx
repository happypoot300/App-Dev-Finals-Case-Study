import React from "react";
import { Container } from "react-bootstrap";
import Style from "../css modules/BarcodeGenerator.module.css";

export default function BarcodeGenerator(props) {
  return (
    <Container>
      <img
        className={Style.Img}
        alt="Barcode Generator TEC-IT"
        src={`https://barcode.tec-it.com/barcode.ashx?data=${props.data}&code=Code11`}
      />
    </Container>
  );
}
