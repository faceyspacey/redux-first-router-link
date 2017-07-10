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

const NavLink = (
  {
    to,
    href,
    pathname,
    className,
    style,
    activeClassName,
    activeStyle,
    exact,
    strict,
    isActive,
    ...props
  }: {
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
    dispatch: Function,
    pathname: string,
    className?: string,
    style?: Object,
    activeClassName?: string,
    activeStyle?: Object,
    exact?: boolean,
    strict?: boolean,
    isActive?: (?Object, Object) => boolean
  },
  { store }: Context
) => {
  to = href || to

  const location = selectLocationState(store.getState())
  const path = toUrl(to, location.routesMap)
  const match = matchPath(pathname, { path, exact, strict })
  const active = !!(isActive ? isActive(match, location) : match)
  return (
    <Link
      to={to}
      className={
        active
          ? [className, activeClassName].filter(i => i).join(' ')
          : className
      }
      style={active ? { ...style, ...activeStyle } : style}
      {...props}
    />
  )
}

NavLink.contextTypes = {
  store: PropTypes.object.isRequired
}

type OwnProps = {
  to: To,
  href?: To,
  redirect?: boolean,
  replace?: boolean,
  children?: any, // eslint-disable-line flowtype/no-weak-types
  onPress?: OnClick,
  onClick?: OnClick,
  down?: boolean,
  shouldDispatch?: boolean,
  target?: string,
  className?: string,
  style?: Object,
  activeClassName?: string,
  activeStyle?: Object,
  exact?: boolean,
  strict?: boolean,
  isActive?: (Object, Object) => boolean
}

type Props = {
  dispatch: Function, // eslint-disable-line flowtype/no-weak-types
  pathname: string
} & OwnProps

type Context = {
  store: Store<*, *>
}

const mapState = state => ({ pathname: selectLocationState(state).pathname })
const connector: Connector<OwnProps, Props> = connect(mapState)

// $FlowIgnore
export default connector(NavLink)
