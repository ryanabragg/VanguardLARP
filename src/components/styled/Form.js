import React from 'react';
import styled from 'styled-components';
import Color from 'color';

const Form = styled.form`
  label {
    display: inline;
    font-family: ${props => props.theme.font.verdana};
    line-height: 1.5em;
    font-size: 1.5em;
  }
  input[type=text],
  input[type=url],
  input[type=email],
  input[type=password],
  input[type=tel],
  input[type=date] {
    display: block;
    margin: 0;
    padding: 0 0.5em 0 0.5em;
    width: 100%;
    height: 40px;
    line-height: 1.2em;
    font-size: 1.2em;
    border: 1px solid #bbb;
  }
  input[type=date]::-webkit-inner-spin-button,
  input[type=date]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  input[type=checkbox] {
   width: 44px; height: 44px;
   border-radius: 22px;
   border: 1px solid #bbb;
  }
  input[type=range] {
   width: 100%;
  }
  input[type=range]::-webkit-slider-thumb {
    width: 44px;
    height: 44px;
    background: ${props => props.theme.colors.background};
    background: linear-gradient(to bottom, ${props => props.theme.colors.background} 0%, ${props => props.theme.colors.secondary} 100%);
    border: 1px solid #bbb;
    border-radius: 22px;
  }
  button {
    background-color: ${props => props.theme.colors.secondary};
    color: ${props => Color(Color(props.theme.colors.secondary).dark() ? 'white' : 'black').mix(Color(props.theme.colors.secondary), props.theme.alpha.secondary).hex()};
    font-size: 1.3em;
    padding: 14px 20px;
    margin: 1em 1em 0.5em 0;
    border: none;
    cursor: pointer;
  }
  button:hover {
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  }
  button[value='submit'] {
    background-color: ${props => props.theme.colors.primary};
    color: ${props => Color(Color(props.theme.colors.primary).dark() ? 'white' : 'black').mix(Color(props.theme.colors.primary), props.theme.alpha.primary).hex()};
    //margin: 1em 0 1em 0;
    //width: 100%;
  }
  button[value='delete'] {
    background-color: ${props => props.theme.colors.alert};
    color: ${props => Color(Color(props.theme.colors.alert).dark() ? 'white' : 'black').mix(Color(props.theme.colors.alert), props.theme.alpha.primary).hex()};
  }
`;

export default Form;
