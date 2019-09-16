import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Provider } from 'react-redux';
import Header from './components/Header';
import PostModel from './components/PostModel';
import Posts from './components/Posts';
import store from './store';
import { loadUser } from './actions/authAction';

class App extends Component {
  
  componentDidMount(){
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <Container>
            <Header />
            <Row>
              <Col xs='4'>
                <PostModel />
              </Col>
              <Col>
                <Posts />
              </Col>
            </Row>
          </Container>
        </div>
      </Provider>
    );
  }
}

export default App;
