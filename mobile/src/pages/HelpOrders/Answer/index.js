import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';

import pt from 'date-fns/locale/pt';
import { parseISO, formatDistanceStrict } from 'date-fns';

import { Container, Header, TextContent, Title, QuestionDate } from './styles';

function HelpOrderAnswer() {
  const { helporder } = useSelector(state => state.helporder);

  const dateParsed = useMemo(() => {
    return formatDistanceStrict(parseISO(helporder.createdAt), new Date(), {
      locale: pt,
      addSuffix: true,
    });
  }, [helporder.createdAt]);

  return (
    <Container>
      <Header>
        <Title>Pergunta</Title>
        <QuestionDate>{dateParsed}</QuestionDate>
      </Header>

      <TextContent>{helporder.question}</TextContent>

      <Header>
        <Title>Resposta</Title>
      </Header>
      <TextContent>
        {helporder.asnwer ? helporder.answer : 'Sem resposta'}
      </TextContent>
    </Container>
  );
}

export default HelpOrderAnswer;
