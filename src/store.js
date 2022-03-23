// import { createStore, applyMiddleware, combineReducers } from "redux";
// import thunks from "redux-thunk";
// import { createLogger } from "redux-logger";
// import axios from "axios";

// const GET_THINGS = "GET_THINGS";

// const thingReducer = (state = [], action) => {
//   switch (action.type) {
//     case GET_THINGS:
//       return (state = action.things);
//       break;

//     default:
//       return state;
//       break;
//   }
//   return state;
// };

// const reducer = combineReducers({
//   things: thingReducer,
// });

// const store = createStore(
//   reducer,
//   applyMiddleware(thunks, createLogger({ collapsed: true }))
// );

// const getThings = () => {
//   return async (dispatch) => {
//     const { data: things } = await axios.get("/api/things");
//     const action = {
//       type: GET_THINGS
//     };
//     dispatch(action);
//   };
// };

// export default store;

// export { getThings };

// window.store = store;

import { createStore, combineReducers, applyMiddleware } from 'redux';
import axios from 'axios';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

//action constants:
const LOAD_THINGS = 'LOAD_THINGS'
const CREATE_THINGS = 'CREATE_THINGS'
const DESTROY_THINGS = 'DESTROY_THINGS'

//reducers:
const thingsReducer = (state = [], action) => {
    if (action.type === LOAD_THINGS) {
        state = action.things
    }
    if (action.type === CREATE_THINGS) {
        state = [...state, action.things]
    }
    if (action.type === DESTROY_THINGS) {
        state = state.filter(things => things.id !== action.things.id);
    }
    return state;
}


const reducer = combineReducers({
    things: thingsReducer
})

const store = createStore(reducer, applyMiddleware(thunk, logger))


const _loadThings = (things) => { return { type: LOAD_THINGS, things }};
const _createThings = (things) => { return { type: CREATE_THINGS, things }};
const _destroyThings = (things) => { return { type: DESTROY_THINGS, things }};

const loadThings = () => {
    return async(dispatch) => {
        const things = (await axios.get('/api/things')).data
        dispatch(_loadThings(things))
    }
}

const createThings = (name) => {
    return async(dispatch) => {
        const thingss = (await axios.post('/api/things', name)).data;
        dispatch(_createThings(things))
        history.push(`/${things.id}`)
    }
}

const destroyThings = (things, history) => {
    return async(dispatch) => {
        await axios.delete(`/api/things/${things.id}`)
        dispatch(_destroyThings(things))
        history.push('/')
    }
}

export default store;
export { 
    loadThings,
    createThings,
    destroyThings
} 