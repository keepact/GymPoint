import styled from 'styled-components';
import { Form } from '@rocketseat/unform';

export const Container = styled.div`
  max-width: ${props => (props.large ? '1440px' : '1200px')};
  width: ${props => (props.small ? '700px' : 'auto')};
  margin: 0 auto;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 10px;
  border-radius: 4px;
  background: #fff;
  max-width: ${props => (props.large ? '1440px' : '1200px')};
  width: ${props => (props.small ? '700px' : 'auto')};
`;

export const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 50px auto 30px auto;

  button {
    color: #fff;
    width: 142px;
    height: 36px;
    border-radius: 4px;
    font-weight: bold;
    font-size: 14px;
    text-transform: uppercase;
  }

  button:first-child {
    background-color: ${props => (props.homepage ? '#ee4d64' : '#ccc')};
    margin-right: 5px;

    &[disabled] {
      opacity: 0.55;
      cursor: not-allowed;
    }
    &[disabled]:hover {
      opacity: 0.55;
    }
    &:hover {
      opacity: 0.7;
    }
  }

  button:last-child {
    background-color: #ee4d64;

    &:hover {
      opacity: 0.7;
    }
  }

  span {
    margin-right: 15px;
    text-transform: uppercase;
  }

  svg {
    position: absolute;
    margin-top: -2px;
    margin-left: -8px;
  }

  input {
    width: 237px;
    height: 36px;
    border-radius: 4px;
    border: solid 1px #ddd;
    background-color: #fff;
    margin-left: 10px;
    padding-left: 15px;
  }
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
    width: 100px;
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

  span {
    margin-left: 10px;
  }
`;

export const ContainerForm = styled.div`
  width: 900px;
  margin: 0 auto;
`;

export const MyForm = styled(Form)`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 24px;

  > label {
    margin-left: 5px;
    align-self: flex-start;
  }

  label {
    padding-top: 8px;
    padding-bottom: 8px;
    font-weight: bold;
    text-transform: uppercase;
  }

  input:nth-of-type(1) {
    margin-bottom: 15px;
  }

  input {
    padding: 0.75em;
    width: 840px;
    height: 45px;
    border-radius: 4px;
    border: solid 1px #ddd;
    margin-bottom: 10px;
  }

  span {
    color: #fb6f91;
    font-weight: bold;
  }
`;

export const NumberInputs = styled.div`
  display: grid;
  margin-top: 20px;
  margin-left: 10px;
  grid-gap: ${props => (props.columns ? '5px' : '10px')};
  grid-template-columns: ${props =>
    props.columns ? '208px 208px 208px 208px' : '275px 275px 275px'};

  input {
    max-width: ${props => (props.columns ? '198px' : '269.3px')};
    margin-top: 5px;
  }

  .label {
    text-transform: lowercase;
    color: #000;
  }

  .gray {
    background: #f5f5f5;
  }
`;

export const EmptyContainer = styled.div`
  background-color: #fff;

  h2 {
    padding: 20px;
    font-size: 16px;
    text-align: center;
  }
`;
