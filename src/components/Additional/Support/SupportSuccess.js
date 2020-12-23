import React from "react";
import { Link } from "react-router-dom";
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
        <Link to="/posts" className="support-home">
          Home
        </Link>
      </Container>
    </div>
  );
};

export default SupportSuccess;
