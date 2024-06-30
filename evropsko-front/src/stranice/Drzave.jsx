import React, {useEffect, useState} from 'react';
import Naslov from "../komponente/Naslov";
import axiosInstanca from "../axiosInstanca";
import {Col, Row} from "react-bootstrap";
import Drzava from "../komponente/Drzava";

const Drzave = () => {

    const [drzave, setDrzave] = useState([]);

    useEffect(() => {
        axiosInstanca.get('/drzave')
            .then(res => {
                console.log(res.data);
                setDrzave(res.data.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);


    return (
        <>
            <Naslov naslov="Drzave ucesnice prvenstva" podnaslov="Ovo su drzave koje ucestvuju na Evropskom prvenstvu u fudbalu 2024."/>

            <Row>
                {drzave && drzave.map(drzava => (
                    <Col className="mt-2" md={3} key={drzava.id}>
                        <Drzava drzava={drzava} />
                    </Col>
                ))}
            </Row>

        </>
    );
};

export default Drzave;