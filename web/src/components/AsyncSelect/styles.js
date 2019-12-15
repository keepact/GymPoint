import styled from 'styled-components';

import AsyncSelect from '~/components/AsyncSelect';

export const StudentSelector = styled(AsyncSelect)`
  min-width: 840px;

  .react-asyncselect__input {
    margin-top: 8px;
  }
  .react-asyncselect__value-container {
    height: 45px;

    input {
      height: auto;
    }
  }
`;
