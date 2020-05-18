import React from 'react';
import {Form, Button, InputGroup, Card, Container, Row, Spinner, Alert} from "react-bootstrap";
import {Formik} from "formik";
import * as yup from "yup";
import {Link} from "react-router-dom";
import Col from "react-bootstrap/Col";

const RegistrationForm = ({loading, error, handleRegister, handleClearErrors}) => {

    const signFormStyle = {
        width: "3em",
        display: "inline"
    };

    const schema = yup.object().shape({
        username: yup.string().required("Username required"),
        email: yup.string().email().required("Email required"),
        password: yup.string().required("Password required")
    })

    return (
        <Card body>
            <Container fluid>
                <Row>
                    <Col>
                        <Alert variant='danger' show={error}>Something went wrong!</Alert>
                    </Col>
                </Row>
                <Formik
                    validationSchema={schema}
                    onSubmit={handleRegister}
                    initialValues={{
                        username: '',
                        email: '',
                        password: ''
                    }}
                >
                    {({
                          handleSubmit,
                          handleChange,
                          handleBlur,
                          values,
                          touched,
                          _,
                          errors
                      }) => {
                        const handleChangeWithErrors = e => {
                            if(error) handleClearErrors()
                            return handleChange(e)
                        }
                        return (
                            <Form noValidate onSubmit={handleSubmit}>
                                <Form.Group controlId="registrationUsername">
                                    <Form.Label>Username</Form.Label>
                                    <InputGroup>
                                        <InputGroup.Prepend>
                                            <InputGroup.Text id="inputGroupPrepend"
                                                             style={signFormStyle}>#</InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <Form.Control type="text"
                                                      placeholder="Username"
                                                      name="username"
                                                      value={values.username}
                                                      onChange={handleChangeWithErrors}
                                                      onBlur={handleBlur}
                                                      isInvalid={touched.username && errors.username}
                                        />
                                        <Form.Control.Feedback type="invalid">Please choose a
                                            username.</Form.Control.Feedback>
                                    </InputGroup>
                                </Form.Group>
                                <Form.Group controlId="registrationEmail">
                                    <Form.Label>Email address</Form.Label>
                                    <InputGroup>
                                        <InputGroup.Prepend>
                                            <InputGroup.Text id="inputGroupPrepend"
                                                             style={signFormStyle}>@</InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <Form.Control type="email"
                                                      placeholder="Email address"
                                                      name="email"
                                                      value={values.email}
                                                      onChange={handleChangeWithErrors}
                                                      onBlur={handleBlur}
                                                      isInvalid={touched.email && errors.email}
                                        />
                                        <Form.Control.Feedback type="invalid">Please enter your
                                            email.</Form.Control.Feedback>
                                    </InputGroup>
                                </Form.Group>

                                <Form.Group controlId="registrationPassword">
                                    <Form.Label>Password</Form.Label>
                                    <InputGroup>
                                        <InputGroup.Prepend>
                                            <InputGroup.Text id="inputGroupPrepend"
                                                             style={signFormStyle}>*</InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <Form.Control type="password"
                                                      placeholder="Password"
                                                      name="password"
                                                      value={values.password}
                                                      onChange={handleChangeWithErrors}
                                                      onBlur={handleBlur}
                                                      isInvalid={touched.password && errors.password}
                                        />
                                        <Form.Control.Feedback type="invalid">Please enter the
                                            password.</Form.Control.Feedback>
                                    </InputGroup>
                                </Form.Group>
                                <Row className="justify-content-center">
                                    <div>
                                        Already have an account? Sign in <Link to='/'>here.</Link>
                                    </div>
                                </Row>
                                <Row className="justify-content-center">
                                    <Col md={6}>
                                        <Button id="signUp"
                                                variant="info"
                                                type="submit"
                                                disabled={loading}
                                                style={{marginTop: "1em"}}
                                                block>
                                            {!loading && <div>Sign up</div>}
                                            {loading && <Spinner animation='border' size='sm'/>}
                                        </Button>
                                    </Col>
                                </Row>
                            </Form>
                        )
                    }
                    }
                </Formik>
            </Container>
        </Card>
    );
};

export default RegistrationForm;