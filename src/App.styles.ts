import styled from 'styled-components';

export const AppWrapper = styled.div`
  .app {
    margin: 30vh auto;
    padding: 50px 100px 90px 100px;
    border-radius: 20px;
    background-color: #f1f1f1;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: fit-content;
    height: fit-content;
  }

  .title {
    margin-bottom: 0.5rem;
    font-family: Arial, Helvetica, sans-serif;
  }

  .input {
    font-size: 21px;
    padding: 10px;
    border: 2px solid rgb(35, 96, 197);
    border-radius: 9px;
    width: 7em;
    margin: 10px;
    outline: none;
  }

  select {
    margin-left: 0.5rem;
    font-size: 21px;
    border-radius: 9px;
    border: none;
    background-color: rgba(35, 96, 197, 0.1);
    padding: 10px;
    outline: none;

    &:hover {
      background-color: rgba(35, 96, 197, 0.3);
    }
  }
`;
