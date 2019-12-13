import styled from 'styled-components';
import { Form, Input } from '@rocketseat/unform';

export const Container = styled.div`
  position: fixed;
  height: 475px;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  width: 450px;

  ::after {
    background: rgba(0, 0, 0, 0.7);
    position: absolute;
    z-index: 2;
    content: '';
    width: 100vw;
    height: 100vh;
    transform: scale(2.5);
  }
`;

export const Content = styled.div`
  position: absolute;
  left: 0;
  right: 25%;
  top: 0;
  bottom: 25%;
  margin: auto;
  border-radius: 4px;
  background: white;
  width: 100%;
  height: 100%;
  margin-top: -10px;
  z-index: 3;
`;

export const FormPopUp = styled(Form)`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: flex-start;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  padding: 20px;

  p {
    font-size: 16px;
    line-height: 1.63;
    padding: 0 14px;
  }

  span {
    align-self: flex-start;
    font-size: 12px;
    font-weight: bold;
    margin-bottom: 10px;
    padding: 5px 14px;
    text-transform: uppercase;
  }

  label {
    font-size: 12px;
    font-weight: bold;
    margin-bottom: 10px;
    align-self: flex-start;
    text-transform: uppercase;
    margin: 15px 0 0 0;
    padding: 0 14px;
  }

  button:last-child {
    background: #ccc;
  }

  button {
    min-width: 390px;
    min-height: 45px;
    border-radius: 4px;
    color: #fff;
    background: #ee4d64;
    margin-top: 5px;

    span {
      color: #fff;
      font-size: 16px;
    }
  }
`;

export const TextArea = styled(Input).attrs({
  multiline: true,
})`
  align-self: left;
  min-width: 390px;
  min-height: 127px;
  margin: 10px 0;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
  padding: 10px;
`;
