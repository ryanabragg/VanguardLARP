import styled from 'styled-components';
import Color from 'color';

const Header = styled.header`
  background: ${props => props.theme.colors.secondary};
  background: linear-gradient(0deg, white, ${props => Color(props.theme.colors.secondary).mix(Color('black')).hex()});
  width: 100%;
  padding-top: 20px;
  padding-bottom: 100px;
`;

export default Header;
