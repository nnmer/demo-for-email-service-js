'use strict';

import React from 'react';

export default class NavBar extends React.Component{
    render(){
        return (
            <div className="navbar navbar-default navbar-fixed-top">
                <div className="container">
                    <div className="navbar-header">
                        <a className="navbar-brand">Sending email DEMO</a>
                        <button className="navbar-toggle" type="button" data-toggle="collapse" data-target="#navbar-main">
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                    </div>
                    <div className="navbar-collapse collapse" id="navbar-main">
                        <ul className="nav navbar-nav">

                        </ul>

                        <ul className="nav navbar-nav navbar-right">
                        </ul>

                    </div>
                </div>
            </div>
        );
    }
}