import React, { Component, Fragment } from 'react';
import { Container, Row, Col,Nav , Navbar, NavbarBrand, NavItem } from 'reactstrap';
import RegisterModal from './auth/RegisterModal';
import LoginModal from './auth/LoginModal';
import Logout from './auth/Logout';
import { connect } from 'react-redux';

class Header extends Component {

    render() {

        const { isAuthenticated, user } = this.props.auth;

        const auth = (
            <Fragment>
                <NavItem className='navbar-text mr-3'>
                    <span>
                        <strong>{ user ? `Welcome ${user.username}` : '' }</strong>
                    </span>
                </NavItem>
                <NavItem>
                    <Logout />
                </NavItem>
            </Fragment>
        );

        const guest = (
            <Fragment>
                <NavItem>
                    <RegisterModal />
                </NavItem>
                <NavItem>
                    <LoginModal />
                </NavItem>
            </Fragment>
        );

        return(
            <div>
                    <Navbar color="dark" dark expand='sm'>
                        <NavbarBrand href="/">
                            Blog
                        </NavbarBrand>
                        <Nav className='ml-auto' navbar>
                            {isAuthenticated ? auth : guest }
                        </Nav>
                    </Navbar>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.authRed
});

export default connect(mapStateToProps, null)(Header);