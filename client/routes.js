import React from 'react';
import {  Router,Route, Link, IndexRoute} from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';

import  App              from './pages/app';
// import  HomePage         from './pages/home';
const history = createBrowserHistory()

var routes = (
    <Router history={history}>
        <Route path="/" component={App}>
            {/*<IndexRoute component={HomePage} />*/}
            {/*<Route path="new" component={NewMessage} />*/}
            {/*<Route path="inbox" component={Inbox}>*/}
                {/* add some nested routes where we want the UI to nest */}
                {/* render the stats page when at `/inbox` */}
                {/*<IndexRoute component={InboxStats}/>*/}
                {/* render the message component at /inbox/messages/123 */}
                {/*<Route path="messages/:id" component={Message} />*/}
            {/*</Route>*/}
        </Route>
    </Router>
);

export default routes;