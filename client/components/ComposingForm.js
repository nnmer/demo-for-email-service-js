'use strict';

import React from 'react';

export default class ComposingForm extends React.Component{
    render(){
        return (
            <div className="well bs-component">
                <form className="form-horizontal">
                    <fieldset>
                        <div className="form-group">
                            <label htmlFor="inputEmailFtom" className="col-lg-3 control-label">Email From:</label>
                            <div className="col-lg-9">
                                <input type="text" className="form-control" id="inputEmailFrom" placeholder="Email"/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="inputEmailTo" className="col-lg-3 control-label">Email To:</label>
                            <div className="col-lg-9">
                                <input type="text" className="form-control" id="inputEmailTo" placeholder="Email"/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="inputSubject" className="col-lg-3 control-label">Subject</label>
                            <div className="col-lg-9">
                                <input type="text" className="form-control" id="inputSubject" placeholder="Subject"/>
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="textArea" className="col-lg-3 control-label">Message</label>
                            <div className="col-lg-9">
                                <textarea className="form-control" rows="3" id="message"></textarea>
                                <span className="help-block">The message, actually can add wysiwyg editor</span>
                            </div>
                        </div>

                        <div className="form-group">
                            <div className="col-lg-9 col-lg-offset-3">
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </div>
                        </div>
                    </fieldset>
                </form>
            </div>
        );

    }
}