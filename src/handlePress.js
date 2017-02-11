// @flow

import { go } from 'pure-redux-router'


export default (
  href: string,
  onPress?: Function, // eslint-disable-line flowtype/no-weak-types
  shouldDispatch: boolean,
  target?: string,
  dispatch: Function, // eslint-disable-line flowtype/no-weak-types
  e: SyntheticEvent,
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
    dispatch(go(href))
  }
}
