'use strict';

import React from 'react';

export default class ResultMessage extends React.Component{
    render(){
        return (
            <div className="col-lg-4">
                <div className="bs-component">
                    <div className="alert alert-dismissible alert-danger">
                        <button type="button" className="close" data-dismiss="alert">&times;</button>
                        <strong>Oh snap!</strong> <a href="#" className="alert-link">Change a few things up</a> and try submitting again.
                    </div>
                </div>
            </div>
        );
    }
}