import styled from 'styled-components';
import Color from 'color';

import { colorOnBackground } from '../../../util/css-helpers';

import ModalViewRule from '../ModalViewRule';

const StyledModalViewRule = styled(ModalViewRule)`
  position: relative;
  width: 60vw;
  background: ${props => props.theme.colors.background};
  @media (max-width: ${props => props.theme.breakpoints.m}px) {
    width: 90vw;
  }

  header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 12px;
    padding: 0;

    h1 {
      margin: 0;
      font-size: 32px;
      line-height: 42px;
    }

    [role="button"] {
      height: 42px;
      width: 42px;
    }
  }

  article {
    display: flex;
    flex-direction: column;
    margin: 12px;
    padding: 0;

    p {
      margin: 0 0 10px 0;
    }
  }

  main {
    height: 50vh;
    padding: 0 12px 12px 12px;
    overflow-y: scroll;
  }
`;

export default StyledModalViewRule;
