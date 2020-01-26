import styled from 'styled-components/native';

export const Container = styled.View`
  width: 280px;
  align-self: center;

  margin-bottom: 15px;
  margin-top: 20px;
  padding: 20px;
  border-radius: 4px;
  border: solid 1px #ddd;
  background-color: #fff;
`;

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Title = styled.Text`
  font-size: 14px;
  font-weight: bold;
  text-transform: uppercase;
  color: #444;
`;

export const TextContent = styled.Text`
  font-size: 14px;
  color: #666;
  line-height: 25px;
  margin-top: 15px;
  margin-bottom: 15px;
`;

export const QuestionDate = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #999;
`;
