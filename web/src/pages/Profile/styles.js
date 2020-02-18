import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  max-width: 600px;
  margin: 50px auto;

  form {
    display: flex;
    flex-direction: column;
    margin-top: 30px;

    label {
      color: #444;
      font-size: 14px;
      font-weight: bold;
      align-self: flex-start;
      margin-bottom: 10px;
      text-transform: uppercase;
    }

    span {
      color: #fb6f91;
      font-weight: bold;
      align-self: flex-start;
      margin: 0 0 10px;
    }

    hr {
      border: 0;
      height: 1px;
      background: rgba(255, 255, 255, 0.2);
      margin: 10px 0 20px;
    }

    input {
      background: #fff;
      border-radius: 4px;
      border: solid 1px #dddddd;
      height: 44px;
      width: 100%;
      padding: 0 15px;
      color: #999;
      margin: 0 0 10px;
    }

    button {
      margin: 5px 0 0;
      height: 44px;
      background: #ee4d64;
      color: #fff;
      border: 0;
      border-radius: 4px;
      font-size: 16px;
      font-weight: bold;
      transition: background 0.2s;

      &:hover {
        background: ${darken(0.08, '#ee4d64')};
      }
    }
  }

  > button {
    width: 100%;
    margin: 10px 0 0;
    height: 44px;
    background: #ccc;
    color: #fff;
    border: 0;
    border-radius: 4px;
    font-size: 16px;
    font-weight: bold;
    transition: background 0.2s;

    &:hover {
      background: ${darken(0.08, '#ccc')};
    }
  }
`;
