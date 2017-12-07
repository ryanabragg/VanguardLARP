import styled from 'styled-components';

import AbilityGroup from '../AbilityGroup';

const StyledAbilityGroup = styled(AbilityGroup)`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 30px;

  label.tier {
    display: inline-block;
    position: relative;
    width: 100%;
    font-size: 0.8em;
    text-align: center;
  }
  label.tier::before,
  label.tier::after {
    content: "";
    position: absolute;
    top: 35%;
    width: 20%;
    height: 1px;
    background: ${props => props.theme.colors.secondary};
  }
  label.tier::before {
    left: 20%;
  }
  label.tier::after {
    right: 20%;
  }
`;

export default StyledAbilityGroup;
