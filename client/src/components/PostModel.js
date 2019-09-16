import React, { Component } from 'react';
import { Button, Input, Label } from 'reactstrap';
import { connect } from 'react-redux';
import {addPost } from '../actions/postActions'

class PostModel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            text: ''
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const newPost = {
            title: this.state.title,
            text: this.state.text
        }

        this.props.addPost(newPost);

        this.setState({
            title: '',
            text: ''
        });
    }

    render() {
        return(
            <div>
                <form onSubmit={this.onSubmit}>
                    <div>
                        <label>title:</label><br />
                        <Input type="text" name="title" onChange={this.onChange} value={this.state.title} />
                    </div>
                    <div>
                        <label>story:</label><br />
                        <Input type='textarea' name="text" onChange={this.onChange} value={this.state.text} />
                    </div>
                    <Button type="submit" style={{marginTop: '1rem'}} block>add posts</Button>
                </form>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    posts: state.postRed.posts
});

export default connect(mapStateToProps, { addPost })(PostModel);