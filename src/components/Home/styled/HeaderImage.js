import styled from 'styled-components';

const HeaderImage = styled.div`
  background-repeat: no-repeat;
  background-position: center;
  background-image: url(./logo.svg);
  background-size: contain;
  @media (max-width: ${props => props.theme.breakpoints.s}px) {
    height: 240px;
  }
  @media (min-width: ${props => props.theme.breakpoints.s + 1}px) and (max-width: ${props => props.theme.breakpoints.m}px) {
    height: 300px;
  }
  @media (min-width: ${props => props.theme.breakpoints.m + 1}px) {
    height: 360px;
  }
`;

export default HeaderImage;
