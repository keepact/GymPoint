import { createRef } from 'react';
import { CommonActions } from '@react-navigation/native';

export const navigationRef = createRef();

function navigate(routeName, routeParams) {
  return navigationRef.current?.dispatch(
    CommonActions.navigate({
      name: routeName,
      params: routeParams,
    }),
  );
}

function reset(state) {
  return navigationRef.current?.dispatch(
    CommonActions.reset({
      index: 1,
      routes: [state],
    }),
  );
}

function goBack(route, state) {
  return navigationRef.current?.dispatch({
    ...CommonActions.goBack(),
    source: route.key,
    target: state.key,
  });
}
export default {
  navigationRef,
  navigate,
  reset,
  goBack,
};
