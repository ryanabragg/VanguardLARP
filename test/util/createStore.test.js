import { expect } from 'chai';
import { spy } from 'sinon';

import createStore from '../../src/util/createStore';

describe('createStore function', () => {
  it('returns an object with the methods view, dispatch, and subscribe', () => {
    const store = createStore(() => null);
    expect(typeof store).to.equal('object');
    expect(typeof store.view).to.equal('function');
    expect(typeof store.dispatch).to.equal('function');
    expect(typeof store.subscribe).to.equal('function');
  });

  describe('the first parameter is a function and is called once', () => {
    it('the returned object\'s dispatch method runs the parameter function, updating state', () => {
      const states = [{test: false}, {test: true}, {test: 42}];
      const reducer = (state = states[0], action) => {
        switch (action.type) {
        case 'TEST':
          return states[1];
        case 'MEANING':
          return states[2];
        default:
          return state;
        }
      };
      const reducerSpy = spy(reducer);
      const store = createStore(reducerSpy);
      expect(reducerSpy.callCount).to.equal(1);
      expect(store.view()).to.deep.equal(states[0]);
      store.dispatch({type: 'MEANING'});
      expect(reducerSpy.callCount).to.equal(2);
      expect(store.view()).to.deep.equal(states[2]);
      store.dispatch({type: 'TEST'});
      expect(reducerSpy.callCount).to.equal(3);
      expect(store.view()).to.deep.equal(states[1]);
      store.dispatch({type: 'will not change'});
      expect(reducerSpy.callCount).to.equal(4);
      expect(store.view()).to.deep.equal(states[1]);
    });
  });

  describe('the second parameter is the default state', () => {
    it('the returned object\'s view method returns the state', () => {
      const store = createStore((state) => state, {test: true});
      expect(store.view()).to.deep.equal({test: true});
    });
  });

  describe('tracks observers and performs them on dispatch', () => {
    it('the returned object\'s subscribe method stores an observer, each observer is run on dispatch', () => {
      const states = [{test: false}, {test: true}, {test: 42}];
      const reducer = (state = states[0], action) => {
        switch (action.type) {
        case 'TEST':
          return states[1];
        case 'MEANING':
          return states[2];
        default:
          return state;
        }
      };
      const store = createStore(reducer);
      function Observer(name) {
        this.name = name;
        this.data = {};
        this.observe = () => this.data = store.view();
      }
      var test = new Observer;
      const observerSpy = spy(test, 'observe');
      store.subscribe(test.observe);
      store.dispatch({type: 'any'});
      expect(test.data).to.deep.equal(states[0]);
      store.dispatch({type: 'MEANING'});
      expect(test.data).to.deep.equal(states[2]);
      store.dispatch({type: 'TEST'});
      expect(test.data).to.deep.equal(states[1]);
      store.dispatch({type: 'will not change'});
      expect(test.data).to.deep.equal(states[1]);
    });

    it('the subscribe method returns a function to unsubscribe the observer', () => {
      const states = [{test: false}, {test: true}, {test: 42}];
      const reducer = (state = states[0], action) => {
        switch (action.type) {
        case 'TEST':
          return states[1];
        case 'MEANING':
          return states[2];
        default:
          return state;
        }
      };
      const store = createStore(reducer);
      function Observer(name) {
        this.name = name;
        this.data = {};
        this.observe = () => this.data = store.view();
      }
      const test = new Observer;
      const observerSpy = spy(test, 'observe');
      const unsubscribe = store.subscribe(test.observe);
      store.dispatch({type: 'any'});
      expect(test.data).to.deep.equal(states[0]);
      store.dispatch({type: 'MEANING'});
      expect(test.data).to.deep.equal(states[2]);
      unsubscribe();
      store.dispatch({type: 'TEST'});
      expect(test.data).to.deep.equal(states[2]);
      store.dispatch({type: 'will not change'});
      expect(test.data).to.deep.equal(states[2]);
    });
  });

  it('does not allow directly accessing variables state and observers', () => {
    const store = createStore(() => null);
    expect(store.state).to.equal(undefined);
    expect(store.observers).to.equal(undefined);
  });
});
