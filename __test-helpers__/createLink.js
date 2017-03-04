import React from 'react'
import renderer from 'react-test-renderer'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import createHistory from 'history/createMemoryHistory'
import { connectRoutes } from 'pure-redux-router'


import Link from '../src/Link'


export default (props) => {
  const routesMap = {
    FIRST: '/first',
    SECOND: '/second/:param',
  }

  const history = createHistory({
    initialEntries: ['/'],
    initialIndex: 0,
    keyLength: 6,
  })

  const { middleware, reducer: locationReducer } = connectRoutes(history, routesMap)

  const middlewares = applyMiddleware(middleware)

  const reducer = (state = {}, action = {}) => ({
    location: locationReducer(state.location, action),
  })

  const store = createStore(reducer, undefined, middlewares)

  const link = <Link {...props} />
  const component = renderer.create(<Provider store={store}>{link}</Provider>)

  return {
    tree: component.toJSON(),
    store,
  }
}


export const event = { preventDefault: () => undefined }
