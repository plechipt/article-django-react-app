import React from "react";
import { Container, Header } from "semantic-ui-react";

import "./Support.css";

const SupportSuccess = () => {
  return (
    <div className="support-container">
      <Container className="">
        <Header className="support-header">Thank You!</Header>
        <p className="text-muted support-text">
          We really appreciate your help!
        </p>
        <a className="support-home" href="/posts">
          Home
        </a>
      </Container>
    </div>
  );
};

export default SupportSuccess;
