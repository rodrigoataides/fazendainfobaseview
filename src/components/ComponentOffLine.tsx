import React, { useEffect, useState } from "react";
import { Card, Col, Row, Spin } from "antd";

export const ComponentOffLine = () => {
  return (
    <Row style={{ paddingInline: "20%" }}>
      <Col>
        <Row style={{ display: "flex", justifyContent: "center" }}>
          <img src={"/img/LOGO TELA LOGIN.png"} />
        </Row>
        <Card style={{ marginTop: 20 }}>
          <Row
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Row style={{ fontSize: "1.5em" }}>
              Informamos que esta funcionalidade está temporariamente off-line.
            </Row>
            <Row style={{ fontSize: "1.5em" }}>
              Por favor tente mais tarde, se o problema persistir procure o
              suporte.
            </Row>
          </Row>
        </Card>
      </Col>
    </Row>
  );
};

export default ComponentOffLine;
