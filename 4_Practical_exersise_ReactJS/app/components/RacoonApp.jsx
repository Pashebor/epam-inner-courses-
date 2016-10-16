'use strict';

import ReactDOM from 'react-dom';
import React, { Component } from 'react';

import Blog from './Blog.jsx';
import SideBar from './SideBar.jsx';



class App extends React.Component{

    render() {

        return (
            <div className="container">
                <Blog />
                <SideBar />
            </div>

    )
    }
}


export default App;
