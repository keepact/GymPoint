import styled from 'styled-components/native';

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 46px;
  width: 280px;

  margin-bottom: 15px;
  padding: 20px;
  border-radius: 4px;
  border: solid 1px #dddddd;
  background-color: #ffffff;
`;

export const Left = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #444;
`;

export const Right = styled.Text`
  font-size: 14px;
  color: #666;
`;
