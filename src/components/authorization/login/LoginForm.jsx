import React from 'react';
import {Button, Card, Form, InputGroup, Spinner} from "react-bootstrap";
import * as yup from 'yup'
import {Formik} from 'formik'

const LoginForm = ({handleLogin, loginLoading, handleRegisterLink}) => {

    const signFormStyle = {
        width: "3em",
        display: "inline"
    };

    const schema = yup.object().shape({
        email: yup.string().email().required("Email required"),
        password: yup.string().required("Password required")
    })

    return (
        <Card body>
            <Formik
                validationSchema={schema}
                onSubmit={handleLogin}
                initialValues={{
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
                  }) => (
                    <Form noValidate style={{padding: "2em"}} onSubmit={handleSubmit}>
                        <Form.Group controlId="loginEmail">
                            <Form.Label>Email address</Form.Label>
                            <InputGroup>
                                <InputGroup.Prepend>
                                    <InputGroup.Text id="inputGroupPrepend" style={signFormStyle}>@</InputGroup.Text>
                                </InputGroup.Prepend>
                                <Form.Control
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    value={values.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isInvalid={errors.email && touched.email}/>
                                <Form.Control.Feedback type="invalid">Please enter your email.</Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>

                        <Form.Group controlId="loginPassword">
                            <Form.Label>Password</Form.Label>
                            <InputGroup>
                                <InputGroup.Prepend>
                                    <InputGroup.Text id="inputGroupPrepend" style={signFormStyle}>*</InputGroup.Text>
                                </InputGroup.Prepend>
                                <Form.Control type="password"
                                              name="password"
                                              placeholder="Password"
                                              value={values.password}
                                              onChange={handleChange}
                                              onBlur={handleBlur}
                                              isInvalid={errors.password && touched.password}/>
                                <Form.Control.Feedback type="invalid">Please enter the password.</Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>

                        <div className="d-flex justify-content-center">
                            <Button id="register" variant="info" onClick={handleRegisterLink}
                                    style={{width: "30%", margin: "1em"}}>
                                Register
                            </Button>

                            <Button id="signIn" variant="info" type="submit" disabled={loginLoading} style={{width: "30%", margin: "1em"}}>
                                {!loginLoading && <div>Sign in</div>}
                                {loginLoading && <Spinner animation='border' size='sm'/>}
                            </Button>
                        </div>
                    </Form>
                )
                }
            </Formik>
        </Card>
    );
};

export default LoginForm;