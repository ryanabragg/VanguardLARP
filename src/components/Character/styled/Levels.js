import styled from 'styled-components';
import Color from 'color';

import { colorOnBackground } from '../../../util/css-helpers';

import Levels from '../Levels';

const StyledLevels = styled(Levels)`
  position: absolute;
  top: 0;
  right: 0;
  font-size: 18px;

  .icon {
    position: absolute;
    top: 7px;
    right: 5px;
    width: 24px;
    height: 24px;
  }
  .icon:hover > svg {
    fill: ${props => props.theme.colors.secondary};
  }

  .icon:hover {
    cursor: pointer;
    background: ${props => colorOnBackground(Color(props.theme.colors.primary).grayscale().hex(), props.theme.alphaLightText.primary, props.theme.alphaDarkText.primary)};
  }

  .icon:hover > .dropdown,
  .dropdown.show {
    display: block;
  }
  .dropdown {
    position: absolute;
    display: none;
    z-index: 2;
    float: right;
    right: 0;
    width: ${props => props.theme.breakpoints.xs}px;
    background: ${props => props.theme.colors.background};
    cursor: auto;
  }

  div.level {
    display: block;
    margin: 5px;
    width: ${props => props.theme.breakpoints.xs - 10}px;
    padding: 5px 10px;
    color: ${props => colorOnBackground(Color(props.theme.colors.background).grayscale().hex(), props.theme.alphaLightText.primary, props.theme.alphaDarkText.primary)};
  }
  div.level > label {
    display: inline-block;
    width: 25%;
  }
  div.level > select {
    display: inline-block;
    width: 75%;
  }

  label.T1,
  label.T2,
  label.T3 {
    display: block;
    margin: 5px;
    width: ${props => props.theme.breakpoints.xs - 10}px;
    padding: 5px 10px;
    background-color: ${props => props.theme.colors.warning};
    color: ${props => colorOnBackground(Color(props.theme.colors.background).grayscale().hex(), props.theme.alphaLightText.primary, props.theme.alphaDarkText.primary)};
    border: 1px solid ${props => Color(props.theme.colors.warning).mix(Color('black'), 0.5).hex()};
    border-radius: 10px;
  }
`;

export default StyledLevels;
