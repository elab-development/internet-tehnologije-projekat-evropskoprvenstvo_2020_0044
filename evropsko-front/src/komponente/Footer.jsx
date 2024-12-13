import React from 'react';
import {Row} from "react-bootstrap";
import {FaHeart} from "react-icons/fa";

const Footer = () => {
    return (
        <>
            <Row className="footer mt-3">
                <p className="text-center align-content-center">Kreirano sa <FaHeart /> od Jovane i Nikole</p>
            </Row>
        </>
    );
};

export default Footer;