import React, {useEffect} from "react";
import {Container, Spinner} from "react-bootstrap";
import Row from "react-bootstrap/Row";

const LoaderHoc = ({
                       name,
                       loading,
                       Component,
                       loadData,
                       ...rest
                   }) => {

    useEffect(loadData, [])

    if (loading) {
        return (
            <Container style={{"marginTop": 4}}>
                <Row className="justify-content-center">
                    <Spinner animation="border"/>
                </Row>
                <Row className="justify-content-center">
                    Loading {name}...
                </Row>
            </Container>
        )
    } else return (
        <Component {...rest} />
    )
};

export default LoaderHoc;