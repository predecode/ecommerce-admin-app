import React, { useState } from "react";
import Layout from "../../components/layout";
import { Row, Col, Container, Form, Button } from "react-bootstrap";
import Input from "../../components/UI/input";
import { Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../../actions";

const Signup = (props) => {
  const auth = useSelector((state) => state.auth);

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const signUp = (e) => {
    e.preventDefault();
    dispatch(signup(user));
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUser({ ...user, [name]: value });
  };

  if (auth.authenticate) {
    return <Redirect to={`/`} />;
  }

  if (auth.loading) {
    return <div>Loading.....</div>;
  }

  return (
    <Layout>
      <Container>
        <Row style={{ marginTop: "50px" }}>
          <Col md={{ span: 6, offset: 3 }}>
            <Form onSubmit={signUp}>
              <Row>
                <Col md={{ span: 6 }}>
                  <Input
                    controlId="firstName"
                    label="First Name"
                    value={user.firstName}
                    type="text"
                    placeholder="First Name"
                    name="firstName"
                    onChange={handleChange}
                  />
                </Col>
                <Col md={{ span: 6 }}>
                  <Input
                    controlId="lastName"
                    label="Last Name"
                    value={user.lastName}
                    type="text"
                    placeholder="Last Name"
                    name="lastName"
                    onChange={handleChange}
                  />
                </Col>
              </Row>
              <Input
                controlId="email"
                label="Email"
                value={user.email}
                type="email"
                placeholder="Enter email"
                name="email"
                errorMessage="We'll never share your email with anyone else."
                onChange={handleChange}
              />

              <Input
                controlId="password"
                label="Password"
                value={user.password}
                type="password"
                placeholder="Password"
                name="password"
                onChange={handleChange}
              />

              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default Signup;
