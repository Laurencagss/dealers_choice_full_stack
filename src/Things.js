import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { destroyThings } from './store'

const Things = ({ things, destroyThings })  => {
    return (
        <div>
            <ul>
                {
                    things.map(thing => {
                        return (
                            <ul key={thing.id}>
                                <Link to={`/${thing.id}`}>
                                    { thing.name } Things
                                </Link>
                            </ul>
                        )
                    })
                }
            </ul>
        </div>
    )
}

const mapDispatch = (dispatch) => {
    return {
        destroyThings: (things) => {
            dispatch(destroyThings(things))
        }
    }
}

export default connect(state => state, mapDispatch)(Things);