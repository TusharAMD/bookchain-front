import { Button } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
} from 'reactstrap';
import { useAuth0 } from "@auth0/auth0-react";

function NavbarComponent() {
  const [isOpen, setIsOpen] = useState(false);
  const { loginWithRedirect } = useAuth0();
  const { logout } = useAuth0();
  const { user, isAuthenticated, isLoading } = useAuth0();
  let admins = ['tusharvamanamdoskar@gmail.com'];

  const toggle = () => setIsOpen(!isOpen);
    
    
    if(isAuthenticated && admins.includes(user.email)){ 
      return (
        <div className="Layout">
          <Navbar dark color="dark" expand="lg">
            <NavbarBrand href="/">NCERT BookChain</NavbarBrand>
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
              <Nav className="me-auto" navbar>
                <NavItem>
                  <NavLink href="/addbook">Add a Book</NavLink>
                </NavItem>

                <NavItem>
                  <NavLink href="/adduser">
                    Add User
                  </NavLink>
                </NavItem>

                <NavItem>
                  <NavLink href="/purchase">
                    Purchase Book
                  </NavLink>
                </NavItem>

                

                <NavItem>
                  <NavLink href={`/shopowner/${user.email}`}>
                    Transfer rights
                  </NavLink>
                </NavItem>

                <NavItem>
                  <NavLink href={`/chain`}>
                    Check Chain
                  </NavLink>
                </NavItem>


                {/*<UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                    Plagiarism
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem href="/addbookdata">Add Book Data</DropdownItem>
                    <DropdownItem href="/checkplag">Check Plagiarism</DropdownItem>
                  </DropdownMenu>
              </UncontrolledDropdown>*/}

                <NavItem>
                  <NavLink href="/profile">
                    Profile
                  </NavLink>
                </NavItem>
                
              </Nav>
              
              <NavbarText style={{cursor:"pointer"}} onClick={() => logout()}>Logout</NavbarText>
            </Collapse>
        </Navbar>

        </div>
      );
    }
    else if(!isAuthenticated){
      return (
        <div className="Layout">
          <Navbar dark color="dark" expand="lg">
            <NavbarBrand href="/">NCERT BookChain</NavbarBrand>
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
              <NavbarText style={{cursor:"pointer"}} onClick={() => loginWithRedirect()}>Login</NavbarText>
              
            </Collapse>
        </Navbar>

        </div>
      );
    }
    else{
      return (
        <div className="Layout">
          <Navbar dark color="dark" expand="lg">
            <NavbarBrand href="/">NCERT BookChain</NavbarBrand>
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
              <Nav className="me-auto" navbar>

                <NavItem>
                  <NavLink href="/adduser">
                    Add User
                  </NavLink>
                </NavItem>

                <NavItem>
                  <NavLink href="/profile">
                    Profile
                  </NavLink>
                </NavItem>
                
              </Nav>
              
              <NavbarText style={{cursor:"pointer"}} onClick={() => logout()}>Logout</NavbarText>
            </Collapse>
        </Navbar>

        </div>
      );
    }

  }
  
  export default NavbarComponent;