import styled from 'styled-components/native';

import { RectButton } from 'react-native-gesture-handler';

export const Container = styled(RectButton)`
  width: 280px;
  height: 150px;

  margin-bottom: 15px;
  padding: 20px;
  border-radius: 4px;
  border: solid 1px #dddddd;
  background-color: #ffffff;
`;

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Left = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: ${props => (props.answered ? '#42cb59' : '#999')};
`;

export const Right = styled.Text`
  font-size: 14px;
  color: #666;
`;

export const Content = styled.View`
  margin-top: 10px;
`;

export const Question = styled.Text`
  font-size: 14px;
  color: #666;
`;
