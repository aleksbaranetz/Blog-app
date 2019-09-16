import React, { Component } from 'react';
import { Button, Container, Row, Col, ListGroup, ListGroupItem } from 'reactstrap';
import { connect } from 'react-redux';
import { getPosts, deletePost } from '../actions/postActions';
import './Posts.css';
import PropTypes from 'prop-types';

class Posts extends Component {

    componentDidMount(){
        this.props.getPosts()
    }

    onDeleteClick = (id) => {
        this.props.deletePost(id);
    }


    render() {

        const { posts } = this.props.posts 

        return(
                <Container>
                    <h1>Posts</h1>
                
                    {this.props.isAuthenticated ?  posts.map(({title, text, _id}) =>

                        <Row>
                            <Col>
                                <h3>{title}</h3>
                                <p>{text}</p>
                            </Col>
                            <Col>
                                <Button onClick={this.onDeleteClick.bind(this, _id)} close></Button>
                            </Col>           
                        </Row>
                            ) : null
                        }
                </Container>
        );
    }
}

const mapStateToProps = (state) => ({
    posts: state.postRed,
    isAuthenticated: state.authRed.isAuthenticated
});

export default connect(mapStateToProps, { getPosts, deletePost })(Posts);