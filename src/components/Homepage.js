import React from 'react';
import { Link } from 'react-router-dom';
import injectSheet from 'react-jss';
import Color from 'color';

import Schedule from './Schedule';

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
const colors = {
  'primary': '#003da5',
  'secondary': '#8bb8e8',
  'accent': '#ffcc00',
  'asside': '#660729',
  'success': '#2daf77',
  'warning': '#fbd872',
  'alert': '#ff5c42',
  'link': '#0a0a0a',
  'black': '#000000',
  'white': '#ffffff',
  'grey': '#808080',
};

const breakpoints = {
  '0': 0,
  'xs': 360,
  's': 720,
  'm': 840,
  'l': 1280,
  'xl': 1600
};

/*
$typography: (
  'font-family': (
    'standard': #{Frutiger, "Frutiger Linotype", Univers, Calibri, "Gill Sans", "Gill Sans MT", "Myriad Pro", Myriad, "DejaVu Sans Condensed", "Liberation Sans", "Nimbus Sans L", Tahoma, Geneva, "Helvetica Neue", Helvetica, Arial, sans-serif},
    'impact': #{Impact, Haettenschweiler, "Franklin Gothic Bold", Charcoal, "Helvetica Inserat", "Bitstream Vera Sans Bold", "Arial Black", sans-serif},
    'trebuchet': #{"Segoe UI", Candara, "Bitstream Vera Sans", "DejaVu Sans", "Bitstream Vera Sans", "Trebuchet MS", Verdana, "Verdana Ref", sans-serif},
    'verdana': #{Corbel, "Lucida Grande", "Lucida Sans Unicode", "Lucida Sans", "DejaVu Sans", "Bitstream Vera Sans", "Liberation Sans", Verdana, "Verdana Ref", sans-serif},
  ),
  'dark': (
    'color': #000,
    'primary': 0.87,
    'secondary': 0.54,
    'hint': 0.38,
    'disabled': 0.38,
    'dividers': 0.12,
    'icon': 0.54,
    'icon-inactive': 0.26,
  ),
  'light': (
    'color': #fff,
    'primary': 1,
    'secondary': 0.7,
    'hint': 0.5,
    'disabled': 0.38,
    'dividers': 0.12,
    'icon': 1,
    'icon-inactive': 0.3,
  ),
)

@function unitless($value) {
  @return $value / ($value * 0 + 1);
}

@function map-get-deep($map, $keys...) {
    @each $key in $keys {
        $map: map-get($map, $key);
    }
    @return $map;
}

@mixin fluid-type($min-vw, $max-vw, $min-font-size, $max-font-size) {
  $u1: unit($min-vw);
  $u2: unit($max-vw);
  $u3: unit($min-font-size);
  $u4: unit($max-font-size);

  @if $u1 == $u2 and $u1 == $u3 and $u1 == $u4 {
    & {
      font-size: $min-font-size;
      @media screen and (min-width: $min-vw) {
        font-size: calc(#{$min-font-size} + #{unitless($max-font-size - $min-font-size)} * ((100vw - #{$min-vw}) / #{unitless($max-vw - $min-vw)}));
      }
      @media screen and (min-width: $max-vw) {
        font-size: $max-font-size;
      }
    }
  }
}

@mixin rgba($property, $color: black, $opacity: 0.75, $mix: white) {
  #{$property}: mix($color, $mix, $opacity * 100%);
  #{$property}: rgba($color, $opacity);
}
*/

