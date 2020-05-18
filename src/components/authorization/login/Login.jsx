import React from 'react';
import LoginForm from './LoginForm.jsx';
import {Col, Container, Row} from 'react-bootstrap';
import {connect} from "react-redux";
import {doLoginRequest, componentName} from "../../../state/application/login/loginActions";
import {loadingPicker, errorPicker, clearErrorPicker} from "../../../state/request/requestActions";
import {Redirect} from "react-router-dom";

const mapStateToProps = state => {
    return {
        authorized: state.loginState.authorized,
        loading: loadingPicker(state, componentName),
        error: errorPicker(state, componentName),
    }
};

const mapDispatchToProps = dispatch => {
    return {
        handleLogin: loginDTO => dispatch(doLoginRequest(loginDTO)),
        handleClearErrors: clearErrorPicker(dispatch, componentName)
    }
};

const Login = ({authorized, loading, error, handleClearErrors, handleLogin}) => {
    const handleClearErrorWithCheck = () => {
        if(error) {
            handleClearErrors()
        }
    }
    return (
        authorized ? <Redirect to={"/feed"}/> :
            <Container>
                <Row className="justify-content-center" style={{margin: "10em 0em 10em 0em"}}>
                    <Col lg={6}>
                        <LoginForm handleLogin={handleLogin} loginLoading={loading} loginError={error}
                                   handleClearErrors={handleClearErrorWithCheck}/>
                    </Col>
                </Row>
            </Container>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);