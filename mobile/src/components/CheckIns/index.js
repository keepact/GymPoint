import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import pt from 'date-fns/locale/pt';
import { parseISO, formatDistanceStrict } from 'date-fns';

import { Container, Left, Right } from './styles';

function CheckIns({ data }) {
  const dateParsed = useMemo(() => {
    return formatDistanceStrict(parseISO(data.createdAt), new Date(), {
      locale: pt,
      addSuffix: true,
    });
  }, [data.createdAt]);

  return (
    <Container>
      <Left>CheckIn #{data.id}</Left>
      <Right>{dateParsed}</Right>
    </Container>
  );
}

CheckIns.propTypes = {
  data: PropTypes.shape({
    createdAt: PropTypes.string,
    id: PropTypes.number,
  }).isRequired,
};

export default CheckIns;
