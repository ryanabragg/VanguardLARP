import styled from 'styled-components';

import Button from '../Button';

const StyledButton = styled(Button)`
  display: flex;
  flex-flow: ${props => !props.iconRight ? 'row' : 'row-reverse'};
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;

  margin: ${props => props.margin || '0'};
  padding: ${props => props.padding || '5px'};

  ${props => {
    let color = props.theme.newtheme.colors.byType(props.ghost ? 'ghost' : props.type);
    if(props.disabled)
      color = props.theme.newtheme.colors.pale.grey;
    let hover = props.theme.newtheme.colors.darken(color);
    if(props.pressed)
      color = hover;
    return `
      color: ${props.ghost ? color : props.theme.newtheme.colors.typography(color)};
      fill: ${props.ghost ? color : props.theme.newtheme.colors.typography(color, 'icon')};
      background: ${props.ghost ? 'none' : color};
      border: ${props.ghost ? 'none' : props.borderSize || `1px solid ${color}`};
      border-radius: ${props.radius || '0px'};

      :hover,
      :focus {
        color: ${props.ghost ? hover : props.theme.newtheme.colors.typography(hover)};
        fill: ${props.ghost ? hover : props.theme.newtheme.colors.typography(hover, 'icon')};;
        background: ${props.ghost ? 'none' : hover};
        border: ${props.ghost ? 'none' : props.borderSize || `1px solid ${hover}`};
        border-radius: ${props.radius || '0px'};
      }
    `;
  }}

  ${props => props.shadow ? 'box-shadow: 4px 8px 16px rgba(0,0,0,0.4);' : ''}

  a {
    color: inherit;
    text-decoration: none;
  }

  ${props => props.disabled ? '' : ':hover { cursor: pointer; }'}

  svg {
    height: ${props => props.iconSize || '32px'};
    width: ${props => props.iconSize || '32px'};
    fill: inherit;
  }

  > span {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }

  > span[data-button="content"] {
    margin: 0 10px;
  }

  ${props => props.custom || ''}
`;

export default StyledButton;
