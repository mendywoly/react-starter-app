import React, { Component } from 'react';
import Adapter from '../components/Adapter'
class HomeContainer extends Component {
    render() {
        return (
            <div>
                <h2>Welcome!</h2>
                <button onClick={Adapter.logout}>Log Out</button>
            </div>
        );
    }
}

export default HomeContainer;
