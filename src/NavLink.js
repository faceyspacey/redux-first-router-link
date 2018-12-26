// @flow

import React from 'react'
import { connect } from 'react-redux'
import type { Connector } from 'react-redux'
import matchPath from 'rudy-match-path'
import { selectLocationState, getOptions } from 'redux-first-router'
import { stripBasename } from 'rudy-history/PathUtils'

import { Link } from './Link'
import toUrl from './toUrl'
import type { To } from './toUrl'
import type { OnClick } from './handlePress'

type OwnProps = {
  to: To,
  href?: To,
  redirect?: boolean,
  replace?: boolean,
  children?: any,
  onPress?: OnClick,
  onClick?: OnClick,
  down?: boolean,
  shouldDispatch?: boolean,
  target?: string,
  className?: string,
  style?: Object,
  activeClassName?: string,
  activeStyle?: Object,
  ariaCurrent?: string,
  exact?: boolean,
  strict?: boolean,
  isActive?: (?Object, Object) => boolean
}

type Props = {
  location: any
} & OwnProps

const NavLink = ({
  to,
  href,
  location,
  className,
  style,
  activeClassName = 'active',
  activeStyle,
  ariaCurrent = 'true',
  exact,
  strict,
  isActive,
  ...props
}: Props) => {
  to = href || to

  const options = getOptions()
  const basename = options.basename ? options.basename : ''

  const path = toUrl(to, location.routesMap).split('?')[0]

  const match = matchPath(location.pathname, {
    path: stripBasename(path, basename),
    exact,
    strict
  })

  const active = !!(isActive ? isActive(match, location) : match)

  const combinedClassName = active
    ? [className, activeClassName].filter(i => i).join(' ')
    : className

  const combinedStyle = active ? { ...style, ...activeStyle } : style

  return (
    <Link
      to={to}
      className={combinedClassName}
      style={combinedStyle}
      aria-current={active && ariaCurrent}
      routesMap={location.routesMap}
      {...props}
    />
  )
}

const mapState = state => ({ location: selectLocationState(state) })
const connector: Connector<OwnProps, Props> = connect(mapState)

// $FlowIgnore
export default connector(NavLink)
