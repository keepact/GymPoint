import styled from 'styled-components';

export const Container = styled.div`
  position: fixed;
  height: 425px;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  width: 450px;
  border-radius: 4px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
  background-color: #ffffff;
`;

export const Content = styled.div`
  position: absolute;
  left: 0;
  right: 25%;
  top: 0;
  bottom: 25%;
  margin: auto;
  border-radius: 20px;
  background: white;
  width: 100%;
  height: 100%;
  margin-top: -10px;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;

  span {
    font-size: 12px;
    font-weight: bold;
    align-self: flex-start;
    margin-bottom: 10px;
    text-transform: uppercase;
  }

  label {
    align-self: flex-start;
    font-size: 12px;
    font-weight: bold;
    margin-bottom: 10px;
    text-transform: uppercase;
    margin: 0;
}
  }

  textarea {
    align-self: left;
    width: 390px;
    height: 127px;
  }

  button:last-child {
    background: #ccc;
  }

  button {
    width: 390px;
    height: 45px;
    border-radius: 4px;
    color: #fff;
    background: #ee4d64;

    span {
      color: #fff;
      font-size: 16px;
    }
  }
`;
