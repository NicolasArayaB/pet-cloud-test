import React, { useContext } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";

import { Home } from "./pages/home";
import { RegisterView } from "./pages/register";
import { Vet } from "./pages/vet";
import "../styles/layout.scss";

import injectContext, { Context } from "./store/appContext";
// import { Context } from "./store/appContext";
import { MyNavbar } from "./component/navbar";
import { Footer } from "./component/footer";
import { Contact } from "./pages/contact";
import { Link } from "react-router-dom";
import { Card, Row, Col } from "react-bootstrap";
import User from "./pages/user";
import { PetInformation } from "./component/pet-owner/petInformation";
import VetInfo from "./pages/vetInformation";
import NewPet from "./pages/newPet";
import { ForgottenPass } from "./pages/forgottenPassword";
import { RecoverPassword } from "./pages/recoverPassword";
import ServicesMain from "./pages/services";
import A from "./pages/newCheckup";

//create your first component
const Layout = () => {
	const { store } = useContext(Context);
	//the basename is used when your project is published in a subdirectory and not in the root of the domain
	// you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
	const basename = process.env.BASENAME || "";

	return (
		<div className="d-flex flex-column h-100">
			<BrowserRouter basename={basename}>
				<ScrollToTop>
					<MyNavbar />
					<Switch>
						<Route exact path="/" component={Home} />
						<Route exact path="/register" component={RegisterView} />
						<Route exact path="/pass" component={ForgottenPass} />
						<Route path="/recover-password/:id" component={RecoverPassword} />
						<Route exact path="/contact-us" component={Contact} />
						<Route exact path="/services" component={ServicesMain} />
						<Route exact path="/vet" component={Vet} />
						<Route exact path="/vet/id" render={props => <VetInfo {...props} />} />
						<Route exact path="/user" component={User} />
						<Route exact path="/user/information" render={props => <PetInformation {...props} />} />
						<Route exact path="/newPet" component={NewPet} />
						<Route exact path="/checkup" component={A} />
						<Route>
							<div className="text-center-error">
								<h1>Lo siento, pero PetCloud no encuentra esta página</h1>
								<h2>
									<i className="fas fa-paw" style={{ color: "#e37222" }} /> Sigue navegando con
									nosotros <i className="fas fa-paw" style={{ color: "#e37222" }} />
								</h2>
								<Row className="justify-content-center">
									<Col xs={12} md={4}>
										<Card border="0" className="image-dog">
											<Card.Img
												src="https://raw.githubusercontent.com/NicolasArayaB/pet-cloud/19.-more-information-user-view/src/front/img/pet-error-page.png"
												style={{ width: "400px" }}
												href="/"
											/>
											<Card.Body>
												<Link to="/">
													<button
														className="btn btn-info btn-lg petBtn"
														href="#"
														role="button">
														Volver al Home de PetCloud
													</button>
												</Link>
											</Card.Body>
										</Card>
									</Col>
								</Row>
							</div>
						</Route>
					</Switch>
					<Footer />
				</ScrollToTop>
			</BrowserRouter>
		</div>
	);
};

export default injectContext(Layout);
