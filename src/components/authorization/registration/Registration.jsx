import React from 'react';
import RegistrationForm from './RegistrationForm.jsx';
import {Row, Col, Container} from 'react-bootstrap';
import {doRegister, registerComponent} from "../../../state/application/register/registerActions";
import {loadingPicker, errorPicker, clearErrorPicker} from "../../../state/request/requestActions";
import {connect} from "react-redux";

const mapStateToProps = state => {
    return {
        loading: loadingPicker(state, registerComponent),
        error: errorPicker(state, registerComponent)
    }
}

const mapDispatchToProps = dispatch => {
    return {
        handleRegister: userDto => dispatch(doRegister(userDto)),
        handleClearErrors: clearErrorPicker(dispatch, registerComponent)
    }
};

const Registration = ({loading, error, handleRegister, handleClearErrors}) => {
    return (
        <Container>
            <Row className="justify-content-center" style={{margin: "10em 0em 10em 0em"}}>
                <Col lg={6}>
                    <RegistrationForm loading={loading}
                                      error={error}
                                      handleRegister={handleRegister}
                                      handleClearErrors={handleClearErrors}/>
                </Col>
            </Row>
        </Container>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(Registration);