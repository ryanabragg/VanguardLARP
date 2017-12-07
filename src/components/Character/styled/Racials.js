import styled from 'styled-components';
import Color from 'color';

import Racials from '../Racials';

const StyledRacials = styled(Racials)`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 30px;

  label.option {
    display: block;
    margin: 5px 0 0 0;
  }

  div.divider {
    margin: 3px 0;
    height: 1px;
    width: 100%;
    background-color: ${props => Color(props.theme.colors.secondary).grayscale().hex()};
  }
`;

export default StyledRacials;
