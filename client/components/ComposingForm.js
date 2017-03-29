'use strict';

import React        from 'react';
import Formsy       from 'formsy-react';
import FormInput    from './FormInput';
import FormTextarea from './FormTextarea';
import AlertSuccess from './alerts/success';
import AlertError   from './alerts/error';

export default class ComposingForm extends React.Component{

    constructor(){
        super();

        this.state = {
            inProgress: false,
            canSubmit:  false,
            result:     ''
        };
    }

    enableButton(){
        this.setState({canSubmit: true});
    }

    disableButton(){
        this.setState({canSubmit: false});
    }

    submitForm(model){
        this.setState({result:'',inProgress:true});

        if (this.state.canSubmit){

            fetch('/send',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    emailTo:    model.emailTo,
                    emailFrom:  model.emailFrom,
                    subject:    model.subject,
                    message:    model.message
                })
            })
                .then((r)=>{
                    if (r.status != 200){
                        this.setState({
                            result:     <AlertError message={r.statusText}/>,
                            inProgress: false
                        });
                    }else {
                        this.setState({
                            result:     <AlertSuccess/>,
                            inProgress: false
                        });
                    }
                })
                .catch((e)=>{
                    this.setState({
                        result:     <AlertError message={e.message}/>,
                        inProgress: false
                    });
                })
        }else{
            //TODO: send error to backend to trace it
            alert('Error happened, please try again later');
            this.setState({
                result:     <AlertError message='Error happened, please try again later'/>,
                inProgress: false
            });
        }
    }


    render(){
        return (
            <div className="well bs-component">
                <Formsy.Form className="form-horizontal"
                             onValidSubmit={(e)=>{this.submitForm(e)}}
                             onValid={()=>{this.enableButton()}}
                             onInvalid={()=>{this.disableButton()}}>

                    <fieldset>
                        <FormInput name="emailFrom"
                                   labelName="Email From"
                                   validations="isEmail"
                                   validationError="This is not a valid email"
                                   required/>
                        <FormInput name="subject"
                                   labelName="Subject"
                                   validations={{minLength: 10}}
                                   validationError="Subject should be at least 10 characters long"
                                   required/>
                        <FormInput name="emailTo"
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
                                <button type="submit" className="btn btn-primary" disabled={this.state.canSubmit && !this.state.inProgress? '' : '"disabled"'}>Submit</button>
                            </div>
                            <div className="col-md-6 col-md-offset-3" style={{marginTop: "15px"}}>
                                { this.state.result }
                            </div>
                        </div>
                    </fieldset>

                </Formsy.Form>
            </div>
        );

    }
}