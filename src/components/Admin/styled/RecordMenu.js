import styled from 'styled-components';

import RecordMenu from '../RecordMenu';

const StyledRecordMenu = styled(RecordMenu)`
  position: fixed;
  top: 71px;
  left: 16px;
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  @media (max-width: ${props => props.theme.breakpoints.s}px) {
    top: auto;
    left: auto;
    bottom: 16px;
    right: 16px;
    justify-content: flex-end;
    align-items: flex-end;
  }
  transition: top 0.2s ease-in-out;

  span[data-button="content"] {
    display: none;
  }
  button:hover {
    > span[data-button="content"] {
      display: flex;
    }
  }
`;

export default StyledRecordMenu;
