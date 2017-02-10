// @flow

import React from 'react'
import { connect } from 'react-redux'
import type { Connector } from 'react-redux'
import { handlePress, preventDefault } from './handlePress'


const Link = ({
  href,
  children,
  onPress,
  down = false,
  shouldDispatch = true,
  target,
  dispatch,
  ...props
}: Props) => {
  const handler = handlePress.bind(null, href, onPress, shouldDispatch, target, dispatch)

  return (
    <a
      href={href}
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


type OwnProps = {
  href: string,
  children: any, // eslint-disable-line flowtype/no-weak-types
  onPress?: Function, // eslint-disable-line flowtype/no-weak-types
  down?: boolean,
  shouldDispatch?: boolean,
  target?: string,
}

type Props = {
  dispatch: Function, // eslint-disable-line flowtype/no-weak-types
} & OwnProps

const connector: Connector<OwnProps, Props> = connect()

export default connector(Link)
