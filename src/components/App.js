//Dependencies
import React, { Component }
from 'react';
import PropTypes from 'prop-types';

//Components
import Header from './Global/Header'
import Content from './Global/Content'

class App extends Component {

static propTypes = {
children: PropTypes.object.isRequired
};
        render() {

const {children} = this.props;
        
        return (
            <div className="App">
                <Header/>
                <Content body={children} />
                <footer className="App-footer">
                    Brecha Digital 2018
                </footer>
            </div>
                );
    }
}
;

export default App;
