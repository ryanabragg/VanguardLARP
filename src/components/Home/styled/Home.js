import styled from 'styled-components';
import Color from 'color';

import { colorOnBackground } from '../../../util/css-helpers';

const Home = styled.div`
  header {
    position: relative;
    background: ${props => props.theme.colors.secondary};
    background: linear-gradient(0deg, white, ${props => Color(props.theme.colors.secondary).mix(Color('black')).hex()});
    width: 100%;
    padding-top: 20px;
    padding-bottom: 100px;
  }
  div.header-image {
    position: relative;
    max-width: 648px;
    width: 90vw;
    left: 50%;
    transform: translate(-50%, 0);
  }

  footer {
    float: left;
    position: relative;
    width: 100%;
    height: 100px;
    background: ${props => props.theme.colors.secondary};
    background: linear-gradient(180deg, white, ${props => Color(props.theme.colors.secondary).mix(Color('black')).hex()});
    p {
      position: absolute;
      right: 5%;
      bottom: 10px;
      font-size: 0.8em;
      line-height: 1em;
    }
  }

  .title {
    display: inline-block;
    font-size: 2em;
    line-height: 1em;
    margin: 0.5em 0 0.5em 0;
    font-family: ${props => props.theme.font.trebuchet};
  }
  div.title-icon {
    display: inline-block;
    position: static;
    margin: 0.5em 0 0.5em 1em;
    @media (min-width: ${props => props.theme.breakpoints.m + 1}px) {
      position: relative;
      vertical-align: top;
      transform: translate(0, 25%);
    }
  }
  div.title-icon a:hover .icon-label,
  div.title-icon a:focus .icon-label {
    @media (min-width: ${props => props.theme.breakpoints.m + 1}px) {
      display: block;
    }
  }
  .title-icon .icon {
    display: inline-block;
    height: 2em;
    width: 2em;
  }
  .title-icon .icon-label {
    display: inline-block;
    margin: 0 0 0 10px;
    vertical-align: top;
    transform: translate(0, 50%);
    @media (min-width: ${props => props.theme.breakpoints.m + 1}px) {
      display: none;
      position: absolute;
      left: 50%;
      transform: translate(-50%, 0);
      margin: 0;
      padding: 10px;
      border: 1px solid rgba(0,0,0,0.1);
      border-radius: 10px;
      box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
      z-index: 1;
      background-color: ${props => props.theme.colors.background};
      font-size: .8em;
      white-space: nowrap;
    }
  }
  .title-icon a {
    color: inherit;
    text-decoration: inherit;
  }

  .content-container {
    position: relative;
    margin: auto;
    padding-left: 2em;
    padding-right: 2em;
    max-width: ${props => props.theme.breakpoints.l}px;
    background-color: ${props => props.theme.colors.background};
    color: ${props => colorOnBackground(props.theme.colors.background, props.theme.alphaLightText.primary, props.theme.alphaDarkText.primary)};
    font-family: ${props => props.theme.font.standard};
    line-height: 1.2;
    font-size: 18px;
    @media (min-width: ${props => props.theme.breakpoints.s + 1}px) and (max-width: ${props => props.theme.breakpoints.m}px) {
      font-size: 20px;
    }
    @media (min-width: ${props => props.theme.breakpoints.m + 1}px) {
      font-size: 24px;
    }
  }
  .content {
    float: left;
    position: relative;
    @media (min-width: ${props => props.theme.breakpoints.m + 1}px) {
      width: 90%;
      margin-left: 5%;
      margin-right: 5%;
    }
  }
  .column {
    @media (min-width: ${props => props.theme.breakpoints.m + 1}px) {
      width: 40%;
    }
  }

  ol.events {
    list-style-type: none;
    padding: 0;
    margin: 0;
    li {
      line-height: 1.2em;
      padding: 0.5em;
      background: ${props => Color(props.theme.colors.secondary).mix(Color('white'), 0.1).hex()};
    }
    li:nth-child(odd) {
      background: ${props => Color(props.theme.colors.secondary).mix(Color('white'), 0.2).hex()};
    }
    li:hover {
      background: ${props => Color(props.theme.colors.secondary).mix(Color('white'), 0.3).hex()};
    }
    .location {
      display: inline;
      padding-right: ${.5 / .7}em;
      font-size: 0.7em;
      @media (min-width: ${props => props.theme.breakpoints.s + 1}px) and (max-width: ${props => props.theme.breakpoints.m}px) {
        float: right;
      }
      @media (min-width: ${props => props.theme.breakpoints.l + 1}px) {
        float: right;
      }
    }
    .location:before {
      @media (max-width: ${props => props.theme.breakpoints.s}px) {
        content: '';
        display: block;
      }
      @media (min-width: ${props => props.theme.breakpoints.m + 1}px) and (max-width: ${props => props.theme.breakpoints.l}px) {
        content: '';
        display: block;
      }
    }
  }
`;

export default Home;
