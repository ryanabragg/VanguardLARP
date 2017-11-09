import styled from 'styled-components';

import EventList from '../EventList';

const StyledEventList = styled(EventList)`
  display: block;
  width: 100%;
  margin: 0 0 16px 0;
  @media (min-width: ${props => props.theme.breakpoints.m}px) {
    width: 80%;
    margin: 0 auto 16px auto;
  }

  & > :first-child {
    border-top: 1px solid ${props => props.theme.colors.primary};
  }
  & > * {
    border-left: 1px solid ${props => props.theme.colors.primary};
    border-right: 1px solid ${props => props.theme.colors.primary};
    border-bottom: 1px solid ${props => props.theme.colors.primary};
  }
  div > div {
    display: inline-block;
    height: 1.5em;
    line-height: 1.5em;
    width: 250px;
    margin-left: 15px;
  }
  div > div:first-child {
    width: 100px;
  }
  .placeholder {
    color: lightgrey;
  }
  form {
    padding: 1em;
  }
  fieldset {
    display: block;
    border: none;
    padding: 0;
  }
  fieldset > div {
    display: inline-block;
    width: 200px;
    margin: 0 15px 1em 0;
  }
  label {
    display: block;
  }
  input {
    width: 100%;
  }
  button {
    width: 200px;
    margin: 0 15px 15px 0;
  }
`;

export default StyledEventList;
