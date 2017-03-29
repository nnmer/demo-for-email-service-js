'use strict';

import React        from 'react';


let emailRegEx = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i;
export default class ActionForm extends React.Component{

    constructor() {
        super()
        this.state={
            emailTo: '',
            canSubmit: false,
            emailCorrect: null
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
        if (this.state.emailCorrect){
            console.log(this.state.emailTo);
        }else{
            //TODO: send error to backend to trace it
            alert('Error happened, please try again later');
        }
    }


    render(){
        return (
            <div>
                <div className="page-header">
                    <h1 >Assume we have an action</h1>
                </div>
                <dl className="dl-horizontal">
                    <dt>email from</dt>
                    <dd>aa@aa.aa</dd>

                    <dt>subject</dt>
                    <dd>Email by action</dd>

                    <dt>email to</dt>
                    <dd>
                        <input typeof="text" className="form-control" name="emailTo" placeholder="Input your email" onChange={(e)=>{this.emailInputCheck(e)}}/>
                        <span className="text-danger">{this.state.emailCorrect ===false?'This is not a valid email':''}</span>
                    </dd>
                </dl>
                <div className="center-block text-center">
                    <button className="btn btn-lg btn-primary" disabled={this.state.canSubmit? '' : '"disabled"'} onClick={()=>this.submitAction()}>Action!</button>
                </div>
            </div>
        );

    }
}