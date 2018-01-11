// @flow

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import type { Store } from 'redux'
import type { Connector } from 'react-redux'
import { selectLocationState } from 'redux-first-router'

import toUrl from './toUrl'
import handlePress from './handlePress'
import preventDefault from './preventDefault'

import type { To } from './toUrl'
import type { OnClick } from './handlePress'

type OwnProps = {
  to: To,
  href?: To,
  redirect?: boolean,
  replace?: boolean,
  tagName?: string,
  children?: any, // eslint-disable-line flowtype/no-weak-types
  onPress?: OnClick,
  onClick?: OnClick,
  down?: boolean,
  shouldDispatch?: boolean,
  target?: string,
  storeKey?: string
}

type Props = {
  dispatch: Function // eslint-disable-line flowtype/no-weak-types
} & OwnProps

type Context = {
  store: Store<*, *>
}

export const Link = (
  {
    to,
    href,
    redirect,
    replace,
    tagName = 'a',
    children,
    onPress,
    onClick,
    down = false,
    shouldDispatch = true,
    target,
    dispatch,
    storeKey = 'store',
    ...props
  }: Props,
  context: Context
) => {
  to = href || to // href is deprecated and will be removed in next major version

  const location = selectLocationState(context[storeKey].getState())
  const { routesMap } = location
  const url = toUrl(to, routesMap)
  const handler = handlePress.bind(
    null,
    url,
    routesMap,
    onPress || onClick,
    shouldDispatch,
    target,
    dispatch,
    to,
    replace || redirect
  )
  const Root = tagName

  const localProps = {}

  if (tagName === 'a' && url) {
    localProps.href = url
  }

  if (down && handler) {
    localProps.onMouseDown = handler
    localProps.onTouchStart = handler
  }

  if (target) {
    localProps.target = target
  }

  return (
    <Root
      onClick={(!down && handler) || preventDefault}
      {...localProps}
      {...props}
    >
      {children}
    </Root>
  )
}

Link.contextTypes = {
  store: PropTypes.object.isRequired
}

const connector: Connector<OwnProps, Props> = connect()

// $FlowIgnore
export default connector(Link)
