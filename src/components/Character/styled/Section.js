import styled from 'styled-components';

const Section = styled.section`
  position: relative;
  display: inline-block;
  padding: 0;
  margin: 0 auto;
  vertical-align: top;
  width: ${props => {
    let width = props.width || 'xs';
    let factor = props.factor || 1;
    switch(width){
    case 'xl':
      width = props.theme.breakpoints.xl; break;
    case 'l':
      width = props.theme.breakpoints.l; break;
    case 'm':
      width = props.theme.breakpoints.m; break;
    case 's':
      width = props.theme.breakpoints.s; break;
    case 'xs':
      width = props.theme.breakpoints.xs; break;
    default:
      width = typeof width == 'number' ? width : props.theme.breakpoints.xs;
    }
    return (width * factor) - 0; // left and right margin pixels
  }}px;
`;

export default Section;
