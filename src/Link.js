// @flow

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import type { Store } from 'redux'
import type { Connector } from 'react-redux'

import hrefToUrl from './hrefToUrl'
import handlePress from './handlePress'
import preventDefault from './preventDefault'

import type { Href } from './hrefToUrl'
import type { OnPress } from './handlePress'

// note: unfortunately, babel-plugin-flow-react-proptypes currently requires
// React components to have props defined in place, hence the redundancy below

const Link = (
  {
    href,
    children,
    onPress,
    down = false,
    shouldDispatch = true,
    target,
    dispatch,
    ...props
  }: {
    href: string | Array<string> | Object,
    children?: any,
    onPress?: false | ((SyntheticEvent) => ?boolean),
    down?: boolean,
    shouldDispatch?: boolean,
    target?: string,
    dispatch: Function
  },
  { store }: Context
) => {
  const { routesMap } = store.getState().location
  const url = hrefToUrl(href, routesMap)
  const handler = handlePress.bind(
    null,
    url,
    routesMap,
    onPress,
    shouldDispatch,
    target,
    dispatch,
    href
  )

  return (
    <a
      href={url}
      onClick={(!down && handler) || preventDefault}
      onMouseDown={down && handler}
      onTouchStart={down && handler}
      target={target}
      {...props}
    >
      {children}
    </a>
  )
}

Link.contextTypes = {
  store: PropTypes.object.isRequired
}

type OwnProps = {
  href: Href,
  children?: any, // eslint-disable-line flowtype/no-weak-types
  onPress?: OnPress,
  down?: boolean,
  shouldDispatch?: boolean,
  target?: string
}

type Props = {
  dispatch: Function // eslint-disable-line flowtype/no-weak-types
} & OwnProps

type Context = {
  store: Store<*, *>
}

const connector: Connector<OwnProps, Props> = connect()

// $FlowIgnore
export default connector(Link)