const styles = {
  '@global': {
    html: {
      boxSizing: 'border-box',
      height: '100%',
      width: '100%',
      margin: 0,
      padding: 0,
      [`@media (max-width: ${breakpoints.s}px)`]: {
        fontSize: '18px',
      },
      [`@media (min-width: ${breakpoints.s + 1}px) and (max-width: ${breakpoints.m}px)`]: {
        fontSize: '20px',
      },
      [`@media (min-width: ${breakpoints.m + 1}px)`]: {
        fontSize: '24px',
      },
      lineHeight: '100%',
      //fontFamily: map-get-deep($typography, 'font-family', 'standard'),
      //@include rgba('color', map-get-deep($typography, 'dark', 'color'), map-get-deep($typography, 'dark', 'primary')),
    },
    a: {
      textDecoration: 'underline'
    }
  },
  header: {
    background: `linear-gradient(0deg, white, ${Color(colors.secondary).mix(Color('black'))}`,
    fallbacks: {
      background: {
        color: `${Color(colors.secondary).mix(Color('grey'))}`,
        repeat: 'no-repeat',
        position: 'center',
      }
    },
    width: '100%',
    paddingTop: '20px',
    paddingBottom: '100px',
    fontSize: '1.5rem',
    textAlign: 'center'
  },
  headerImage: {
    background: {
      image: 'url(dist/logo.svg)',
      size: 'contain',
      repeat: 'no-repeat',
      position: 'center',
    },
    width: '100%',
    height: '300px',
    [`@media (max-width: ${breakpoints.s}px)`]: {
      height: '240px'
    },
    [`@media (min-width:${breakpoints.s + 1}px) and (max-width: ${breakpoints.m}px)`]: {
      height: '300px'
    },
    [`@media (min-width: ${breakpoints.s + 1}px)`]: {
      height: '360px'
    },
  }
};

