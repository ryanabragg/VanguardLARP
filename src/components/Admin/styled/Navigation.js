import styled from 'styled-components';
import Color from 'color';

const Navigation = styled.nav`
  display: block;
  width: 100%;
  padding: 5px 0 5px 0;
  margin: 0 0 10px 0;
  font-variant: small-caps;
  font-size: 2em;
  font-family: ${props => props.theme.font.trebuchet};
  color: ${props => {
    let background = Color(props.theme.colors.primary).grayscale();
    let base = Color(background.dark() ? 'white' : 'black');
    let alpha = background.light() ? props.theme.alphaDarkText.primary : props.theme.alphaLightText.primary;
    return base.mix(background, alpha).hex();
  }};
  background: ${props => Color(props.theme.colors.primary).grayscale().hex()};
  a, span {
    text-decoration: none;
    color: inherit;
  }
  a:hover {
    color: ${props => props.theme.colors.secondary};
  }
  a.nav-active {
    color: ${props => props.theme.colors.secondary};
  }
  img {
    display: inline-block;
    height: 40px;
    vertical-align: text-bottom;
  }
  div.menu-item, div.menu-current, div.menu-logo, div.menu-user, div.menu-divider {
    display: inline-block;
    padding: 0 0.5em 0 0.5em;
  }
  div.menu-current {
    display: none;
  }
  div.menu-toggle {
    display: none;
    position: absolute;
    top: 15px;
    right: 10px;
    width: 0;
    height: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-top: 10px solid #FFF;
  }
  div.menu-toggle:hover {
    border-top: 10px solid ${props => props.theme.colors.secondary};
    cursor: pointer;
  }
  @media (max-width: ${props => props.theme.breakpoints.s}px) {
    div.menu-item, div.menu-user, div.menu-divider {
      display: none;
    }
    div.show {
      display: block;
    }
    div.menu-current, div.menu-toggle {
      display: inline-block;
      padding: 0;
    }
  }
`;

export default Navigation;
