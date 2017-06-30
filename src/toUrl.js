// @flow

import { actionToPath } from 'redux-first-router'
import type { RoutesMap } from 'redux-first-router'

export type To = string | Array<string> | Object

export default (to?: ?To, routesMap: RoutesMap): string => {
  if (to && typeof to === 'string') {
    return to
  }
  else if (Array.isArray(to)) {
    return `/${to.join('/')}`
  }
  else if (typeof to === 'object') {
    const action = to

    try {
      return actionToPath(action, routesMap)
    }
    catch (e) {
      console.warn(
        '[redux-first-router-link] could not create path from action:',
        action,
        'For reference, here are your current routes:',
        routesMap
      )

      return '#'
    }
  }

  console.warn(
    '[redux-first-router-link] `to` prop must be a string, array or action object. You provided:',
    to
  )
  return '#'
}
