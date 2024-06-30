import React from 'react';
import PropTypes from 'prop-types';
import {Alert} from "react-bootstrap";

const Naslov = props => {
    const {naslov, podnaslov} = props;
    return (
        <>
            <Alert variant="light" className="mt-3 text-center">
                <Alert.Heading>{naslov}</Alert.Heading>
                <p>
                    {podnaslov}
                </p>
            </Alert>
        </>
    );
};

Naslov.propTypes = {
    naslov: PropTypes.string.isRequired,
    podnaslov: PropTypes.string.isRequired
};

export default Naslov;