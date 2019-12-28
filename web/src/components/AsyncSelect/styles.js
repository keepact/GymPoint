import styled from 'styled-components';

import AsyncSelect from 'react-select/async';

export const MyAsyncSelect = styled(AsyncSelect)`
  min-width: 840px;
  padding-bottom: 10px;

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
