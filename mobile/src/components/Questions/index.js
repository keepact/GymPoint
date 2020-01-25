import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import pt from 'date-fns/locale/pt';
import { parseISO, formatDistanceStrict } from 'date-fns';

import { Container, Header, Left, Right, Content, Question } from './styles';

function Questions({ data, onSubmit }) {
  const dateParsed = useMemo(() => {
    return formatDistanceStrict(parseISO(data.createdAt), new Date(), {
      locale: pt,
      addSuffix: true,
    });
  }, [data.createdAt]);

  return (
    <Container onPress={onSubmit}>
      <Header>
        <Left answered={data.answer !== null}>
          {data.answer !== null ? 'Respondido' : 'Sem Resposta'}
        </Left>
        <Right>{dateParsed}</Right>
      </Header>

      <Content>
        <Question>{data.question}</Question>
      </Content>
    </Container>
  );
}

Questions.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number,
    answer: PropTypes.string,
    question: PropTypes.string,
    createdAt: PropTypes.string,
  }).isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default Questions;
