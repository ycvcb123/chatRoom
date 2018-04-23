import React from 'react';
import logo from './logo.png';
import './logo.css';

class Logo extends React.Component{
    render(){
        return <div>
            <img src={logo} style={{width: '100%'}} alt="logo"/>
        </div>
    }
}

export default Logo;