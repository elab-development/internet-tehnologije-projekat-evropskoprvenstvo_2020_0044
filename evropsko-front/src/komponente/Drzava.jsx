import React from 'react';
import PropTypes from 'prop-types';
import {Card} from "react-bootstrap";

const Drzava = props => {
    const {drzava} = props;
    return (
        <>
            <Card>
                <Card.Img variant="top" src={drzava.grb} />
                <Card.Body>
                    <Card.Title>{drzava.nazivDrzave}</Card.Title>
                    <Card.Text>
                        Grupa {drzava.grupa.nazivGrupe}
                    </Card.Text>
                </Card.Body>
            </Card>
        </>
    );
};

Drzava.propTypes = {
    drzava: PropTypes.object.isRequired
};

export default Drzava;