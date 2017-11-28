import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import { connectRoutes } from 'redux-first-router'
import thunk from 'redux-thunk'

const configureStore = (initialPath, options, additionalReducers) => {
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

  const middlewares = applyMiddleware(middleware, thunk)
  const enhancers = compose(enhancer, middlewares)
  const rootReducer = combineReducers({
    ...additionalReducers,
    location: reducer
  })

  return createStore(rootReducer, enhancers)
}

export default configureStore
