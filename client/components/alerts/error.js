'use strict';

import React        from 'react';

export default class AlertError extends React.Component{

    render(){
        return (
            <div>
                <div className="alert alert-dismissible alert-danger">
                    <button type="button" className="close" data-dismiss="alert">×</button>
                    <strong>Oh snap!</strong> {this.props.message?this.props.message:'Error happened, please try again later.'}
                </div>
            </div>
        );

    }
}