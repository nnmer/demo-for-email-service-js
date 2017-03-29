'use strict';

import React from 'react';

import ComposingForm from '../components/ComposingForm';
import ActionForm    from '../components/ActionForm';
import NavBar        from '../components/NavBar';

class App extends React.Component {
    render() {
        return (
            <div>

                <NavBar/>

                <div className="container">
                    <div className="bs-docs-section">

                        <div className="row">
                            <div className="col-lg-6">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="page-header">
                                            <h1 >Gonna send...</h1>
                                        </div>
                                    </div>
                                </div>

                                <ComposingForm />
                            </div>
                            <div className="col-lg-6">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <ActionForm/>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                {this.props.children}
            </div>
        )
    }
}

export default App;