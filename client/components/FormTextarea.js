'use strict';

import React from 'react';
import Formsy from 'formsy-react';

const FormTextarea = React.createClass({

    mixins: [Formsy.Mixin],

    changeValue(event) {
        this.setValue(event.currentTarget.value);
    },

    render() {
        const className     = this.showRequired() ? 'required' : this.showError() ? 'error' : null;
        const errorMessage  = this.getErrorMessage();

        return (
            <div className={"form-group "+className}>
                <label htmlFor={this.props.name} className="col-lg-3 control-label">{this.props.labelName}</label>
                <div className="col-lg-9">
                    <textarea className="form-control"
                              rows="3"
                              placeholder={this.props.labelName}
                              name={this.props.name}
                              onChange={this.changeValue}/>
                    <span className="text-danger">{errorMessage}</span>
                    <span className="help-block">{this.props.helpBlock}</span>
                </div>
            </div>
        );
    }
});

export default FormTextarea;