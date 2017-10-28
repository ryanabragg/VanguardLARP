import styled from 'styled-components';

import { colorOnBackground } from '../../../util/css-helpers';

import Login from '../Login';

const StyledLogin = styled(Login)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: auto;
  margin-top: 10vh;
  padding: 10px;
  max-width: 500px;
  background-color: ${props => props.theme.colors.background};
  color: ${props => colorOnBackground(props.theme.colors.background, props.theme.alphaLightText.primary, props.theme.alphaDarkText.primary)};
  font-family: ${props => props.theme.font.standard};
  text-decoration: none;
  font-variant: none;
  line-height: 1em;
  font-size: 18px;
  @media (min-width: ${props => props.theme.breakpoints.s + 1}px) and (max-width: ${props => props.theme.breakpoints.m}px) {
    font-size: 20px;
  }
  @media (min-width: ${props => props.theme.breakpoints.m + 1}px) {
    font-size: 24px;
  }

  form {
    display: block;
    margin: 0;
  }

  button {
    display: inline-block;
    margin: 5px auto;
    border: 0;
    border-radius: 3px;
    padding: 0 20px;
    font-size: 18px;
    line-height: 30px;
    background-color: ${props => props.theme.colors.background};
    color: ${props => colorOnBackground(props.theme.colors.background, props.theme.alphaLightText.primary, props.theme.alphaDarkText.primary)};
  }

  button:hover {
    cursor: pointer;
  }

  .logo {
    display: block;
    width: 200px;
    margin: 20px auto;
  }

  .divider {
    display: inline-block;
    position: relative;
    width: 100%;
    margin: 15px 0;
    text-align: center;
    white-space: nowrap;
    line-height: 20px;
    color: ${props => colorOnBackground(props.theme.colors.background, props.theme.alphaLightText.primary, props.theme.alphaDarkText.primary)};
  }
  .divider::before,
  .divider::after {
    content: "";
    position: absolute;
    top: 50%;
    width: 50%;
    height: 1px;
    background: ${props => colorOnBackground(props.theme.colors.background, props.theme.alphaLightText.primary, props.theme.alphaDarkText.primary)};
  }
  .divider::before {
    left: -5%;
  }
  .divider::after {
    right: -5%;
  }

  button[value="facebook"] {
    width: 100%;
    border: 1px solid ${props => props.theme.colors.facebook};
  }

  button[value="submit"] {
    width: 100%;
    border: 1px solid ${props => props.theme.colors.primary};
  }

  label {
    display: block;
  }

  input {
    width: 100%;
    margin-bottom: 5px;
    padding: 5px;
    font-size: 20px;
  }

  span.option-left,
  span.option-right {
    font-size: 0.6em;
    color: ${props => props.theme.colors.asside};
  }

  span.option-left:hover,
  span.option-right:hover {
    cursor: pointer;
  }

  span.option-left {
    float: left;
  }

  span.option-right {
    float: right;
  }
`;

export default StyledLogin;
