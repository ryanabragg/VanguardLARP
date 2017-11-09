/* Colors From LA
$maroon: #643335;
$cream: #f1e6b2;
$flesh: #f3cfb3;
$pale-yellow: #fbd872;
$royal: #003da5;
$light-blue: #8bb8e8;
*/
/* Colors from logo
$logo: #660729;
$logo-back: #efd2ad;
*/

import Color from 'color';

const breakpoints = {
  xxs: 180,
  xs: 360,
  s: 600,
  m: 768,
  l: 1024,
  xl: 1280,
  xxl: 1600
};

const space = {
  xxs: 2,
  xs: 4,
  s: 8,
  m: 16,
  l: 32,
  xl: 64,
  squish: (size) => size/2,
  stretch: (size) => size*1.5,
  inset: (size, mod=(v)=>v) => mod(size) + 'px ' + size + 'px',
  inline: (size) => '0 ' + size + 'px 0 0',
  stack: (size) => '0 0 ' + size + 'px 0'
};

const layers = {
  hidden: -1,
  low: 2,
  mid: 4,
  high: 8,
  super: 16
};

const typography = {
  size: {
    xs: 8,
    s: 12,
    m: 16,
    l: 20,
    xl: 24,
    xxl: 32
  },
  style: {
    sans: {
      light: 'Frutiger, "Frutiger Linotype", Univers, Calibri, "Gill Sans", "Gill Sans MT", "Myriad Pro", Myriad, "DejaVu Sans Condensed", "Liberation Sans", "Nimbus Sans L", Tahoma, Geneva, "Helvetica Neue", Helvetica, Arial, sans-serif',
      medium: 'Corbel, "Lucida Grande", "Lucida Sans Unicode", "Lucida Sans", "DejaVu Sans", "Bitstream Vera Sans", "Liberation Sans", Verdana, "Verdana Ref", sans-serif',
      heavy: 'Impact, Haettenschweiler, "Franklin Gothic Bold", Charcoal, "Helvetica Inserat", "Bitstream Vera Sans Bold", "Arial Black", sans-serif'
    },
    serif: {
      light: '"Palatino Linotype", Palatino, Palladio, "URW Palladio L", "Book Antiqua", Baskerville, "Bookman Old Style", "Bitstream Charter", "Nimbus Roman No9 L", Garamond, "Apple Garamond", "ITC Garamond Narrow", "New Century Schoolbook", "Century Schoolbook", "Century Schoolbook L", Georgia, serif',
      medium: 'Cambria, "Hoefler Text", Utopia, "Liberation Serif", "Nimbus Roman No9 L Regular", Times, "Times New Roman", serif',
      heavy: 'Constantia, "Lucida Bright", Lucidabright, "Lucida Serif", Lucida, "DejaVu Serif", "Bitstream Vera Serif", "Liberation Serif", Georgia, serif'
    },
    mono: {
      light: 'Consolas, "Andale Mono WT", "Andale Mono", "Lucida Console", "Lucida Sans Typewriter", "DejaVu Sans Mono", "Bitstream Vera Sans Mono", "Liberation Mono", "Nimbus Mono L", Monaco, "Courier New", Courier, monospace',
      medium: 'Consolas, "Andale Mono WT", "Andale Mono", "Lucida Console", "Lucida Sans Typewriter", "DejaVu Sans Mono", "Bitstream Vera Sans Mono", "Liberation Mono", "Nimbus Mono L", Monaco, "Courier New", Courier, monospace',
      heavy: 'Consolas, "Andale Mono WT", "Andale Mono", "Lucida Console", "Lucida Sans Typewriter", "DejaVu Sans Mono", "Bitstream Vera Sans Mono", "Liberation Mono", "Nimbus Mono L", Monaco, "Courier New", Courier, monospace'
    }
  },
  alpha: {
    light: {
      primary: 1,
      secondary: 0.7,
      hint: 0.5,
      disabled: 0.38,
      dividers: 0.12,
      icon: 1,
      inactive: 0.3
    },
    dark: {
      primary: 0.87,
      secondary: 0.54,
      hint: 0.38,
      disabled: 0.38,
      dividers: 0.12,
      icon: 0.54,
      inactive: 0.26
    }
  }
};

const colors = {
  white: '#ffffff',
  grey: '#0f0f0f',
  black: '#000000',
  red: '#000000',
  green: '#000000',
  blue: '#003da5',
  yellow: '#660729',
  pale: {
    grey: '#0a0a0a',
    red: '#ff5c42',
    green: '#2daf77',
    blue: '#8bb8e8',
    yellow: '#fbd872',
  },
  accent: '#ffcc00',
  asside: '#660729',
  link: '#0a0a0a',
  success: '#2daf77',
  error: '#ff5c42',
  alert: '#fbd872',
  delta: {
    lighten: 5,
    darken: 10,
    blacken: 20
  },
  external: {
    facebook: '#3B5998'
  },
  typography: (background, type='primary') => {
    let bg = Color(background);
    let alpha = (bg.light() ? typography.alpha.dark[type] : typography.alpha.light[type]) || 1;
    return Color(bg.light() ? 'black' : 'white').mix(bg, alpha).hex();
  }
};

const theme = {
  colors: colors,
  breakpoints: breakpoints,
  space: space,
  layers: layers,
  typography: typography
};

const values = {
  colors: {
    font: '#000000',
    background: '#FFFFFF',
    primary: '#003da5',
    secondary: '#8bb8e8',
    accent: '#ffcc00',
    asside: '#660729',
    success: '#2daf77',
    warning: '#fbd872',
    alert: '#ff5c42',
    link: '#0a0a0a',
    facebook: '#3B5998'
  },
  breakpoints: {
    null: 0,
    xs: 320,
    s: 720,
    m: 840,
    l: 1024,
    xl: 1280,
    xxl: 1600
  },
  font: {
    standard: 'Frutiger, "Frutiger Linotype", Univers, Calibri, "Gill Sans", "Gill Sans MT", "Myriad Pro", Myriad, "DejaVu Sans Condensed", "Liberation Sans", "Nimbus Sans L", Tahoma, Geneva, "Helvetica Neue", Helvetica, Arial, sans-serif',
    impact: 'Impact, Haettenschweiler, "Franklin Gothic Bold", Charcoal, "Helvetica Inserat", "Bitstream Vera Sans Bold", "Arial Black", sans-serif',
    trebuchet: '"Segoe UI", Candara, "Bitstream Vera Sans", "DejaVu Sans", "Bitstream Vera Sans", "Trebuchet MS", Verdana, "Verdana Ref", sans-serif',
    verdana: 'Corbel, "Lucida Grande", "Lucida Sans Unicode", "Lucida Sans", "DejaVu Sans", "Bitstream Vera Sans", "Liberation Sans", Verdana, "Verdana Ref", sans-serif',
  },
  alphaDarkText: {
    primary: 0.87,
    secondary: 0.54,
    hint: 0.38,
    disabled: 0.38,
    dividers: 0.12,
    icon: 0.54,
    iconInactive: 0.26,
  },
  alphaLightText: {
    primary: 1,
    secondary: 0.7,
    hint: 0.5,
    disabled: 0.38,
    dividers: 0.12,
    icon: 1,
    iconInactive: 0.3,
  }
};

export default values;
