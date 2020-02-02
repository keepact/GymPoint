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

export const Footer = styled.View`
  min-height: 100%;
  min-width: 100%;
  border-radius: 5px;
  background-color: #fff;
  margin-top: 30px;
  padding: 10px;
`;

export const List = styled.FlatList.attrs({
  showVerticalScrollIndicator: false,
  contentContainerStyle: { padding: 20 },
})``;
