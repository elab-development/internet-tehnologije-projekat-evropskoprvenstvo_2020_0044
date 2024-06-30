import React, {useState} from 'react';
import Naslov from "../komponente/Naslov";
import {Button, Col, Form, Row} from "react-bootstrap";
import useForm from "../useForm";
import axiosInstanca from "../axiosInstanca";

const Login = () => {
    const [poruka, setPoruka] = useState('');
    const [pokaziRegistracju, setPokaziRegistracju] = useState(false);

    const {formData, handleChange} = useForm({
        email: '',
        password: '',
        name: ''
    });

    const login = () => {
        axiosInstanca.post('/login', {
            email: formData.email,
            password: formData.password
        })
            .then(res => {
                console.log(res.data);
                if (res.data.success === true) {
                    window.sessionStorage.setItem('token', res.data.data.token);
                    window.sessionStorage.setItem('user', JSON.stringify(res.data.data.user));
                    window.location.href = '/';
                }else{
                    setPoruka('Greska prilikom logovanja');
                }
            })
            .catch(err => {
                console.log(err);
                setPoruka('Greska prilikom logovanja');
            });
    }

    const register = () => {
        axiosInstanca.post('/register', {
            email: formData.email,
            password: formData.password,
            name: formData.name
        })
            .then(res => {
                console.log(res.data);
                if (res.data.success === true) {
                    setPoruka('Uspesno ste se registrovali, sada se mozete ulogovati')
                }else{
                    setPoruka('Greska prilikom registracije');
                }
            })
            .catch(err => {
                console.log(err);
                setPoruka('Greska prilikom registracije');
            });
    }

    return (
        <>
            <Naslov naslov="Login/Register forma" podnaslov={poruka} />

            <Row>
                {
                    !pokaziRegistracju && (
                        <Col>
                            <Form>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Email adresa</Form.Label>
                                    <Form.Control name="email" onChange={handleChange} type="email" placeholder="Unesite email" />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control name="password" onChange={handleChange} type="password" placeholder="Password" />
                                </Form.Group>
                                <a href="#" onClick={() => {setPokaziRegistracju(!pokaziRegistracju)}}>Nemate nalog</a>
                                <hr />
                                <Button onClick={login} variant="dark" type="button">
                                    Login
                                </Button>
                            </Form>
                        </Col>
                    )
                }

                {
                    pokaziRegistracju && (
                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicName">
                                <Form.Label>Ime i prezime</Form.Label>
                                <Form.Control name="name" onChange={handleChange} type="email" placeholder="Unesite email" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicEmail1">
                                <Form.Label>Email adresa</Form.Label>
                                <Form.Control name="email" onChange={handleChange} type="email" placeholder="Unesite email" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword1">
                                <Form.Label>Password</Form.Label>
                                <Form.Control name="password" onChange={handleChange} type="password" placeholder="Password" />
                            </Form.Group>
                            <a href="#" onClick={() => {setPokaziRegistracju(!pokaziRegistracju)}}>Ipak imate nalog, ulogujte se</a>
                            <hr />
                            <Button onClick={register} variant="dark" type="button">
                                Registruj se
                            </Button>
                        </Form>
                    )
                }
            </Row>

        </>
    );
};

export default Login;