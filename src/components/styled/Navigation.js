import styled from 'styled-components';
import Color from 'color';

const Navigation = styled.nav`
  overflow: hidden;
  background: ${props => Color(props.theme.colors.primary).grayscale().hex()};
  width: 100%;
  margin-bottom: 10px;
  font-variant: small-caps;
  text-align: center;
  line-height: 60px;
  font-size: 2em;
  font-family: ${props => props.theme.font.trebuchet};
  color: ${props => {
    let background = Color(props.theme.colors.primary).grayscale();
    let base = Color(background.dark() ? 'white' : 'black');
    let alpha = background.light() ? props.theme.alphaDarkText.primary : props.theme.alphaLightText.primary;
    return base.mix(background, alpha).hex();
  }};
  a, span {
    float: left;
    height: 100%;
    padding: 0 0.5em 0 0.5em;
    text-decoration: none;
    color: inherit;
  }
  a:hover {
    background: ${props => Color(props.theme.colors.primary).grayscale().darken(0.5).hex()};
    color: ${props => props.theme.colors.secondary};
  }
  a.nav-active {
    color: ${props => props.theme.colors.secondary};
  }
  img {
    height: 40px;
    vertical-align: text-bottom;
  }
  .menu-toggle {
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
    padding: 0 0.5em 0 0.5em;
    display: none;
  }
  @media (max-width: ${props => props.theme.breakpoints.s}px) {
    .menu-logo {
      padding-right: ${props => props.isMenuHidden ? '0.5em' : '100%'};
    }
    a {
      float: none;
      display: ${props => props.isMenuHidden ? 'none' : 'block'};
      text-align: left;
    }
    a.nav-active {
      float: left;
      display: block;
    }
    .menu-toggle {
      display: block;
    }
  }
`;

export default Navigation;
