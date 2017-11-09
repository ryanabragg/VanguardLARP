import styled from 'styled-components';

import RecordMenu from '../RecordMenu';

const StyledRecordMenu = styled(RecordMenu)`
  display: flex;
  flex-direction: ${props => props.direction == 'vertical' ? 'column' : 'row'};
  position: fixed;
  top: 71px;
  left: 16px;

  div {
    margin: ${props => props.direction == 'vertical' ? '0 0 8px 0' : '0 8px 0 0'};
  }
`;

export default StyledRecordMenu;
