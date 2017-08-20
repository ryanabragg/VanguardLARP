import styled from 'styled-components';

import Modal from '../Modal';

const StyledModal = styled(Modal)`
  position: fixed;
  overflow: auto;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 10%;
  margin: 0;
  z-index: 42;
  ${props => props.noBackdrop ? '' : 'background-color: rgb(0, 0, 0); background-color: rgba(0, 0, 0, 0.3);'}
  [data-modal="close-button"] {
    position: absolute;
    top: 0;
    right: 0;
    line-height: 1em;
    text-align: center;
    font-size: 40px;
    font-weight: bold;
  }
  [data-modal="close-button"]:hover,
  [data-modal="close-button"]:focus {
    cursor: pointer;
    color: ${props => props.theme.colors.primary};
  }
  div[data-modal="content"] {
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

export default StyledModal;
