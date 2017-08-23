// @flow

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import type { Store } from 'redux'
import type { Connector } from 'react-redux'
import matchPath from 'rudy-match-path'
import { selectLocationState } from 'redux-first-router'

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
  dispatch: Function,
  pathname: string
} & OwnProps

type Context = {
  store: Store<*, *>
}

const NavLink = (
  {
    to,
    href,
    pathname,
    className,
    style,
    activeClassName = 'active',
    activeStyle,
    ariaCurrent = 'true',
    exact,
    strict,
    isActive,
    ...props
  }: Props,
  { store }: Context
) => {
  to = href || to

  const location = selectLocationState(store.getState())
  const path = toUrl(to, location.routesMap)
  const match = matchPath(pathname, { path, exact, strict })
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
      {...props}
    />
  )
}

NavLink.contextTypes = {
  store: PropTypes.object.isRequired
}

const mapState = state => ({ pathname: selectLocationState(state).pathname })
const connector: Connector<OwnProps, Props> = connect(mapState)

// $FlowIgnore
export default connector(NavLink)
