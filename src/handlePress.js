// @flow

import { pathToAction } from 'redux-first-router'
import type { RoutesMap } from 'redux-first-router'
import type { Href } from './hrefToUrl'

export type OnPress = false | ((SyntheticEvent) => ?boolean)
export default (
  url: string,
  routesMap: RoutesMap,
  onPress: ?OnPress,
  shouldDispatch: boolean,
  target: ?string,
  dispatch: Function, // eslint-disable-line flowtype/no-weak-types
  href?: Href,
  e: SyntheticEvent
) => {
  if (target !== '_blank' && e && e.preventDefault) {
    e.preventDefault()
  }

  let shouldGo = true

  if (onPress) {
    shouldGo = onPress(e) // onPress can return false to prevent dispatch
    shouldGo = typeof shouldGo === 'undefined' ? true : shouldGo
  }

  if (shouldGo && shouldDispatch && target !== '_blank') {
    const action = isAction(href) ? href : pathToAction(url, routesMap)

    dispatch(action)
  }
}

const isAction = (href?: Href) =>
  typeof href === 'object' && !Array.isArray(href)
