import React from 'react';

import app from '../../util/feathersApp';

import IconCharacter from '../svg/Character';
import IconFacebook from '../svg/Facebook';
import IconGoogleDoc from '../svg/GoogleDoc';

import EventsList from './styled/EventsList';

import Article from './styled/Article';
import Card from './styled/Card';
import Cards from './styled/Cards';
import Footer from './styled/Footer';
import H1 from './styled/H1';
import Header from './styled/Header';
import HeaderImage from './styled/HeaderImage';
import Main from './styled/Main';
import Navigation from './styled/Navigation';

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      events: []
    };
  }

  componentDidMount() {
    let startDate = (new Date()).toJSON().slice(0, 10); // get the 'YYYY-MM-DD' from the JSON date string
    app.service('events').find({
      query: {
        date: {
          $gte: startDate
        },
        $sort: {
          date: 1
        },
        $limit: 12,
        $skip: 0
      }
    }).then(events => {
      this.setState({events: events.data});
    });
  }

  render() {
    return (
      <div>
        <Header>
          <HeaderImage />
        </Header>
        <Main>
          <Article splitView>
            <H1>Welcome!</H1>
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
          <Article splitView>
            <H1>The Story</H1>
            <p>
              One thousand years ago, the beings now considered myth vanished. Technology has
              grown, and the world has shrunk as travel has expanded beyond foot and hoof. A
              strangely glowing blue stone mined from the earth serves as the primary power source.
              It can be used to move an airship, power machinery, or even make a simple
              sword into a mechanical wonder. Each nation has an ever-growing demand for more.
            </p>
            <p>
              To aid in this, the Faith—the largest landowner in the Empire—has for the first
              time in over 500 years opened up some of it&apos;s land to be mined: the Dragon’s
              Spine Mountains. The main base for mining is the town of Jacob’s Spire. It is close to
              Hadrian&apos;s Wall, a great wall separating the Empire from the Ill&apos;Andar Nation.
              Recently the town has been plagued by strange creatures and events the likes of which
              have not been seen in a millenium.
            </p>
          </Article>
          <Article>
            <H1>Game Rules</H1>
            <Cards>
              <Card>
                <a target='_new' href='character-sheet.pdf'>
                  <IconCharacter />
                  <p>Character Sheet</p>
                </a>
              </Card>
              <Card>
                <a target='_new' href='https://docs.google.com/document/d/1qhpAflKwudtAlP0mCH43gbcQifZwSJe7aII-nm1PzeI/edit'>
                  <IconGoogleDoc />
                  <p>Rules Document</p>
                </a>
              </Card>
            </Cards>
            <p>
              The game&apos;s rules are maintained as Google Documents. The rules can be a bit
              intimidating, but people pick them up fairly quickly after a game or two. We use a
              one-page character sheet at game which lists all the common abilities. Printed
              rulebooks are availble at game. Most importantly, if an ability is used on you, it&apos;s
              up to the user to explain it if you ask what it does.
            </p>
          </Article>
          <Article>
            <H1>Contact Us</H1>
            <Cards>
              <Card>
                <a target='_new' href='https://www.facebook.com/groups/544631092325451/'>
                  <IconFacebook />
                  <p>Facebook Group</p>
                </a>
              </Card>
            </Cards>
            <p>
              Join us on Facebook! Ask any questions you have there and get answers from both
              players and personel. We&apos;ve chosen to embrace Facebook as our communication medium
              rather than build our own. Most everyone has an account already, and players have
              appreciated the convenience.
            </p>
          </Article>
          <Article splitView>
            <H1>Schedule</H1>
            <p>The camp reservations are done yearly.</p>
            <EventsList>
              {this.state.events.map(event => {
                return (
                  <li key={event._id}>
                    {event.date}
                    <span className='location'>{event.location}</span>
                  </li>
                );
              })}
            </EventsList>
          </Article>
          <Article splitView>
            <H1>Location</H1>
            <p className='location-address'>2090 Scout Rd, Lenoir, North Carolina 28645</p>
            <div className='location-detail'>
              <p>
                Note that Scout Road turns into a gravel road at the camp entrance,
                while the paved road curves left. See <a target="_new" href='https://www.google.com/maps/@35.9480276,-81.3864486,265m/data=!3m1!1e3?hl=en-US'>here</a> for a visual.
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
        </Main>
        <Navigation />
        <Footer>
          <p>©2015 RedTape Productions</p>
        </Footer>
      </div>
    );
  }
}

export default Home;
