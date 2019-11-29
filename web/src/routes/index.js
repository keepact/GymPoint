import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '../pages/SignIn';

import PlansCreate from '../pages/Plans/Create';
import PlansEdit from '../pages/Plans/Edit';
import PlansList from '../pages/Plans/List';

import RegistrationCreate from '../pages/Registration/Create';
import RegistrationEdit from '../pages/Registration/Edit';
import RegistrationList from '../pages/Registration/List';

import StudentsCreate from '../pages/Students/Create';
import StudentsEdit from '../pages/Students/Edit';
import StudentsList from '../pages/Students/List';

import HelpOrdersAnswer from '../pages/HelpOrders/Answer';
import HelpOrdersList from '../pages/HelpOrders/List';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />

      <Route path="/plans/create" component={PlansCreate} isPrivate />
      <Route path="/plans/:id" component={PlansEdit} isPrivate />
      <Route path="/plans" component={PlansList} isPrivate />

      <Route
        path="/registration/create"
        component={RegistrationCreate}
        isPrivate
      />
      <Route path="/registration/:id" component={RegistrationEdit} isPrivate />
      <Route path="/registration" component={RegistrationList} isPrivate />

      <Route path="/students/create" component={StudentsCreate} isPrivate />
      <Route path="/students/:id" component={StudentsEdit} isPrivate />
      <Route path="/students" component={StudentsList} isPrivate />

      <Route path="/help-orders/:id" component={HelpOrdersAnswer} isPrivate />
      <Route path="/help-orders" component={HelpOrdersList} isPrivate />

      <Route path="/" component={() => <h1>404</h1>} />
    </Switch>
  );
}
