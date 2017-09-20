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

const color = {
  base: {
    value: '#FFFFFF',
    contrast: '#000000'
  },
  primary: {
    value: '#003da5',
    contrast: '#FFFFFF'
  },
  secondary: {
    value: '#8bb8e8',
    contrast: '#000000'
  },
  tertiary: {
    value: '#fbd872',
    contrast: '#FFFFFF'
  },
  navigation: {
    value: '#660729',
    contrast: '#FFFFFF'
  },
  accent: {
    value: '#ffcc00',
    contrast: '#FFFFFF'
  },
  asside: {
    value: '#660729',
    contrast: '#000000'
  },
  link: {
    value: '#0a0a0a',
    contrast: '#FFFFFF'
  },
  success: {
    value: '#2daf77',
    contrast: '#FFFFFF'
  },
  error: {
    value: '#ff5c42',
    contrast: '#FFFFFF'
  },
  alert: {
    value: '#fbd872',
    contrast: '#FFFFFF'
  },
  delta: {
    lighten: 5,
    darken: 10,
    blacken: 20
  },
  social: {
    facebook: '#3B5998'
  }
};

const breakpoints = {
  xs: 360,
  s: 600,
  m: 768,
  l: 1024,
  xl: 1600
};

const space = {
  xs: 4,
  s: 8,
  m: 16,
  l: 32,
  xl: 64,
  squish: {
    xs: 2,
    s: 4,
    m: 8,
    l: 16,
    xl: 32
  }
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
    xs: 12,
    s: 14,
    m: 18,
    l: 26,
    xl: 42
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
    monospace: {
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

const theme = {
  color: color,
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
    xs: 360,
    s: 720,
    m: 840,
    l: 1280,
    xl: 1600
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

module.exports = values;
