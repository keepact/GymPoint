import styled from 'styled-components';

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  tr + tr {
    border-top: 1px solid #eee;
  }

  tr {
    color: #444;
    font-size: 16px;
  }

  thead th {
    text-align: left;
    padding: 40px 40px 0 40px;
    text-transform: uppercase;
  }

  tbody td {
    padding: 10px 20px 10px 40px;
  }

  div {
    display: flex;
    align-items: center;
    width: 50px;
    padding: 10px;
  }

  a {
    text-decoration: none;
    font-size: 15px;
  }

  button {
    font-size: 15px;
    border: 0;
    margin-left: 15px;
    color: #de3b3b;
  }
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

    span {
      margin-right: 15px;
      text-transform: uppercase;
    }

    svg {
      position: absolute;
      margin-top: -2px;
      margin-left: -8px;
    }
  }

  input {
    width: 237px;
    height: 36px;
    border-radius: 4px;
    border: solid 1px #dddddd;
    background-color: #ffffff;
    margin-left: 10px;
    padding: 20px;
  }
`;
