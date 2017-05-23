import React from 'react';
import { Link } from 'react-router-dom';
import { css } from 'glamor';
import Color from 'color';

import io from 'socket.io-client';
import feathers from 'feathers/client';
import socketio from 'feathers-socketio/client';

import RxJS from 'rxjs';
import reactive from 'feathers-reactive';

const socket = io('192.168.1.171:3030');
const app = feathers()
  .configure(socketio(socket))
  .configure(reactive(RxJS)); // turns service methods into streams, so .subscribe instead of .then

const events = app.service('events');

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
    standard: '#{Frutiger, "Frutiger Linotype", Univers, Calibri, "Gill Sans", "Gill Sans MT", "Myriad Pro", Myriad, "DejaVu Sans Condensed", "Liberation Sans", "Nimbus Sans L", Tahoma, Geneva, "Helvetica Neue", Helvetica, Arial, sans-serif}',
    impact: '#{Impact, Haettenschweiler, "Franklin Gothic Bold", Charcoal, "Helvetica Inserat", "Bitstream Vera Sans Bold", "Arial Black", sans-serif}',
    trebuchet: '#{"Segoe UI", Candara, "Bitstream Vera Sans", "DejaVu Sans", "Bitstream Vera Sans", "Trebuchet MS", Verdana, "Verdana Ref", sans-serif}',
    verdana: '#{Corbel, "Lucida Grande", "Lucida Sans Unicode", "Lucida Sans", "DejaVu Sans", "Bitstream Vera Sans", "Liberation Sans", Verdana, "Verdana Ref", sans-serif}',
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

// pure CSS template string
// HRM tends to fail; requires refresh
css.insert(`
html, body {
  box-sizing: border-box;
  width: 100%;
  margin: 0;
  padding: 0;
  background-color: ${theme.colors.background};
  color: ${Color(theme.colors.font).mix(Color(theme.colors.background), theme.alpha.primary).hex()};
  color: rgba(${theme.colors.font}, ${theme.alpha.primary});
  font-family: ${theme.font.standard};
  line-height: 100%;
}
@media (max-width: ${theme.breakpoints.s}px) {
  html, body {
    font-size: 18px;
  }
}
@media (min-width: ${theme.breakpoints.s + 1}px) and (max-width: ${theme.breakpoints.m}px) {
  html, body {
    font-size: 20px;
  }
}
@media (min-width: ${theme.breakpoints.m + 1}px) {
  html, body {
    font-size: 24px;
  }
}

*,
*:before,
*:after {
  box-sizing: inherit;
}
`);

const Header = (props) => {
  const styles = css({
    fontSize: '1.5rem',
    background: [
      theme.colors.secondary,
      `linear-gradient(0deg, white, ${Color(theme.colors.secondary).mix(Color('black')).hex()})`
    ],
    width: '100%',
    paddingTop: '20px',
    paddingBottom: '100px',
  });

  const logo = css({
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundImage: 'url(logo.svg)',
    backgroundSize: 'contain',
    [`@media (max-width: ${theme.breakpoints.s}px)`]: {
      height: '240px'
    },
    [`@media (min-width: ${theme.breakpoints.s + 1}px) and (max-width: ${theme.breakpoints.m}px)`]: {
      height: '300px'
    },
    [`@media (min-width: ${theme.breakpoints.m + 1}px)`]: {
      height: '360px'
    }
  });

  return (
    <header {...styles}>
      <div {...logo}>
      </div>
    </header>
  );
}

const Footer = (props) => {
  const styles = css({
    float: 'left',
    position: 'relative',
    fontSize: '0.6rem',
    lineHeight: '1em',
    width: '100%',
    height: '100px',
    background: [
      theme.colors.secondary,
      `linear-gradient(180deg, white, ${Color(theme.colors.secondary).mix(Color('black')).hex()})`
    ],
    '& p': {
      position: 'absolute',
      right: '5%',
      bottom: '10px'
    }
  });

  return (
    <footer {...styles}>
      <p>©2015 RedTape Productions</p>
    </footer>
  );
}

const Navigation = (props) => {
  const styles = css({
    position: 'absolute',
    top: '20px',
    right: '20px',
    '& .icon': {
      margin: '0px',
      padding: '0px'
    }
  });

  return (
    <div {...styles}>
      {props.children}
    </div>
  );
}

const Main = (props) => {
  const styles = css({
    position: 'relative',
    margin: 'auto',
    paddingLeft: '2rem',
    paddingRight: '2rem',
    maxWidth: `${theme.breakpoints.l}px`,
    ':after': {
      content: ' ',
      display: 'table',
      clear: 'both'
    }
  });

  return (
    <main {...styles}>
      {props.children}
    </main>
  );
}

