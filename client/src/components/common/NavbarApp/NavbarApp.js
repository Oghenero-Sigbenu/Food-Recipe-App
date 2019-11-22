import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import {
	Collapse,
	Navbar,
	NavbarToggler,
	NavbarBrand,
	Nav,
	NavItem,
	UncontrolledDropdown,
	DropdownToggle,
	DropdownItem,
	DropdownMenu
	// NavLink as BstNavLink,
} from "reactstrap";
import "./NavbarApp.css"

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
		const {user,token,isAuth} = this.props;
		return (
			<div className="new-nav">
				<Navbar expand="md" className="mb-5 newN nav">
					<NavbarBrand tag={NavLink} to="/" >
					<div className="logo"><h2>Foody</h2></div>	
					</NavbarBrand>
					    <NavbarToggler onClick={this.toggle} className="white" />
					        <Collapse isOpen={this.state.isOpen} className="white" navbar>
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
                                    {isAuth && (
                                    <NavItem>
									<NavLink to="/add" className="nav-link">
										Add Recipe
									</NavLink>
								    </NavItem>
							         )} 
							        {/* <NavItem> */}
									{isAuth ? (
                  <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav caret>
                      {user && user.username}
                    </DropdownToggle>
                    <DropdownMenu right>
                      <DropdownItem>
                        <NavLink to="/edit-profile" className="nav-link">Edit Profile</NavLink>
                      </DropdownItem>
                      <DropdownItem divider />
                      <DropdownItem>
                        <NavLink to="/logout" className="nav-link">Logout</NavLink>
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
								) : (
									<NavLink to="/login" className="nav-link">
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
