import React from 'react';
import { render } from 'react-dom';
import { connect, Provider } from "react-redux";
import store, { getThings } from "./store";
import axios from "axios";

const _Things = ({ thing }) => {
    return things.map((thing) => {
      return (
        <div key={thing.id} className="thing">
          <span><img src={thing.imageLink} alt={thing.name}></img></span>
          <span className='description'>{thing.name}</span>
          <span>Remove? <br/> <button>X</button></span>
        </div>
      );
    });
  };
  
  // get state
  const mapStateToProps = (state) => {
    return {
      things: things.photos,
    };
  };
  
  // set state
  const mapDispatchToProps = (dispatch) => {
    return {
      getThings: () => dispatch(getThings()),
    };
  };
  
  class _App extends Component {
    componentDidMount() {
      this.props.getThings();
    }
    render() {
      return (
        <div>
          <h1>Things that are nonbinary</h1>
  
          <Things />
        </div>
      );
    }
  }
  
  const Things = connect(mapStateToProps, mapDispatchToProps)(_Things);
  const App = connect(mapStateToProps, mapDispatchToProps)(_App);
  
  render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.querySelector("#root")
  );