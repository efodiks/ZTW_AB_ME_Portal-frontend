import React from 'react';
import RegistrationForm from './RegistrationForm.jsx';
import {Row, Col, Container} from 'react-bootstrap';
import {actionClearErrors, doRegister} from "./actions";
import {connect} from "react-redux";

const mapStateToProps = state => {
    return {
        loading: state.registrationState.loading,
        error: state.registrationState.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        handleRegister: userDto => dispatch(doRegister(userDto)),
        handleClearErrors: () => dispatch({
            type: actionClearErrors
        })
    }
};

const Registration = ({loading, error, handleRegister, handleClearErrors}) => {
    return (
        <Container>
            <Row className="justify-content-center" style={{margin: "10em 0em 10em 0em"}}>
                <Col lg={6}>
                    <RegistrationForm loading={loading} error={error} handleRegister={handleRegister} handleClearErrors={handleClearErrors}/>
                </Col>
            </Row>
        </Container>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(Registration);