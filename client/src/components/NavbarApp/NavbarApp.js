import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import {
	Collapse,
	Navbar,
	NavbarToggler,
	NavbarBrand,
	Nav,
	NavItem
	// NavLink as BstNavLink,
} from "reactstrap";

class AppNavbar extends Component {
	state = {
		    isOpen: false
	        };

	        toggle = () => {
		        this.setState(prevState => ({
			        isOpen: !prevState.isOpen
		            }));
	                };

    render() {
		return (
			<div>
				<Navbar color="primary" dark expand="md" className="mb-5">
					<NavbarBrand tag={NavLink} to="/">
						Food Recipe App
					</NavbarBrand>
					    <NavbarToggler onClick={this.toggle} />
					        <Collapse isOpen={this.state.isOpen} navbar>
						        <Nav className="ml-auto" navbar>
							        <NavItem>
                                    <NavLink exact to="/" className="nav-link">
                                        Home
                                    </NavLink>
                                    </NavItem>
                                    <NavItem>
                                    <NavLink exact to="/recipe" className="nav-link">
                                       Recipes
                                    </NavLink>
                                    </NavItem>
                                    {this.props.isAuth && (
                                    <NavItem>
									<NavLink to="/add" className="nav-link">
										Add Recipe
									</NavLink>
								    </NavItem>
							         )} 
							        {/* <NavItem> */}
								    {this.props.isAuth ? (
									<NavLink to="/logout" className="nav-link">
										Logout
									</NavLink>
								) : (
									<NavLink to="/auth" className="nav-link">
										Login
									</NavLink>
								)}
							{/* </NavItem> */}
						</Nav>
					</Collapse>
				</Navbar>
			</div>
		);
	}
}

export default AppNavbar;
