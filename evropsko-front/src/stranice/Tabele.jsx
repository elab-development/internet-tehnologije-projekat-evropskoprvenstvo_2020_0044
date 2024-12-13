import React, {useEffect} from 'react';
import Naslov from "../komponente/Naslov";
import {Row, Table} from "react-bootstrap";

import axiosInstanca from "../axiosInstanca";

const Tabele = () => {

    const [podaci, setPodaci] = React.useState([]);
    const [filtriraniPodaci, setFiltriraniPodaci] = React.useState([]);

    const grupe = ['A', 'B', 'C', 'D', 'E', 'F'];
    const [grupa, setGrupa] = React.useState('A');

    useEffect(() => {
        axiosInstanca.get('/tabela')
            .then(res => {
                console.log(res.data);
                setPodaci(res.data.data);
                setFiltriraniPodaci(res.data.data.filter(red => red.grupa === grupa));
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    return (
        <>
            <Naslov naslov="Tabela u grupnoj fazi" podnaslov="Ovo su tabele grupne faze Evropskog prvenstva u fudbalu 2024."/>
            <Row>
                <select className="form-control m-3" onChange={(e) => {
                    setGrupa(e.target.value);
                    setFiltriraniPodaci(podaci.filter(red => red.grupa === e.target.value));
                }}>
                    {
                        grupe.map((grupa, index) => (
                            <option key={index} value={grupa}>{grupa}</option>
                        ))
                    }
                </select>
            </Row>
            <Row>
                <Table hover>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Drzava</th>
                        <th>Grupa</th>
                        <th>Odigrano</th>
                        <th>Pobeda</th>
                        <th>Nereseno</th>
                        <th>Izgubljeno</th>
                        <th>Postignuti golovi</th>
                        <th>Primljeni golovi</th>
                        <th>Gol razlika</th>
                        <th>Bodovi</th>
                    </tr>
                    </thead>
                    <tbody>

                    {
                        filtriraniPodaci && filtriraniPodaci.map((red, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{red.drzava}</td>
                                <td>{red.grupa}</td>
                                <td>{red.odigranih}</td>
                                <td>{red.pobeda}</td>
                                <td>{red.nereseno}</td>
                                <td>{red.poraza}</td>
                                <td>{red.golova}</td>
                                <td>{red.primljenih}</td>
                                <td>{red.golRazlika}</td>
                                <td>{red.bodova}</td>
                            </tr>
                        ))
                    }
                    </tbody>
                </Table>
            </Row>
        </>
    );
};

export default Tabele;