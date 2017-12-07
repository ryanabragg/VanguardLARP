import styled from 'styled-components';

import Pools from '../Pools';

const StyledPools = styled(Pools)`
  display: inline-block;
  width: 100%;

  .pool-abilities {
    display: block;
    width: 100%;
    padding: 0;
    margin: 5px 0 10px 0;
  }
  .pool-abilities div {
    display: inline-block;
    width: 130px;
    padding: 0;
    margin: 0 0 0 10px;
    label {
      font-size: 15px;
      line-height: 20px;
    }
  }
`;

export default StyledPools;
