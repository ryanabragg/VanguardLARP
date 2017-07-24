import styled from 'styled-components';
import Color from 'color';

import EventList from '../EventList';

const StyledEventList = styled(EventList)`
  display: block;
  width: 100%;
  & > div {
    border-bottom: 1px solid ${props => props.theme.colors.primary};
  }
  div > div {
    display: inline-block;
    height: 1.5em;
    line-height: 1.5em;
    width: 100px;
    margin-left: 15px;
  }
  div > div:first-child {
    width: 200px;
  }
  .placeholder {
    color: lightgrey;
  }
  form {
    padding: 1em;
    border-bottom: 1px solid ${props => props.theme.colors.primary};
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
