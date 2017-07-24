const createStore = (reducer, initialState) => {
  let state = initialState;
  state = reducer(state, {type: undefined});
  let observers = [];
  const view = () => state;
  const dispatch = (action) => {
    state = reducer(state, action);
    observers.forEach(observer => observer());
  };
  const subscribe = (observer) => {
    observers.push(observer);
    return () => observers = observers.filter(item => item !== observer);
  };
  return { view, dispatch, subscribe };
};

export default createStore;
