import React from 'react'
import { Switch, Route } from 'react-router-dom'
import CoreLayout from '../layouts/CoreLayout'
import Home from './Home'
import Quiz from './Quiz'
import LoginRoute from './Login'
import SignupRoute from './Signup'
import ProjectsRoute from './Projects'
import AccountRoute from './Account'
import NotFoundRoute from './NotFound'
import NewProject from './NewProject'

export default function createRoutes(store) {
  return (
    <CoreLayout>
      <Switch>
        <Route exact path={Home.path} component={() => <Home.component />} />
        {/* Build Route components from routeSettings */
        [
          AccountRoute,
          ProjectsRoute,
          SignupRoute,
          LoginRoute,
          Quiz,
          NewProject
          /* Add More Routes Here */
        ].map((settings, index) => (
          <Route key={`Route-${index}`} {...settings} />
        ))}
        <Route component={NotFoundRoute.component} />
      </Switch>
    </CoreLayout>
  )
}
