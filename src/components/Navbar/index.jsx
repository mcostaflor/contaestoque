import React, { useState } from 'react';
import {
    Navbar, NavbarBrand, Collapse, Nav, NavItem, NavLink, UncontrolledDropdown, DropdownToggle,
    DropdownItem, DropdownMenu, NavbarToggler
} from 'reactstrap';
import {
    NavLink as RouterLink
} from 'react-router-dom';



const NavbarComponent = (props) => {

    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return (
        <Navbar color="light" expand="md">
            <RouterLink>
                <NavbarBrand to="/">EstoqueX</NavbarBrand>
            </RouterLink>
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
                <Nav className="mr-auto" navbar>
                    <RouterLink to="/">
                        <NavItem>
                            <NavLink>Início</NavLink>
                        </NavItem>
                    </RouterLink>
                    <UncontrolledDropdown nav inNavbar>
                        <DropdownToggle nav caret>
                            Estoque
                        </DropdownToggle>
                        <DropdownMenu right>
                            <RouterLink
                                to="/contaestoque"
                            >
                                <DropdownItem>
                                    Contagem de Estoque
                                </DropdownItem>
                            </RouterLink>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                </Nav>
            </Collapse >
        </Navbar >
    );
}

export default NavbarComponent;