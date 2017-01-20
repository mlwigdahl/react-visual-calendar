import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import MainPage from './components/calendar/MainPage'; //eslint-disable-line import/no-named-as-default
import DayPage from './components/calendar/DayPage'; //eslint-disable-line import/no-named-as-default
import AboutPage from './components/about/AboutPage';
import NotFoundPage from './components/common/NotFoundPage';
import LoginPage from './components/login/LoginPage';

// note:  day ID format is YYYYMMDD

export default (
    <Route path="/" component={App}>
        <IndexRoute component={MainPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/day/:id" component={DayPage} />
        <Route path="/about" component={AboutPage} />
        <Route path="*" component={NotFoundPage} />
    </Route>
);