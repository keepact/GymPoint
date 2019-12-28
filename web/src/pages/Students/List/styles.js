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
    width: 80px;
    padding: 10px;
  }

  button {
    font-size: 15px;
    border: 0;
    margin-left: 15px;
    background: none;
  }

  button:first-child {
    color: blue;
  }

  button:last-child {
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