const Article = (props) => {
  const styles = css({
    position: 'relative',
    [`@media (min-width: ${theme.breakpoints.m + 1}px)`]: {
      width: props.splitView ? '40%' : '90%',
      float: 'left',
      marginLeft: '5%',
      marginRight: '5%'
    }
  });

  return (
    <article {...styles}>
      {props.children}
    </article>
  );
}

const IconCharacter = (props) => {
  return (
    <svg width={props.width} height={props.height} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 5v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2H5c-1.11 0-2 .9-2 2zm12 4c0 1.66-1.34 3-3 3s-3-1.34-3-3 1.34-3 3-3 3 1.34 3 3zm-9 8c0-2 4-3.1 6-3.1s6 1.1 6 3.1v1H6v-1z" fill="#607D8B"/>
      <path d="M0 0h24v24H0z" fill="none"/>
    </svg>
  );
}

const IconGoogleDoc = (props) => {
  return (
    <svg width={props.width} height={props.height} viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
      <path d="M41.707,13.793l-11.5-11.5C30.02,2.105,29.766,2,29.5,2H11.491C9.566,2,8,3.561,8,5.479v38.422C8,46.161,9.845,48,12.113,48 h25.774C40.155,48,42,46.161,42,43.901V14.5C42,14.235,41.895,13.98,41.707,13.793z M17,37c-0.552,0-1-0.448-1-1 c0-0.552,0.448-1,1-1s1,0.448,1,1C18,36.552,17.552,37,17,37z M17,32c-0.552,0-1-0.448-1-1c0-0.552,0.448-1,1-1s1,0.448,1,1 C18,31.552,17.552,32,17,32z M17,27c-0.552,0-1-0.448-1-1c0-0.552,0.448-1,1-1s1,0.448,1,1C18,26.552,17.552,27,17,27z M33,37H21v-2 h12V37z M33,32H21v-2h12V32z M33,27H21v-2h12V27z M31.667,14C30.748,14,30,13.252,30,12.333V4.914L39.086,14H31.667z" fill="#2196F3"></path>
    </svg>
  );
}

const IconFacebook = (props) => {
  return (
    <svg width={props.width} height={props.height} viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
      <path d="M1579 128q35 0 60 25t25 60v1366q0 35-25 60t-60 25h-391v-595h199l30-232h-229v-148q0-56 23.5-84t91.5-28l122-1v-207q-63-9-178-9-136 0-217.5 80t-81.5 226v171h-200v232h200v595h-735q-35 0-60-25t-25-60v-1366q0-35 25-60t60-25h1366z" fill="#3B5998"/>
    </svg>
  );
}

const Cards = (props) => {
  const styles = css({
    float: 'right',
    marginBottom: '1em',
    [`@media (max-width: ${theme.breakpoints.m}px)`]: {
      width: '100%'
    },
    [`@media (min-width: ${theme.breakpoints.m + 1}px)`]: {
      marginLeft: '1em'
    }
  });

  return (
    <div {...styles}>
      {props.children}
    </div>
  );
}

const Card = (props) => {
  const style_div = css({
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, .2)',
    transition: '0.3s',
    float: 'right',
    height: '8em',
    [`@media (max-width: ${theme.breakpoints.m}px)`]: {
      width: '50%'
    },
    [`@media (min-width: ${theme.breakpoints.m + 1}px)`]: {
      width: '8em'
    },
    '& svg': {
      display: 'block',
      margin: '0 auto',
      height: '80%'
    },
    '& a': {
      color: 'inherit',
      textDecoration: 'inherit'
    },
    '& p': {
      width: '100%',
      paddingLeft: '0.5em',
      paddingRight: '0.5em',
      margin: '0px',
      textAlign: 'center',
      fontSize: '.8em'
    },
    ':hover': {
      boxShadow: '0 8px 16px 0 rgba(0,0,0,0.2)'
    }
  });

  return (
    <div {...style_div}>
      <a target={props.target} href={props.link}>
        {props.children}
      </a>
    </div>
  );
}

const Welcome = (props) => {
  const styles = css({
    fontSize: '2em',
    lineHeight: '1em',
    fontFamily: theme.font.trebuchet
  });

  return (
    <Article splitView>
      <h1 {...styles}>Welcome!</h1>
      <p>
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
    </Article>
  );
}

const Story = (props) => {
  const styles = css({
    fontSize: '2em',
    lineHeight: '1em',
    fontFamily: theme.font.trebuchet
  });

  return (
    <Article splitView>
      <h1 {...styles}>The Story</h1>
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
    </Article>
  );
}

