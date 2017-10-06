import React from 'react'
import renderer from 'react-test-renderer'
import { Provider } from 'react-redux'

import configureStore from './configureStore'

const unrelated = (state = 0, { type }) =>
  type === 'INC_UNRELATED' ? state + 1 : state

const createRenderCounter = (connector, countWrapper) => {
  const store = configureStore(undefined, undefined, { unrelated })

  const RenderCounter = connector(() => {
    ++countWrapper.count
    return <span />
  })

  const component = renderer.create(
    <Provider store={store}>
      <RenderCounter />
    </Provider>
  )

  return {
    component,
    store
  }
}

export default createRenderCounter
