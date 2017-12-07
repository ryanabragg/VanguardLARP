import styled from 'styled-components';
import Color from 'color';

import { colorOnBackground } from '../../../util/css-helpers';

import Ability from '../Ability';

const StyledAbility = styled(Ability)`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  min-height: 30px;
  margin: 0;
  padding: 0;

  .checkbox {
    height: 24px;
    width: 24px;
    margin: 3px;
    fill: ${props => props.theme.colors.primary};
    &:hover {
      cursor: pointer;
      fill: ${props => props.theme.colors.accent};
    }
  }

  .count {
    tabindex: 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    height: 26px;
    width: 26px;
    margin: 2px;
    border-radius: 5%;
    border: 2px solid ${props => props.theme.colors.primary};
    &:hover,
    &:focus {
      border: 2px solid ${props => props.theme.colors.accent};
    }
    &:hover + .controls,
    &:focus + .controls {
      display: flex;
    }
  }

  .controls {
    display: none;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    position: absolute;
    top: -18px;
    left: 20px;
    height: 68px;
    z-index: 2;
    &:hover,
    &:focus {
      display: flex;
    }
  }

  .show {
    display: flex;
  }

  .click-overlay {
    position: fixed;
    top: 0;
    bottom : 0;
    left: 0;
    right: 0;
    z-index: 1;
  }

  .uses {
    tabindex: 0;
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    height: 30px;
    width: 30px;
    &:hover .per,
    &:focus .per {
      display: flex;
    }
  }
  .per {
    display: none;
    position: absolute;
    top: 25px;
    left: 25px;
    width: max-content;
    z-index: 2;
    padding: 0 10px;
    font-size: 18px;
    line-height: 30px;
    background: ${props => props.theme.colors.background};
    border-radius: 0 10px 10px 10px;
    &:hover,
    &:focus {
      display: flex;
    }
  }
  .short-recovery {
    label {
      color: ${props => props.theme.colors.grey};
    }
    span {
      border: 2px solid ${props => props.theme.colors.grey};
    }
  }
  .long-recovery {
    span {
      border: 2px solid ${props => colorOnBackground(Color(props.theme.colors.background).grayscale().hex(), props.theme.alphaLightText.primary, props.theme.alphaDarkText.primary)};
    }
  }
  .event {
    label {
      color: ${props => props.theme.colors.primary};
    }
    span {
      border: 2px solid ${props => props.theme.colors.primary};
    }
  }

  label {
    font-size: 18px;
    line-height: 30px;
  }
`;

export default StyledAbility;
