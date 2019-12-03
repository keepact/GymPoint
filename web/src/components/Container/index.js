import styled from 'styled-components';

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 10px;
  border-radius: 4px;
  background: #fff;
  max-width: 1200px;
`;

export const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 50px auto 30px auto;

  button {
    width: 142px;
    height: 36px;
    border-radius: 4px;
    background-color: #ee4d64;
    color: #fff;
    font-weight: bold;
  }

  input {
    width: 237px;
    height: 36px;
    border-radius: 4px;
    border: solid 1px #dddddd;
    background-color: #ffffff;
    margin-left: 10px;

    &::placeholder {
      padding-left: 30px;
    }
  }
`;
