import styled from 'styled-components';

const Spinner = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  z-index: 1;
  width: ${props => props.size || '150px'};
  height: ${props => props.size || '150px'};
  margin: -${props => ( props.size / 2 ) || '75px'} 0 0 -${props => ( props.size / 2 ) || '75px'};
  border: ${props => props.thickness || '16px'} solid ${props => props.colorOff || '#f3f3f3'};
  border-top: ${props => props.thickness || '16px'} solid ${props => props.color || '#3498db'};
  border-radius: 50%;
  animation: spin 2s linear infinite;
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

export default Spinner;
