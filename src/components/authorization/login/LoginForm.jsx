import React from 'react';
import {Alert, Button, Card, Form, InputGroup, Row, Spinner} from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import {useFormState} from "../../../react-hooks/useFormState";
import {Link} from "react-router-dom";

const LoginForm = ({handleLogin, loginLoading, loginError, handleClearErrors}) => {

    const signFormStyle = {
        width: "3em",
        display: "inline"
    };

    const [loginState, handleChange] = useFormState({
        email: '',
        password: ''
    }, loginError, handleClearErrors)

    const handleSubmit = (e) => {
        e.preventDefault()
        e.stopPropagation()
        handleLogin(loginState)
    }

    return (
        <Card body>
            <Container fluid>
                <Row>
                    <Col>
                        <Alert variant='danger' show={loginError}>Something went wrong!</Alert>
                    </Col>
                </Row>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="loginEmail">
                        <Form.Label>Email address</Form.Label>
                        <InputGroup>
                            <InputGroup.Prepend>
                                <InputGroup.Text id="inputGroupPrepend"
                                                 style={signFormStyle}>@</InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={loginState.email}
                                onChange={handleChange}
                                required
                            />
                            <Form.Control.Feedback type="invalid">Please enter your
                                email.</Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>

                    <Form.Group controlId="loginPassword">
                        <Form.Label>Password</Form.Label>
                        <InputGroup>
                            <InputGroup.Prepend>
                                <InputGroup.Text id="inputGroupPrepend"
                                                 style={signFormStyle}>*</InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control type="password"
                                          name="password"
                                          placeholder="Password"
                                          value={loginState.password}
                                          onChange={handleChange}
                                          required
                            />
                            <Form.Control.Feedback type="invalid">Please enter the
                                password.</Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>
                    <Row className="justify-content-center">
                        <div>
                            Need an account? Register <Link to='/register'>here.</Link>
                        </div>
                    </Row>
                    <Row className="justify-content-center">
                        <Col md={6}>
                            <Button id="signIn"
                                    variant="info"
                                    type="submit"
                                    disabled={loginLoading}
                                    style={{marginTop: "1em"}}
                                    block>
                                {!loginLoading && <div>Sign in</div>}
                                {loginLoading && <Spinner animation='border' size='sm'/>}
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Container>
        </Card>
    );
};

export default LoginForm;