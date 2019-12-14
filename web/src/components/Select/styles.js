import styled from 'styled-components';

import Select from '~/components/Select';

export const PlanSelector = styled(Select)`
  width: 198px;

  .react-select__control {
    margin-top: 4px;
  }
  .react-select__value-container {
    height: 45px;
  }
`;
