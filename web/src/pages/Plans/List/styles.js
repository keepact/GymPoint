import styled from 'styled-components';

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
    background: none;
  }
`;
