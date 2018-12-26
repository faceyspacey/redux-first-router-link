// @flow

import React from 'react'
import { connect } from 'react-redux'
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
  target?: string
}

type Props = {
  dispatch: Function, // eslint-disable-line flowtype/no-weak-types
  routesMap: object
} & OwnProps

export const Link = ({
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
  routesMap,
  ...props
}: Props) => {
  to = href || to // href is deprecated and will be removed in next major version

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

const mapState = state => ({
  routesMap: selectLocationState(state).routesMap
})
const connector: Connector<OwnProps, Props> = connect(mapState)

// $FlowIgnore
export default connector(Link)
