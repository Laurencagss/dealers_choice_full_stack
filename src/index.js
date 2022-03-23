import React from 'react';
import { render } from 'react-dom';
import { connect, Provider } from "react-redux";
import store, { loadThings } from "./store";
import axios from "axios";
import { HashRouter, Route, Link } from 'react-router-dom';
import Thing from './Thing';
import Things from './Things';
import Form from './Form';



const Detail = connect(state => state)( 
  (props) => {
      const things = props.things.find( things => things.id === props.match.params.id*1);
      if(!things){
          return null;
      }
      return (
          <div>
              <h1 id="site-name"> { things.name }</h1>
          </div>
      );
  }
);

const App = connect(
  state => state, 
  (dispatch) => {
      return {
          loadData: async() => {
              const { data: things } = await axios.get("/");
              dispatch({
                  type: "GET_THINGS",
                  things
              });
          }
      };
  }
)(class App extends React.Component {
      componentDidMount() {
          this.props.loadData();
      }
      
      render() {
          return (
              <div id="body">
                  <h1> Things that feel nonbinary to me beacuse I am and I said so</h1>
                 <a href="/patch"> Patches or Pins on Your Jacket </a>
 <a href="/head"> -Shaved Head or Undercut- </a>
<a href="/legs"> -Hairy Legs- </a>
<a href="/pomp"> -Pompadours- </a>
 <a href="/mismatch"> -Mismatched Clothing- </a>
<a href="/hairmakeup"> -Facial Hair and Makeup- </a>
 <a href="/hat"> -This Particular Captains Hat- </a>
                  <Route exact path='/' component={ Things } />
                <Route path='/:id' component={ Thing } />
                <Route exact path='/' component={ Form } />
              </div>
          );
      }
  }
);


render(<Provider store={store}>
      <HashRouter>
          <App />
      </HashRouter>
  </Provider>, document.querySelector('#root'));