import React, { useContext, useEffect } from "react";
import { Container, Row, Col, ListGroup, ListGroupItem, Form, Image, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import { Context } from "../../store/appContext";

export const PetInformation = props => {
	const { store, actions } = useContext(Context);
	const history = useHistory();

	const chip = props.location.state.chip_identifier;
	const id = props.location.state.id;

	const cloudName = "pet-cloud-img";
	const uploadPreset = "fffnsmp9";

	const myWidget = cloudinary.createUploadWidget(
		{
			cloudName,
			uploadPreset
			// sources: ['local', 'url']
		},
		(error, result) => {
			if (!error && result && result.event === "success") {
				console.log(`Done! Here is the image info: ${JSON.stringify(result.info)}`);
				actions.imgUpload(result.info.url, id);
				history.go();
			}
		}
	);

	const handleClick = () => {
		myWidget.open();
	};

	useEffect(() => {
		actions.getPetById(chip);
		actions.getPetCloudById(id);
	}, []);

	return (
		<Container>
			<Row className="text-center mt-5">
				<Col xs={12} md={12}>
					<h2 className="pet-name">Hola {store.petById.name} </h2>
					<figure className="position-relative">
						<Image
							src={
								store.petCloudPet.url
									? store.petCloudPet.url
									: "https://raw.githubusercontent.com/NicolasArayaB/pet-cloud/3.4_User_View/src/front/img/DogPhoto01.png"
							}
							style={{ width: "200px", height: "200px" }}
							roundedCircle
							className="my-3"
						/>
						<div
							role="button"
							id="upload_widget"
							className="cloudinary-button ImgBtn"
							onClick={() => handleClick()}>
							<i className="fas fa-camera" />
						</div>
					</figure>
				</Col>
			</Row>
			<Row className="text-center">
				<Col xs={12} md={12}>
					<h3
						className="nombre mt-4 text-center"
						style={{
							color: "white",
							backgroundColor: "#66B9BF",
							borderRadius: "5px"
						}}>
						Mis Datos
					</h3>
				</Col>
			</Row>
			<Row>
				<Col xs={12} md={12}>
					<ListGroup className="list-group-flush" style={{ color: "#E37222" }}>
						<ListGroupItem>
							<Form>
								<Form.Group as={Row} controlId="formPlaintextName">
									<Form.Label column sm="2">
										Mi nombre es:
									</Form.Label>
									<Col sm="10">
										<Form.Control type="text" name="name" value={store.petById.name} readOnly />
									</Col>
								</Form.Group>
								<Form.Group as={Row} controlId="formPlaintextIdentifier">
									<Form.Label column sm="2">
										Mi número de CHIP:
									</Form.Label>
									<Col sm="10">
										<Form.Control
											type="text"
											name="identifier"
											value={store.petById.chip}
											readOnly
										/>
									</Col>
								</Form.Group>
								<Form.Group as={Row} controlId="formPlaintextWeight">
									<Form.Label column sm="2">
										Género:
									</Form.Label>
									<Col sm="10">
										<Form.Control type="text" name="gender" value={store.petById.gender} readOnly />
									</Col>
								</Form.Group>
								<Form.Group as={Row} controlId="formPlaintextWeight">
									<Form.Label column sm="2">
										Fecha de Nacimiento:
									</Form.Label>
									<Col sm="10">
										<Form.Control
											type="text"
											name="birthDate"
											value={store.petById.birthDate}
											readOnly
										/>
									</Col>
								</Form.Group>
							</Form>
						</ListGroupItem>
					</ListGroup>
					<Row className="text-center">
						<Col xs={12} md={12}>
							<h3
								className="nombre mt-4 text-center"
								style={{
									color: "white",
									backgroundColor: "#66B9BF",
									borderRadius: "5px"
								}}>
								Datos de mi dueño
							</h3>
						</Col>
					</Row>
					<ListGroup className="list-group-flush" style={{ color: "#E37222" }}>
						<ListGroupItem>
							<Form>
								<Form.Group as={Row} controlId="formPlaintextuserName">
									<Form.Label column sm="2">
										Mi Dueño es:
									</Form.Label>
									<Col lg="10">
										<Form.Control
											type="text"
											name="userPetOwner"
											value={
												store.petById.petOwner_name +
												" " +
												store.petById.petOwner_father +
												" " +
												store.petById.petOwner_mother
											}
											readOnly
										/>
									</Col>
								</Form.Group>
								<Form.Group as={Row} controlId="formPlaintextAddress">
									<Form.Label column sm="2">
										Vive en:
									</Form.Label>
									<Col lg="10">
										<Form.Control
											type="text"
											name="address"
											value={store.petById.address}
											readOnly
										/>
									</Col>
								</Form.Group>
								<Form.Group as={Row} controlId="formPlaintextPhone">
									<Form.Label column sm="2">
										Su teléfono es:
									</Form.Label>
									<Col lg="10">
										<Form.Control type="text" name="phone" value={store.petById.phone} readOnly />
									</Col>
								</Form.Group>
								<Form.Group as={Row} controlId="formPlaintextEmail">
									<Form.Label column sm="2">
										Su mail:
									</Form.Label>
									<Col lg="10">
										<Form.Control type="text" name="email" value={store.petById.email} readOnly />
									</Col>
								</Form.Group>
							</Form>
						</ListGroupItem>
					</ListGroup>
				</Col>
			</Row>
			<Row>
				<Col className="text-center my-5">
					<Button className="petBtn" type="button" href="/user">
						Volver a mis mascotas
					</Button>
				</Col>
			</Row>
		</Container>
	);
};

PetInformation.propTypes = {
	location: PropTypes.shape({
		pathname: PropTypes.string.isRequired,
		state: PropTypes.object.isRequired
	}).isRequired
};
