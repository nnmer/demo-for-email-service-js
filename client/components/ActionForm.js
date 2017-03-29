'use strict';

import React        from 'react';
import AlertSuccess from './alerts/success';
import AlertError   from './alerts/error';
import 'whatwg-fetch';


let emailRegEx = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i;
export default class ActionForm extends React.Component{

    constructor() {
        super()
        this.state={
            inProgress: false,
            canSubmit:  false,
            emailTo:    '',
            emailCorrect: null,
            result: ''
        };
    }

    emailInputCheck(e){
        let value = e.target.value;
        this.setState({emailTo: value});

        if (value !== null && value !== undefined
            && emailRegEx.test(value)
        ) {
            this.setState({canSubmit:true, emailCorrect:true});
        }else{
            this.setState({canSubmit:false, emailCorrect:false});
        }
        if (value.length==0){
            this.setState({emailCorrect:null});
        }
    }

    submitAction(){
        this.setState({result:'',inProgress:true});

        let emailTo = this.state.emailTo;
        if (this.state.emailCorrect){

            fetch('/send',{
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        emailTo:    emailTo,
                        emailFrom:  'aa@aa.aa',
                        subject:    'Email by action',
                        message:    'Default action message'
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
            <div>
                <div className="page-header">
                    <h1 >Assume we have an action</h1>
                </div>
                <dl className="dl-horizontal">
                    <dt>Email from</dt>
                    <dd>aa@aa.aa</dd>

                    <dt>Subject</dt>
                    <dd>Email by action</dd>

                    <dt>Email to</dt>
                    <dd>
                        <input typeof="text" className="form-control" name="emailTo" placeholder="Input your email" onChange={(e)=>{this.emailInputCheck(e)}}/>
                        <span className="text-danger">{this.state.emailCorrect ===false?'This is not a valid email':''}</span>
                    </dd>

                    <dt>Message</dt>
                    <dd>
                        Default action message
                    </dd>
                </dl>
                <div className="center-block text-center">
                    <button className="btn btn-lg btn-primary" disabled={this.state.canSubmit && !this.state.inProgress? '' : '"disabled"'} onClick={()=>this.submitAction()}>Action!</button>
                    <div className="clearfix"/>
                    <div className="col-md-6 col-md-offset-3" style={{marginTop: "15px"}}>
                        {this.state.result}
                    </div>
                </div>
            </div>
        );

    }
}