import React from 'react';
import styled from 'styled-components';
import Color from 'color';

import Modal from '../Modal';

const StyledModal = styled(Modal)`
  position: fixed;
  overflow: auto;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 60px 0 0 0;
  margin: 0;
  z-index: 42;
  ${props => props.noBackdrop ? '' : 'background-color: rgb(0, 0, 0); background-color: rgba(0, 0, 0, 0.3);'}
  span.modal-close {
    position: absolute;
    top: 0;
    right: 0px;
    width: 1em;
    line-height: 1em;
    text-align: center;
    font-size: 40px;
    font-weight: bold;
  }
  span.modal-close:hover,
  span.modal-close:focus {
    cursor: pointer;
    color: ${props => props.theme.colors.primary};
  }
  div.modal-content {
    position: relative;
    width: 80%;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #888;
    background-color: ${props => props.theme.colors.background};
    animation: animatezoom 0.2s
  }
  @keyframes animatezoom {
      from {transform: scale(0)} 
      to {transform: scale(1)}
  }
`;

export default StyledModal;
