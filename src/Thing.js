import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { destThings } from './store'

const Thing = ({ things, destroyThings, match })  => {
    return (
        <div>
            <ul>
                {
                    things.filter(thing => thing.id === match.params.id*1).map(thing => {
                        return (
                            <ul key={thing.id}>
                                <Link to={'/'}>
                                    { thing.name }
                                </Link>
                                <button id='deleteButton' onClick={() => destroyThings(thing)}>x</button>
                                <p>
                                    {thing.name} details
                                </p>
                            </ul>
                        )
                    })
                }
            </ul>
        </div>
    )
}

const mapDispatch = (dispatch, { history }) => {
    return {
        destroyThings: async(things) => {
            await dispatch(destroyThings(things, history))
        }
    }
}
export default connect(state => state, mapDispatch)(Thing);