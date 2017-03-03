// @flow

import { actionToPath } from 'pure-redux-router'
import type { RoutesMap } from 'pure-redux-router'


export type Href = string | Array<string> | Object // eslint-disable-line flowtype/no-weak-types

export default (href: Href, routesMap: RoutesMap): string => {
  if (typeof href === 'string') {
    return href
  }
  else if (Array.isArray(href)) {
    return `/${href.join('/')}`
  }
  else if (typeof href === 'object') {
    const action = href

    try {
      return actionToPath(action, routesMap)
    }
    catch (e) {
      console.warn(
        '[pure-redux-router-link] could not create path from action:',
        action,
        'For reference, here are your current routes:',
        routesMap,
      )

      return '#'
    }
  }

  console.warn('[pure-redux-router-link] `href` prop must be a string, array or action object. You provided:', href)
  return '#'
}
