import React, {useEffect} from 'react';
import Naslov from "../komponente/Naslov";
import {Col, Form, FormGroup, Row, Table} from "react-bootstrap";
import axiosInstanca from "../axiosInstanca";
import useForm from "../useForm";
import drzave from "./Drzave";
import {Chart} from "react-google-charts";

const Admin = () => {
    const [poruka, setPoruka] = React.useState('');
    const [url, setUrl] = React.useState('/paginacija');
    const [rezultati, setRezultati] = React.useState([]);
    const [links, setLinks] = React.useState([]);
    const [drzave, setDrzave] = React.useState([]);
    const [tipoviRezultata, setTipoviRezultata] = React.useState([]);
    const [grafikPodaci, setGrafikPodaci] = React.useState([]);

    const user = JSON.parse(window.sessionStorage.getItem('user'));

    const {formData, handleChange} = useForm({
        drzava_domacin_id: '',
        drzava_gost_id: '',
        golova_domacin: '',
        golova_gost: '',
        tip_rezultata_id: ''
    });

    useEffect(() => {
        axiosInstanca.get('/grafik')
            .then(res => {
                console.log(res.data);
                let podaci = [['Drzava', 'Broj golova']];
                res.data.data.forEach(red => {
                    podaci.push([red.drzava, parseInt(red.golova)]);
                });
                setGrafikPodaci(podaci);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

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
        axiosInstanca.get('/drzave')
            .then(res => {
                console.log(res.data);
                setDrzave(res.data.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);


    useEffect(() => {
        axiosInstanca.get(url)
            .then(res => {
                console.log(res.data);
                setRezultati(res.data.data.data);
                if (links !== []) {
                    setLinks(res.data.data.links);
                }
            })
            .catch(err => {
                console.log(err);
            });
    }, [url]);

    const obrisiRezultat = (id) => {
        axiosInstanca.delete('/rezultati/' + id)
            .then(res => {
                console.log(res.data);
                setPoruka('Uspesno obrisan rezultat');
                setUrl('/paginacija');
            })
            .catch(err => {
                console.log(err);
                setPoruka('Greska prilikom brisanja rezultata');
            });
    }

    const unesi = () => {
        axiosInstanca.post('/rezultati', {
            drzava_domacin_id: formData.drzava_domacin_id,
            drzava_gost_id: formData.drzava_gost_id,
            golova_domacin: formData.golova_domacin,
            golova_gost: formData.golova_gost,
            tip_rezultata_id: formData.tip_rezultata_id,
            user_id: user.id
        })
            .then(res => {
                console.log(res.data);
                setPoruka('Uspesno unet rezultat');
                setUrl('/paginacija');
            })
            .catch(err => {
                console.log(err);
                setPoruka('Greska prilikom unosa rezultata');
            });
    }

    return (
        <>
            <Naslov naslov="Administracija" podnaslov={poruka} />

            <Row>
                <Table hover >
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Domacin</th>
                        <th>Gost</th>
                        <th>Rezultat</th>
                        <th>Akcije</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        rezultati && rezultati.map((rezultat, index) => (
                            <tr key={index}>
                                <td>{rezultat.id}</td>
                                <td>{ drzave.find(
                                    drzava => drzava.id === rezultat.drzava_domacin_id
                                ).nazivDrzave}</td>

                                <td>{
                                    drzave.find(
                                        drzava => drzava.id === rezultat.drzava_gost_id
                                    ).nazivDrzave
                                }</td>
                                <td>{rezultat.golova_domacin} : {rezultat.golova_gost}</td>
                                <td>
                                    <button className="btn btn-danger" onClick={() => {
                                        obrisiRezultat(rezultat.id);
                                    }}>Obrisi</button>
                                </td>
                            </tr>
                        ))
                    }
                    </tbody>
                </Table>
            </Row>

                {
                    links && links.map((link, index) => (
                            <button key={index} className="btn btn-dark m-2" onClick={() => {
                                setUrl(link.url);
                            }}>{link.label}</button>
                    ))
                }

                <Row className="mt-3">
                        <Form.Group className="mb-3" controlId="formDomacin">
                            <Form.Label>Domacin</Form.Label>
                            <select name="drzava_domacin_id" onChange={handleChange} className="form-control">
                                {
                                    drzave && drzave.map((drzava, index) => (
                                        <option key={index} value={drzava.id}>{drzava.nazivDrzave}</option>
                                    ))
                                }
                            </select>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formDomacin">
                            <Form.Label>Gost</Form.Label>
                            <select name="drzava_gost_id" onChange={handleChange} className="form-control">
                                {
                                    drzave && drzave.map((drzava, index) => (
                                        <option key={index} value={drzava.id}>{drzava.nazivDrzave}</option>
                                    ))
                                }
                            </select>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formDomacin">
                            <Form.Label>Golova Domacin</Form.Label>
                            <Form.Control name="golova_domacin" onChange={handleChange} type="number" placeholder="Unesite golove domacina" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formDomacin">
                            <Form.Label>Golova Gost</Form.Label>
                            <Form.Control name="golova_gost" onChange={handleChange} type="number" placeholder="Unesite golove gosta" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formDomacin">
                            <Form.Label>Tip rezultata</Form.Label>
                            <select name="tip_rezultata_id" onChange={handleChange} className="form-control">
                                {
                                    tipoviRezultata && tipoviRezultata.map((tip, index) => (
                                        <option key={index} value={tip.id}>{tip.nazivTipa}</option>
                                    ))
                                }
                            </select>
                        </Form.Group>
                        <hr/>
                        <button className="btn btn-dark" role="button" onClick={unesi} >Unesi rezultat</button>
                </Row>
            <Row>
                <Chart
                    chartType="PieChart"
                    width="100%"
                    height="800px"
                    data={grafikPodaci}
                    options={{
                        title: 'Broj golova po drzavi',
                        pieHole: 0.1,
                        is3D: false,
                    }}
                />
            </Row>


        </>
    );
}

export default Admin;