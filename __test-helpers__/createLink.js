import React from 'react'
import renderer from 'react-test-renderer'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import { connectRoutes } from 'redux-first-router'

import Link from '../src/Link'
import NavLink from '../src/NavLink'

const createLink = (props, initialPath, options) => {
  const isNavLink = !!initialPath
  const link = isNavLink ? <NavLink {...props} /> : <Link {...props} />

  const routesMap = {
    FIRST: '/first',
    SECOND: '/second/:param'
  }

  const { middleware, enhancer, reducer } = connectRoutes(routesMap, {
    initialEntries: [initialPath || '/'],
    initialIndex: 0,
    keyLength: 6,
    ...options
  })

  const middlewares = applyMiddleware(middleware)
  const enhancers = compose(enhancer, middlewares)
  const rootReducer = (state = {}, action = {}) => ({
    location: reducer(state.location, action)
  })

  const store = createStore(rootReducer, enhancers)
  const component = renderer.create(
    <Provider store={store}>
      {link}
    </Provider>
  )

  return {
    component,
    tree: component.toJSON(),
    store
  }
}

export default createLink
export const createNavLink = (path, props) => createLink(props, path)

export const event = { preventDefault: () => undefined, button: 0 }
