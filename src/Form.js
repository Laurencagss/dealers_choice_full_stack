
   
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {createThings} from './store'

class Form extends Component {
    constructor() {
        super();
        this.state = {
            name: ''
        }
        this.save = this.save.bind(this)
    }
    save(ev) {
        ev.preventDefault();
        const thing = {
            name: this.state.name
        }
        this.props.create(thing)
    }
    render() {
        const { name } = this.state;
        const { save } = this;
        return (
            <form onSubmit={save}>
                <input type="text" value={name} onChange={ev => this.setState({ name: ev.target.value })} />
                <button type="submit">Save</button>
            </form>
        )
    }
}
const mapDispatch = (dispatch, { history }) => {
    return {
        create: async(things) => {
            await dispatch(createThings(things, history))
        }
    }
}

export default connect(state => state, mapDispatch)(Form)