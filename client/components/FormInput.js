'use strict';

import React from 'react';
import Formsy from 'formsy-react';

const FormInput = React.createClass({

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
                    <input type="text" className="form-control" placeholder={this.props.labelName} name={this.props.name} onChange={this.changeValue} value={this.getValue()}/>
                    <span className="text-danger">{errorMessage}</span>
                </div>
            </div>
        );
    }
});

export default FormInput;