import React from 'react';
import LoginForm from './LoginForm.jsx';
import {Col, Container, Row} from 'react-bootstrap';
import {connect} from "react-redux";
import {clearLoginErrors, doLoginRequest} from "./actions";
import {Redirect} from "react-router-dom";

const mapStateToProps = state => {
    return {
        authorized: state.loginState.authorized,
        loading: state.loginState.loading,
        error: state.loginState.error
    }
};

const mapDispatchToProps = dispatch => {
    return {
        handleLogin: loginDTO => dispatch(doLoginRequest(loginDTO)),
        handleClearErrors: () => dispatch({type: clearLoginErrors})
    }
};

const Login = ({authorized, loading, error, handleClearErrors, handleLogin}) => {
    return (
        authorized ? <Redirect to={"/feed"}/> :
            <Container>
                <Row className="justify-content-center" style={{margin: "10em 0em 10em 0em"}}>
                    <Col lg={6}>
                        <LoginForm handleLogin={handleLogin} loginLoading={loading} loginError={error}
                                   handleClearErrors={handleClearErrors}/>
                    </Col>
                </Row>
            </Container>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);