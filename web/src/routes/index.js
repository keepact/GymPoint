import React from 'react';
import { Switch, Route } from 'react-router-dom';

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

      <Route path="/plans/create" component={PlansCreate} />
      <Route path="/plans/:id" component={PlansEdit} />
      <Route path="/plans" component={PlansList} />

      <Route path="/registration/create" component={RegistrationCreate} />
      <Route path="/registration/:id" component={RegistrationEdit} />
      <Route path="/registration" component={RegistrationList} />

      <Route path="/students/create" component={StudentsCreate} />
      <Route path="/students/:id" component={StudentsEdit} />
      <Route path="/students" component={StudentsList} />

      <Route path="/help-orders/:id" component={HelpOrdersAnswer} />
      <Route path="/help-orders" component={HelpOrdersList} />
    </Switch>
  );
}
