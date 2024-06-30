import React from 'react';
import Naslov from "../komponente/Naslov";
import {Col, Row} from "react-bootstrap";
import logo from "../slike/logo.png";
import axiosInstanca from "../axiosInstanca";

const Home = () => {

    const izjave = [
        {
            tekst: 'Ovo je najbolje prvenstvo ikada. Sve utakmice su neizvesne, golovi padaju kao kisa, a atmosfera je fenomenalna.'
        },
        {
            tekst: 'Mislim da nasa drzava nije ispunila ocekivanja. Ocekivao sam vise od nase reprezentacije.'
        }
    ];

    const [navijaci, setNavijaci] = React.useState([]);

    React.useEffect(() => {
        axiosInstanca.get('https://randomuser.me/api/?results=2')
            .then(res => {
                console.log(res.data.results);
                let podaci = res.data.results.map((rezultat, index) => {
                    return {
                        ime: rezultat.name.first + ' ' + rezultat.name.last,
                        godine: rezultat.dob.age,
                        slika: rezultat.picture.large,
                        izjava: izjave[index].tekst
                    }
                })
                setNavijaci(podaci);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);
    return (
        <>
            <Naslov naslov="Dobrodosli" podnaslov="Ovo je pocetna stranica sajta za Evropsko prvenstvo u fudbalu 2024."/>
            <Row className="mt-3">
                <Col md={3} xs={12}>
                    <img src={logo} alt="logo" className="img-responsive" />
                </Col>
                <Col md={9} xs={12}>
                    <h3 className="text-center">Evropsko prvenstvo 2024</h3>
                    <p>
                        Ovo je sajt za praćenje Evropskog prvenstva u fudbalu 2024. godine.
                        Na sajtu možete pratiti rezultate, tabele, statistike, kao i informacije o državama učesnicama.
                        Ukoliko želite da postanete admin i unosite rezultate, registrujte se i prijavite.
                        Ukoliko ne, samo se prijavite i pratite dešavanja.
                    </p>
                </Col>
            </Row>
            <Row>
                <Col md={12}>
                    <h1 className="text-center">Izjave navijaca</h1>
                </Col>
                {
                    navijaci && navijaci.map((navijac, index) => (
                        <Col key={index} md={6}>
                            <h3>{navijac.ime} {navijac.godine} godina</h3>
                            <img src={navijac.slika} alt="slika" className="img-responsive" />
                            <p>
                                {navijac.izjava}
                            </p>
                        </Col>
                    ))
                }
            </Row>
        </>
    );
};

export default Home;