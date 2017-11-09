import styled from 'styled-components';
import Color from 'color';

import { colorOnBackground } from '../../../util/css-helpers';

import Levels from '../Levels';

const StyledLevels = styled(Levels)`
  display: block;
  font-size: 18px;

  .level {
    width: 100%;
    padding: 5px;
  }
  .level > label {
    display: inline-block;
    width: 30%;
  }
  .level > select {
    display: inline-block;
    width: 70%;
  }

  label.T1,
  label.T2,
  label.T3 {
    display: block;
    width: 100%;
    padding: 5px;
  }
`;

export default StyledLevels;
