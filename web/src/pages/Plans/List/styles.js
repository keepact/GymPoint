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

    span {
      text-transform: lowercase;
    }
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
