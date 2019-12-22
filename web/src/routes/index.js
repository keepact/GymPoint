import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '../pages/SignIn';

import Profile from '../pages/Profile';

import PlansForm from '../pages/Plans/Form';
import PlansList from '../pages/Plans/List';

import RegistrationForm from '../pages/Registration/Form';
import RegistrationList from '../pages/Registration/List';

import StudentsForm from '../pages/Students/Form';
import StudentsList from '../pages/Students/List';

import HelpOrdersList from '../pages/HelpOrders/List';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />

      <Route path="/profile" component={Profile} isPrivate />

      <Route path="/plans/create" component={PlansForm} isPrivate />
      <Route path="/plans/:id" component={PlansForm} isPrivate />
      <Route path="/plans" component={PlansList} isPrivate />

      <Route
        path="/registrations/create"
        component={RegistrationForm}
        isPrivate
      />
      <Route path="/registrations/:id" component={RegistrationForm} isPrivate />
      <Route path="/registrations" component={RegistrationList} isPrivate />

      <Route path="/students/create" component={StudentsForm} isPrivate />
      <Route path="/students/:id" component={StudentsForm} isPrivate />
      <Route path="/students" component={StudentsList} isPrivate />

      <Route path="/help-orders" component={HelpOrdersList} isPrivate />

      <Route path="/" component={() => <h1>404</h1>} />
    </Switch>
  );
}
