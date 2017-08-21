import styled from 'styled-components';
import Color from 'color';

const Navigation = styled.nav`
  display: block;
  width: 100%;
  margin: 0 0 10px 0;
  font-variant: small-caps;
  font-size: 1.5em;
  font-family: ${props => props.theme.font.trebuchet};
  color: ${props => {
    let background = Color(props.theme.colors.primary).grayscale();
    let base = Color(background.dark() ? 'white' : 'black');
    let alpha = background.light() ? props.theme.alphaDarkText.primary : props.theme.alphaLightText.primary;
    return base.mix(background, alpha).hex();
  }};
  background: ${props => Color(props.theme.colors.primary).grayscale().hex()};

  a {
    text-decoration: none;
    color: inherit;
  }
  a.nav-active {
    color: ${props => props.theme.colors.secondary};
  }

  img {
    display: inline-block;
    height: 40px;
    margin: 5px 0 0 0;
  }

  svg {
    fill: ${props => {
      let background = Color(props.theme.colors.primary).grayscale();
      let base = Color(background.dark() ? 'white' : 'black');
      let alpha = background.light() ? props.theme.alphaDarkText.primary : props.theme.alphaLightText.primary;
      return base.mix(background, alpha).hex();
    }};
    height: 20px;
    width: 20px;
  }
  svg:hover {
    fill: ${props => props.theme.colors.secondary};
    cursor: pointer;
  }

  div.menu-item {
    position: relative;
    display: inline-block;
    padding: 0 0.25em 0 0.25em;
    line-height: 50px;
    vertical-align: top;
  }
  div.menu-item:hover {
    cursor: pointer;
    color: ${props => props.theme.colors.secondary};
    fill: ${props => props.theme.colors.secondary};
  }
  div.menu-item:hover > .menu-dropdown {
    display: block;
  }
  div.menu-collapsing {
    display: none;
  }
  div.menu-active {
    color: ${props => props.theme.colors.secondary};
  }

  div.menu-right {
    float: right;
  }

  div.menu-dropdown {
    display: none;
    position: absolute;
    overflow: auto;
    min-width: 200px;
    color: ${props => {
      let background = Color(props.theme.colors.primary).grayscale();
      let base = Color(background.dark() ? 'white' : 'black');
      let alpha = background.light() ? props.theme.alphaDarkText.primary : props.theme.alphaLightText.primary;
      return base.mix(background, alpha).hex();
    }};
    background: ${props => Color(props.theme.colors.primary).grayscale().hex()};
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  }
  div.dropdown-right {
    float: right;
    right: 0;
    text-align: right;
  }

  @media (max-width: ${props => props.theme.breakpoints.s}px) {
    div.menu-item {
      display: none;
    }
    div.menu-display {
      display: block;
    }
    div.menu-collapsing {
      display: inline-block;
      padding: 0;
    }
  }
`;

export default Navigation;
