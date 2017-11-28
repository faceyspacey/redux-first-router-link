import React from 'react'
import renderer from 'react-test-renderer'
import { Provider } from 'react-redux'

import configureStore from './configureStore'

import Link from '../src/Link'
import NavLink from '../src/NavLink'

const createLink = (props, initialPath, options) => {
  const isNavLink = !!initialPath
  const link = isNavLink ? <NavLink {...props} /> : <Link {...props} />

  const store = configureStore(initialPath, options)
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
