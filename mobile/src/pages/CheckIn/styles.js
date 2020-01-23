import styled from 'styled-components/native';
import Button from '~/components/Button';

export const Container = styled.View`
  align-items: center;
`;

export const ButtonContainer = styled.View`
  align-items: center;
  justify-content: center;
  width: 280px;
`;

export const CheckInButton = styled(Button)`
  margin-top: 15px;
  width: 100%;
`;

export const List = styled.FlatList.attrs({
  showVerticalScrollIndicator: false,
  contentContainerStyle: { padding: 20 },
})``;
