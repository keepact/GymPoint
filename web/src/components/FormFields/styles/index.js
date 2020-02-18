import styled from 'styled-components';

import Select from 'react-select';
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

export const MySelector = styled(Select)`
  width: 198px;
  padding-bottom: 15px;

  .react-select__control {
    margin-top: 4px;
  }
  .react-select__value-container {
    height: 45px;
  }
`;
