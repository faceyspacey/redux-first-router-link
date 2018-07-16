// @flow

import { actionToPath, getOptions, history } from 'redux-first-router'
import type { RoutesMap } from 'redux-first-router'

export type To = string | Array<string> | Object

export default (to?: ?To, routesMap: RoutesMap): string => {
  const { querySerializer, basename } = getOptions()

  if (to && typeof to === 'string') {
    return basename ? basename + to : to
  }
  else if (Array.isArray(to)) {
    const path = `/${to.join('/')}`
    return basename ? basename + path : path
  }
  else if (typeof to === 'object') {
    const action = to

    try {
      const path = actionToPath(action, routesMap, querySerializer)
      return history().createHref({
        pathname: basename ? basename + path : path
      })
    }
    catch (e) {
      if (process.env.NODE_ENV === 'development') {
        console.warn(
          '[redux-first-router-link] could not create path from action:',
          action,
          'For reference, here are your current routes:',
          routesMap
        )
      }

      return '#'
    }
  }

  if (process.env.NODE_ENV === 'development') {
    console.warn(
      '[redux-first-router-link] `to` prop must be a string, array or action object. You provided:',
      to
    )
  }

  return '#'
}
