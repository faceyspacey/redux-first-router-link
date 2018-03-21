// @flow

import { pathToAction, redirect, getOptions } from 'redux-first-router'
import type { RoutesMap } from 'redux-first-router'
import type { To } from './toUrl'

export type OnClick = false | (SyntheticEvent => ?boolean)
export default (
  url: string,
  routesMap: RoutesMap,
  onClick?: ?OnClick,
  shouldDispatch: boolean,
  target: ?string,
  dispatch: Function,
  to?: ?To,
  dispatchRedirect?: boolean,
  e: SyntheticEvent
) => {
  let shouldGo = true

  if (onClick) {
    shouldGo = onClick(e) // onClick can return false to prevent dispatch
    shouldGo = typeof shouldGo === 'undefined' ? true : shouldGo
  }

  const prevented = e.defaultPrevented

  if (!target && e && e.preventDefault && !isModified(e)) {
    e.preventDefault()
  }

  if (
    shouldGo &&
    shouldDispatch &&
    !target &&
    !prevented &&
    e.button === 0 &&
    !isModified(e)
  ) {
    const { querySerializer: serializer } = getOptions()
    let action = isAction(to) ? to : pathToAction(url, routesMap, serializer)
    action = dispatchRedirect ? redirect(action) : action
    dispatch(action)
  }
}

const isAction = (to: ?To) => typeof to === 'object' && !Array.isArray(to)

const isModified = (e: Object) =>
  !!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey)
