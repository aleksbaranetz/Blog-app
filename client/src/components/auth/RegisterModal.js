import React, { Component } from 'react';
import { Button,
        Modal,
        ModalHeader,
        ModalBody, Form,
        FormGroup,
        Label,
        Input,
        NavLink,
        Alert
    } from 'reactstrap';
import { connect } from 'react-redux';
import { register } from '../../actions/authAction';
import { clearErrors } from '../../actions/errAction';


class RegisterModal extends Component {
    state = {
        modal: false,
        username: '',
        email: '',
        password: '',
        msg: null
    };

    toggle = () => {
        this.props.clearErrors();
        this.setState({
            modal: !this.state.modal
        });
    }

    componentDidUpdate(prevProps) {
        const { error, isAuthenticated } = this.props;

        if(error !== prevProps.error) {
            if(error.id === "REGISTER_FAIL") {
                this.setState({
                    msg: error.msg.msg
                });
            } else {
                this.setState({
                    msg: null
                });
            }
        }

        if(this.state.modal) {
            if(isAuthenticated) {
                this.toggle();
            }
        }
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    onSubmit = (e) => {
        e.preventDefault();

        const { username, email, password } = this.state;

        const newUser = {
            username, email, password
        }

        this.props.register(newUser);

    }



    render() {
        return (
            <div>
                <NavLink onClick={this.toggle} href='#'>Register</NavLink>

                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalBody>
                        {this.state.msg ?
                        <Alert color='danger'>{this.state.msg}</Alert> : null    
                    }
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for='username'>Name</Label>
                                <Input
                                    type='text'
                                    name='username'
                                    placeholder='Name'
                                    id='name'
                                    onChange={this.onChange}
                                />
                                <Label>Email</Label>
                                <Input
                                    type='email'
                                    name='email'
                                    id='email'
                                    placeholder='Email'
                                    onChange={this.onChange}
                                />
                                <Label>Password</Label>
                                <Input
                                    type='password'
                                    name='password'
                                    id='password'
                                    placeholder='Password'
                                    onChange={this.onChange}
                                />
                                <Button color='dark' style={{marginTop: '2rem'}} block>Register</Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.authRed.isAuthenticated,
    error: state.errRed
});

export default connect (mapStateToProps, { register, clearErrors })(RegisterModal);