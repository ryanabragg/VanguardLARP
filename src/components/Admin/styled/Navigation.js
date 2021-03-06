import styled from 'styled-components';
import Color from 'color';

import { colorOnBackground } from '../../../util/css-helpers';

import Navigation from '../Navigation';

const StyledNavigation = styled(Navigation)`
  display: block;
  height: 50px;
  width: 100%;
  margin: 0 0 1em 0;
  padding: 0;

  nav {
    position: fixed;
    top: 0;
    z-index: 1;
    display: inline-flex;
    flex-direction: columns;
    align-items: flex-start;
    @media (max-width: ${props => props.theme.breakpoints.s}px) {
      justify-content: space-around;
    }
    width: 100%;
    background: ${props => Color(props.theme.colors.primary).grayscale().hex()};
    transition: top 0.2s ease-in-out;
  }

  nav.hide {
    top: -60px;
  }

  a {
    display: block;
    text-decoration: none;
    color: inherit;
  }
  a:hover,
  a:focus {
    color: ${props => props.theme.colors.secondary};
    cursor: pointer;
  }
  a:hover svg,
  a:focus svg {
    fill: ${props => props.theme.colors.secondary};
  }
  a.nav-active svg {
    fill: ${props => props.theme.colors.secondary};
  }
  svg {
    height: 40px;
    width: 40px;
    margin: 5px;
    fill: ${props => colorOnBackground(Color(props.theme.colors.primary).grayscale().hex(), props.theme.alphaLightText.primary, props.theme.alphaDarkText.primary)};
  }
`;

export default StyledNavigation;
