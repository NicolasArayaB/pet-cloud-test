import React from "react";
import { Container, Col, Row } from "react-bootstrap";
import CardInfo from "../component/services/cardServices";
import CardInfoVet from "../component/services/cardServicesVet";
import "../../styles/services.scss";

function ServicesMain() {
	return (
		<section className="pt-2 justify-content-center">
			<Container fluid>
				<Row>
					<Col>
						<h1 className="my-5">Servicios</h1>
					</Col>
				</Row>
				<Row>
					<Col className="pt-1 order-xs-1">
						<h2 className="my-3 p-5">¿Eres dueño de mascota?</h2>
						<CardInfo />
					</Col>
				</Row>
				<Row className="mt-2 pb-5">
					<Col className="pt-3">
						<h2 className="my-3 p-5">¿Eres médico veterinario?</h2>
						<CardInfoVet />
					</Col>
				</Row>
			</Container>
		</section>
	);
}

export default ServicesMain;
