import { createStore, applyMiddleware, combineReducers } from "redux";
import thunks from "redux-thunk";
import { createLogger } from "redux-logger";
import axios from "axios";

const GET_THINGS = "GET_THINGS";

const thingReducer = (state = [], action) => {
  switch (action.type) {
    case GET_THINGS:
      return (state = action.things);
      break;

    default:
      return state;
      break;
  }
  return state;
};

const reducer = combineReducers({
  things: thingReducer,
});

const store = createStore(
  reducer,
  applyMiddleware(thunks, createLogger({ collapsed: true }))
);

const getThings = () => {
  return async (dispatch) => {
    const { data: things } = await axios.get("/api/things");
    const action = {
      type: GET_THINGS
    };
    dispatch(action);
  };
};

export default store;

export { getThings };

window.store = store;