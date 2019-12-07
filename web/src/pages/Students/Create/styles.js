import styled from 'styled-components';

export const Container = styled.div`
  width: 900px;
  margin: 0 auto;

  button:nth-of-type(1) {
    background-color: #ccc;
    margin-right: 10px;
  }
`;

export const Form = styled.form`
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
    background-color: #fff;
  }
`;

export const NumberInputs = styled.div`
  display: grid;
  margin-top: 20px;
  margin-left: 10px;
  grid-gap: 10px;
  grid-template-columns: 275px 275px 275px;

  input {
    max-width: 269.3px;
    margin-top: 5px;
  }
`;
