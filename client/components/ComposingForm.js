'use strict';

import React        from 'react';
import Formsy       from 'formsy-react';
import FormInput    from './FormInput';
import FormTextarea from './FormTextarea';

export default class ComposingForm extends React.Component{

    constructor(){
        super();

        this.state = {
            canSubmit: false
        };
    }

    enableButton(){
        this.setState({canSubmit: true});
    }

    disableButton(){
        this.setState({canSubmit: false});
    }

    submitForm(model){
        console.log(model);
    }


    render(){
        return (
            <div className="well bs-component">
                <Formsy.Form className="form-horizontal"
                             onValidSubmit={(e)=>{this.submitForm(e)}}
                             onValid={()=>{this.enableButton()}}
                             onInvalid={()=>{this.disableButton()}}>

                    <fieldset>
                        <FormInput name="inputEmailFrom"
                                   labelName="Email From"
                                   validations="isEmail"
                                   validationError="This is not a valid email"
                                   required/>
                        <FormInput name="subject"
                                   labelName="Subject"
                                   validations={{minLength: 10}}
                                   validationError="Subject should be at least 10 characters long"
                                   required/>
                        <FormInput name="inputEmailTo"
                                   labelName="Email To"
                                   validations="isEmail"
                                   validationError="This is not a valid email"
                                   required/>
                        <FormTextarea name="message"
                                  labelName="Message"
                                  validations={{minLength: 15}}
                                  validationError="Message should be at least 15 characters long"
                                  helpBlock="The message, actually can add wysiwyg editor"
                                  required/>

                        <div className="form-group">
                            <div className="col-lg-9 col-lg-offset-3">
                                <button type="submit" className="btn btn-primary" disabled={this.state.canSubmit? '' : '"disabled"'}>Submit</button>
                            </div>
                        </div>
                    </fieldset>

                </Formsy.Form>
            </div>
        );

    }
}