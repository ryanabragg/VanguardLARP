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
const theme = {
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
  alpha: {
    primary: 0.87,
    secondary: 0.54,
    hint: 0.38,
    disabled: 0.38,
    dividers: 0.12,
    icon: 0.54,
    iconInactive: 0.26,
  }
};
/*  light: (
    primary: 1,
    secondary: 0.7,
    hint: 0.5,
    disabled: 0.38,
    dividers: 0.12,
    icon: 1,
    icon-inactive: 0.3,
  ),
)*/

module.exports = theme;
