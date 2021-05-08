import React, { useContext, useState } from "react";
import { Modal, Form, Container, Row, Col, Button } from "react-bootstrap";
import Swal from "sweetalert2";
import { Link, useHistory } from "react-router-dom";
import { Context } from "../../store/appContext";

const LoginModal = params => {
	const { actions } = useContext(Context);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const history = useHistory();

	const ShowAlert = Swal.mixin({
		toast: true,
		position: "bottom",
		showConfirmButton: true,
		confirmButtonColor: "#EEAA7B",
		cancelButtonText: "Ok",
		timer: 4000,
		timerProgressBar: true,
		didOpen: toast => {
			toast.addEventListener("mouseenter", Swal.stopTimer);
			toast.addEventListener("mouseleave", Swal.resumeTimer);
		}
	});

	const submitHandler = async e => {
		e.preventDefault();
		params.close();

		await actions.setLogin(
			{
				email: email,
				password: password
			},
			history,
			ShowAlert
		);
	};

	return (
		<Modal show={params.show} onHide={params.close}>
			<Modal.Header closeButton>
				<Modal.Title style={{ color: "white" }}>Login</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form autoComplete="off" onSubmit={e => submitHandler(e)}>
					<Form.Control
						value={email}
						onChange={e => setEmail(e.target.value)}
						type="email"
						placeholder="Ingresa tu e-mail"
						className="mb-2"
					/>
					<Form.Group>
						<Form.Control
							value={password}
							onChange={e => setPassword(e.target.value)}
							type="password"
							placeholder="Ingresa tu contraseña"
						/>
						<Form.Text>La contraseña debe tener entre 6 a 8 caracteres</Form.Text>
					</Form.Group>
					<Link to="/pass" onClick={params.close}>
						¿Olvidaste tu contraseña?
					</Link>
					<hr />
					<Container>
						<Row>
							<Col align="center">
								<Button type="submit" className="petBtn">
									Login
								</Button>
							</Col>
						</Row>
					</Container>
				</Form>
			</Modal.Body>
		</Modal>
	);
};

export default LoginModal;
