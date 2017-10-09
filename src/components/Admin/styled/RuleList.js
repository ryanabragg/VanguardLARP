import styled from 'styled-components';
import Color from 'color';

import RuleList from '../RuleList';

const StyledRuleList = styled(RuleList)`
  display: block;
  width: 100%;
  & > div {
    border-bottom: 1px solid ${props => props.theme.colors.primary};
  }
  div > div {
    display: inline-block;
    height: 1.5em;
    line-height: 1.5em;
    width: 150px;
    margin-left: 15px;
  }
  div > div:first-child {
    width: 250px;
  }
  .placeholder {
    color: lightgrey;
  }
  .record-id {
    float: right;
    position: relative;
  }
  .record-id span {
    position: absolute;
    right: 18px;
    top: 0;
    font-size: 0.6em;
    line-height: 0.6em;
    text-align: right;
    color: ${props => props.theme.colors.primary};
  }
  .record-id svg {
    position: absolute;
    right: 0;
    top: -6px;
    width: 16px;
    height: 16px;
    fill: ${props => props.theme.colors.primary};
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
  input[type="checkbox"] {
    width: 30px;
  }
  fieldset.description > div {
    width: 100%;
  }
  textarea {
    display: block;
    width: 100%;
    max-width: 630px;
  }
  button {
    width: 200px;
    margin: 0 15px 15px 0;
  }
`;

export default StyledRuleList;
