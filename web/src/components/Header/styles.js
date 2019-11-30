import styled from 'styled-components';

export const Container = styled.div`
  background: #fff;
  border: solid 1px #ddd;
  padding: 0 30px;
`;

export const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
  max-width: 1440px;
  margin: 0 auto;

  nav {
    display: flex;
    align-items: center;
    min-width: 610px;

    img {
      margin-right: 20px;
      padding-right: 20px;
      border-right: 1px solid #eee;
    }

    a {
      font-size: 15px;
      font-weight: bold;
      color: #999;
      padding: 10px;
      text-decoration: none;
      text-transform: uppercase;
    }
  }

  aside {
    display: flex;
    align-items: center;
  }
`;

export const Profile = styled.div`
  display: flex;
  margin-left: 20px;
  padding-left: 20px;
  border-left: 1px solid #999;

  div {
    text-align: right;
    margin-right: 10px;

    strong {
      display: block;
      font-size: 14px;
      color: #666;
    }

    a {
      display: block;
      margin-top: 2px;
      font-size: 12px;
      color: #999;
    }

    button {
      border: 0;
      color: #de3b3b;
      margin-top: 5px;
      font-size: 14px;
    }
  }

  img {
    height: 32px;
    width: 32px;
    border-radius: 50%;
  }
`;
