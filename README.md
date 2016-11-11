# react-visual-calendar

React Visual Calendar is a responsive, mobile-first visual calendar web application designed to be used by children and by people with autism or other cognitive or developmental disabilities.

Version: 0.0.0 -- At the moment this is an empty framework.

## Goals for 0.0.1:
    X 1. Install react-slingshot and upgrade to Webpack 2.0.  Configure to use experimental object rest/spread support.
    X 2. Install react-infinite-calendar.
    X 3. Establish skeleton application structure with placeholders for all major pages (Main, Day, About, 404).
    X 4. Set up skeletal testing structure.
    5. Confirm that dev and production builds work as expected.
        - Get production build to work -- pretty clear that the problem is happening in the production version of configureStore(), likely because I'm forcing ES6 modules on for Webpack 2's tree-shaking functionality, and react-slingshot uses require() for its differential inclusion. 

## Goals for 0.0.2:

    1. Get react-infinite-calendar up on the main page.
    2. Get real tests in place for initial structure.
    3. Reconsider directory structure.
    4. Get real navigation going off the calendar.

RVC is powered by Cory House's React Slingshot starter kit (https://github.com/coryhouse/react-slingshot) and react-infinite-calendar (https://github.com/clauderic/react-infinite-calendar) 

