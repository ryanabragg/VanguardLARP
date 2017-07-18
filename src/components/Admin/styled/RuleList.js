import styled from 'styled-components';
import Color from 'color';

const RuleList = styled.div`
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
    display: inline-block;
    height: 1.5em;
    line-height: 1.5em;
    width: 200px;
    margin-left: 15px;
  }
  [data-rule="placeholder"] {
    color: lightgrey;
  }
  form {
    padding: 15px;
    border-bottom: 1px solid ${props => props.theme.colors.primary};
  }
  fieldset {
    display: block;
    border: none;
  }
  label {
    margin-right: 15px;
  }
  input {
    margin-right: 15px;
  }
  fieldset[data-rule="description"] > label {
    display: block;
  }
  fieldset[data-rule="description"] > textarea {
    display: block;
    width: 100%;
  }
`;

export default RuleList;