const Rules = (props) => {
  const styles = css({
    fontSize: '2em',
    lineHeight: '1em',
    fontFamily: theme.font.trebuchet
  });

  return (
    <Article>
      <h1 {...styles}>Game Rules</h1>
      <Cards>
        <Card target="_blank" link="character-sheet.pdf">
          <IconCharacter />
          <p>Character Sheet</p>
        </Card>
        <Card target = "_blank" link="https://docs.google.com/document/d/1qhpAflKwudtAlP0mCH43gbcQifZwSJe7aII-nm1PzeI/edit">
          <IconGoogleDoc />
          <p>Rules Document</p>
        </Card>
      </Cards>
      <p>
        The game's rules are maintained as Google Documents. The rules can be a bit
        intimidating, but people pick them up fairly quickly after a game or two. We use a
        one-page character sheet at game which lists all the common abilities. Printed
        rulebooks are availble at game. Most importantly, if an ability is used on you, it's
        up to the user to explain it if you ask what it does.
      </p>
    </Article>
  );
}

const Contact = (props) => {
  const styles = css({
    fontSize: '2em',
    lineHeight: '1em',
    fontFamily: theme.font.trebuchet
  });

  return (
    <Article>
      <h1 {...styles}>Contact Us</h1>
      <Cards>
        <Card target="_blank" link="https://www.facebook.com/groups/544631092325451/">
          <IconFacebook />
          <p>Facebook Group</p>
        </Card>
      </Cards>
      <p>
        Join us on Facebook! Ask any questions you have there and get answers from both
        players and personel. We've chosen to embrace Facebook as our communication medium
        rather than build our own. Most everyone has an account already, and players have
        appreciated the convenience.
      </p>
    </Article>
  );
}

class Schedule extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      next: ''
    };
  }

  componentDidMount () {
    this.events = events.find().subscribe(events => this.setState({ events: events.data }));
  }

  componentWillUnmount () {
    this.events.unsubscribe();
  }
/*  componentDidMount () {
    events.find( {
      query: {
        $sort: {
          dateStart: -1
        }
      }
    }).subscribe(events => this.setState({events}));
  }*/
  render() {
    const styles_header = css({
      fontSize: '2em',
      lineHeight: '1em',
      fontFamily: theme.font.trebuchet
    });

    const styles_list = css({
      listStyleType: 'none',
      padding: 0,
      margin: 0
    });

    const styles_event = css({
      position: 'relative',
      lineHeight: '2em',
      paddingLeft: '.5em',
      ':hover': {
        backgroundColor: '#cccccc'
      }
    });

    const styles_location = css({
      float: 'right',
      paddingRight: `${.5 / .7}em`,
      fontSize: '.7em'
    });

    if(!this.state){
      return <Article splitView><h1 {...styles_header}>Schedule</h1>Loading...</Article>;
    }
    return (
      <Article splitView>
        <h1 {...styles_header}>Schedule</h1>
        <p>The camp reservations are done yearly.</p>
        <ol {...styles_list}>
          {this.state.events.map((event) => {
            <li {...styles_event} key={event._id}>
              {event.date}
              <span {...styles_location}>{event.location}</span>
            </li>
          })}
        </ol>
        <ol {...styles_list}>
          <li {...styles_event}>
            Jan 20, 2017
            <span {...styles_location}>Camp Ginger Cascades: Rainbow</span>
          </li>
          <li {...styles_event}>
            Mar 3, 2017
            <span {...styles_location}>Camp Ginger Cascades: Rainbow</span>
          </li>
          <li {...styles_event}>
            Mar 31, 2017
            <span {...styles_location}>Camp Ginger Cascades: Rainbow</span>
          </li>
          <li {...styles_event}>
            April 28, 2017
            <span {...styles_location}>Camp Ginger Cascades: Rainbow</span>
          </li>
          <li {...styles_event}>
            May 26, 2017
            <span {...styles_location}>Camp Ginger Cascades: Rainbow</span>
          </li>
          <li {...styles_event}>
            Aug 11, 2017
            <span {...styles_location}>Camp Ginger Cascades: Rainbow</span>
          </li>
          <li {...styles_event}>
            Sep 8, 2017
            <span {...styles_location}>Camp Ginger Cascades: Rainbow</span>
          </li>
          <li {...styles_event}>
            Oct 13, 2017
            <span {...styles_location}>Camp Ginger Cascades: Rainbow</span>
          </li>
          <li {...styles_event}>
            Nov 10, 2017
            <span {...styles_location}>Camp Ginger Cascades: Rainbow</span>
          </li>
          <li {...styles_event}>
            Dec 8, 2017
            <span {...styles_location}>Camp Ginger Cascades: Rainbow</span>
          </li>
        </ol>
      </Article>
    );
  }
}

const Location = (props) => {
  const styles = css({
    fontSize: '2em',
    lineHeight: '1em',
    fontFamily: theme.font.trebuchet
  });

  return (
    <Article splitView>
      <h1 {...styles}>Location</h1>
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
    </Article>
  );
}

export default class Homepage extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <Main>
          <Welcome />
          <Story />
          <Rules />
          <Contact />
          <Schedule />
          <Location />
        </Main>
        <Navigation>
        </Navigation>
        <Footer />
      </div>
    );
  }
}