class Homepage extends React.Component {
  render() {
    return (
      <div>
        <div className={this.props.classes.header}>
          <div className={this.props.classes.headerImage}>
          </div>
        </div>
        <main>
          <div className='container'>
            <article className='grid-item'>
              <h1>Welcome!</h1>
              <p><Link to='/'>home</Link><Link to='/admin'>admin</Link>
                We are a boffer steampunk fantasy fusion game geared towards
                making the player feel epic from the start. That seems like a mouthful, but in truth,
                you get to be what you want to be, in whatever way you want to be. Our game mechanics
                use a classless system allowing any player to take any skill, provided they have the
                requirements. You want to throw fireballs <em>and</em> be good with a sword? No problem!
              </p>
              <p>
                A Steampunk setting means a lot of things to a lot of people; to us it means you can
                dress in a lot of cool ways, and we can mix our fantasy stories with an Old West feel
                or Victorian zombie hunting stories. A broad scope is allowed for any given character
                to be unique.
              </p>
              <p>
                The game usually takes place at beautiful Camp Ginger Cascades in Lenior, NC. We have
                electricity in all cabins, heaters are provided during the winter, showers,
                and a kitchen in each camp area. You can bring your own food, or buy in on meals
                (check the Facebook event for details).
              </p>
            </article>
            <article className='grid-item'>
              <h1>The Story</h1>
              <p>
                One thousand years ago, the beings now considered myth vanished. Technology has
                grown, and the world has shrunk as travel has expanded beyond foot and hoof. A
                strangely glowing blue stone mined from the earth serves as the primary power source.
                It can be used to move an airship, power machinery, or even make a simple
                sword into a mechanical wonder. Each nation has an ever-growing demand for more.
              </p>
              <p>
                To aid in this, the Faith--the largest landowner in the Empire--has for the first
                time in over 500 years opened up some of it's land to be mined - the Dragon’s
                Spine Mountains. The main base for mining is the town of Jacob’s Spire. It is close to
                Hadrian's Wall - a great wall separating the Empire from the Ill'Andar Nation.
                Recently the town has been plagued by strange creatures and events the likes of which
                have not been seen in a millenium.
              </p>
            </article>
            <article className='grid-span'>
              <h1>Game Rules</h1>
              <div className='card'>
                <a target="_blank" className='nostyle' href="character-sheet.pdf">
                  <svg className='character' width='24' height='24' viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 5v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2H5c-1.11 0-2 .9-2 2zm12 4c0 1.66-1.34 3-3 3s-3-1.34-3-3 1.34-3 3-3 3 1.34 3 3zm-9 8c0-2 4-3.1 6-3.1s6 1.1 6 3.1v1H6v-1z"/>
                    <path d="M0 0h24v24H0z" fill="none"/>
                  </svg>
                  <p>Character Sheet</p>
                </a>
              </div>
              <div className='card'>
                <a target="_blank" className='nostyle' href="https://docs.google.com/document/d/1qhpAflKwudtAlP0mCH43gbcQifZwSJe7aII-nm1PzeI/edit">
                  <svg className='googledoc' width='50' height='50' viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
                    <path d="M41.707,13.793l-11.5-11.5C30.02,2.105,29.766,2,29.5,2H11.491C9.566,2,8,3.561,8,5.479v38.422C8,46.161,9.845,48,12.113,48 h25.774C40.155,48,42,46.161,42,43.901V14.5C42,14.235,41.895,13.98,41.707,13.793z M17,37c-0.552,0-1-0.448-1-1 c0-0.552,0.448-1,1-1s1,0.448,1,1C18,36.552,17.552,37,17,37z M17,32c-0.552,0-1-0.448-1-1c0-0.552,0.448-1,1-1s1,0.448,1,1 C18,31.552,17.552,32,17,32z M17,27c-0.552,0-1-0.448-1-1c0-0.552,0.448-1,1-1s1,0.448,1,1C18,26.552,17.552,27,17,27z M33,37H21v-2 h12V37z M33,32H21v-2h12V32z M33,27H21v-2h12V27z M31.667,14C30.748,14,30,13.252,30,12.333V4.914L39.086,14H31.667z"></path>
                  </svg>
                  <p>Rules Document</p>
                </a>
              </div>
              <p>
                The game's rules are maintained as Google Documents. The rules can be a bit
                intimidating, but people pick them up fairly quickly after a game or two. We use a
                one-page character sheet at game which lists all the common abilities. Printed
                rulebooks are availble at game. Most importantly, if an ability is used on you, it's
                up to the user to explain it if you ask what it does.
              </p>
            </article>
            <article className='grid-span'>
              <h1>Contact Us</h1>
                <div className='card'>
                  <a target="_blank" className='nostyle' href="https://www.facebook.com/groups/544631092325451/">
                    <svg className='facebook' width='1792' height='1792' viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1579 128q35 0 60 25t25 60v1366q0 35-25 60t-60 25h-391v-595h199l30-232h-229v-148q0-56 23.5-84t91.5-28l122-1v-207q-63-9-178-9-136 0-217.5 80t-81.5 226v171h-200v232h200v595h-735q-35 0-60-25t-25-60v-1366q0-35 25-60t60-25h1366z"/>
                    </svg>
                    <p>Facebook Group</p>
                  </a>
                </div>
                <p>
                  Join us on Facebook! Ask any questions you have there and get answers from both
                  players and personel. We've chosen to embrace Facebook as our communication medium
                  rather than build our own. Most everyone has an account already, and players have
                  appreciated the convenience.
                </p>
            </article>
            <article className='grid-item'>
              <h1>Schedule</h1>
              <div>
                next event
              </div>
              <p>The camp reservations are done yearly.</p>
              <Schedule />
            </article>
            <article className='grid-item'>
              <h1>Location</h1>
              <p className='location-address'>2090 Scout Rd, Lenoir, North Carolina 28645</p>
              <div className='location-detail'>
                <p>
                  Note that Scout Road turns into a gravel road at the camp entrance,
                  while the paved road curves left. See <a target="_blank" href='https://www.google.com/maps/@35.9480276,-81.3864486,265m/data=!3m1!1e3?hl=en-US'>here</a> for a visual.
                </p>
                <p>
                  After the entrance, keep going until you see a fork in the road and turn left.
                  Parking is on the right after a short distance, but to unload your vehicles continue
                  along the left, at which point you are on a one-way road that will eventually
                  take you back to the previous fork and the parking lot.
                </p>
                <p>
                  Drive slowly. The road is narrow, fairly steep, and weather worn.
                </p>
                <p>
                  Mushroom is the first camp area. Rainbow is the second.
                  After Rainbow there is an eventual intersection with
                  Hilltop on the right and Rocky Ridge on the left.
                  Going straight will pass though camp HQ and complete the circle.
                </p>
              </div>
            </article>
          </div>
        </main>
        <nav className='navbar'>
        </nav>
        <div className='footer'>
          <p>
            ©2015 RedTape Productions
          </p>
        </div>
      </div>
    );
  }
}

export default injectSheet(styles)(Homepage);
