import React from 'react';
import ReactDom from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import reducers from './reduce';
import Authroute from './component/authroute/authroute';
import Chat from './component/chat/chat';
import Login from './container/login/login';
import Register from './container/register/register';
import BossInfo from './container/bossinfo/bossinfo';
import GeniusInfo from './container/geniusinfo/geniusinfo';
import Dashboard from './container/dashboard/dashboard';

const reduxDevtools = window.devToolsExtension ? window.devToolsExtension() : () => {}
// const store = createStore(reducers, compose(
//     applyMiddleware(thunk),
//     reduxDevtools
// ));
const store = createStore(reducers,applyMiddleware(thunk));


ReactDom.render(
    (
        <Provider store={store}>
            <BrowserRouter>
                <div>
                    <Authroute />
                    <Switch>
                        <Route path='/bossinfo' component={BossInfo}></Route>
                        <Route path='/geniusinfo' component={GeniusInfo}></Route>
                        <Route path='/login' component={Login}></Route>
                        <Route path='/register' component={Register}></Route>
                        <Route path='/chat/:user' component={Chat}></Route>
                        <Route component={Dashboard}></Route>
                    </Switch>
                </div>
            </BrowserRouter>
        </Provider>
    ),document.getElementById('root')
)

