'use strict';

import React        from 'react';

export default class AlertSuccess extends React.Component{

    render(){
        return (
            <div>
                <div className="alert alert-dismissible alert-success">
                    <button type="button" className="close" data-dismiss="alert">×</button>
                    <strong>Well done!</strong> {this.props.message?this.props.message:'Your message was successfully sent.'}
                </div>
            </div>
        );

    }
}