import React, {useEffect} from 'react';
import Naslov from "../komponente/Naslov";
import {Row, Table} from "react-bootstrap";
import axiosInstanca from "../axiosInstanca";
import {CSVLink} from "react-csv";

const Utakmice = () => {

    const [tipoviRezultata, setTipoviRezultata] = React.useState([]);
    const [izabraniTipRezultata, setIzabraniTipRezultata] = React.useState(null);
    const [rezultati, setRezultati] = React.useState([]);
    const [csvData, setCsvData] = React.useState([]);
    const headers = [
        {label: 'Domacin', key: 'domacin'},
        {label: 'Gost', key: 'gost'},
        {label: 'Rezultat', key: 'rezultat'},
        {label: 'Datum utakmice', key: 'datum_utakmice'},
    ];

    useEffect(() => {
        axiosInstanca.get('/tipovi-rezultata')
            .then(res => {
                console.log(res.data);

                setTipoviRezultata(res.data.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);


    useEffect(() => {
        if (izabraniTipRezultata) {
            axiosInstanca.get('/pretraga-po-tipu/' + izabraniTipRezultata)
                .then(res => {
                    console.log(res.data);
                    let podaci = res.data.data;

                    let csvPodaci = [];
                    podaci.forEach(podatak => {
                        csvPodaci.push({
                            domacin: podatak.domacin.nazivDrzave,
                            gost: podatak.gost.nazivDrzave,
                            rezultat: podatak.golova_domacin + ' : ' + podatak.golova_gost,
                            datum_utakmice: podatak.datum_utakmice
                        });
                    })
                    setRezultati(podaci);

                    setCsvData(csvPodaci);
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }, [izabraniTipRezultata]);

    return (
        <>
           <Naslov naslov="Rezultati" podnaslov="Pretrazite rezultate po fazama takmicenja." />

            <Row>
                <select onChange={(e) => {
                    setIzabraniTipRezultata(e.target.value)
                }} className="form-control m-3">
                    {
                        tipoviRezultata && tipoviRezultata.map((tip, index) => (
                            <option key={index} value={tip.id}>{tip.nazivTipa}</option>
                        ))
                    }
                </select>
            </Row>

            <Row>
                <Table hover>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Domacin</th>
                        <th>Gost</th>
                        <th>Rezultat</th>
                        <th>Datum utakmice</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        rezultati && rezultati.map((rezultat, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{rezultat.domacin.nazivDrzave}</td>
                                <td>{rezultat.gost.nazivDrzave}</td>
                                <td>{rezultat.golova_domacin} : {rezultat.golova_gost}</td>
                                <td>{rezultat.datum_utakmice}</td>
                            </tr>
                        ))
                    }
                    </tbody>
                </Table>
            </Row>

            <Row>
                {
                    csvData &&  <CSVLink data={csvData} headers={headers} filename={"my-file.csv"}
                                         className="btn btn-dark"
                                         target="_blank">
                        Preuzmite podatke u csv formatu
                    </CSVLink>
                }
            </Row>
        </>
    );
};

export default Utakmice;