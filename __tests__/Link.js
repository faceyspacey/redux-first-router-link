import { NOT_FOUND } from 'redux-first-router'

import createLink, { event } from '../__test-helpers__/createLink'

it('ON_CLICK: dispatches location-aware action', () => {
  const { tree, store } = createLink({
    href: '/first',
    children: 'CLICK ME',
    target: '_self'
  }) /*? $.tree */

  expect(tree).toMatchSnapshot() /*? store.getState() */

  tree.props.onClick(event)

  const { location } = store.getState() /*? $.location */

  expect(location.pathname).toEqual('/first')
  expect(location.type).toEqual('FIRST')
})

it('ON_CLICK: does NOT dispatch if shouldDispatch === false', () => {
  const { tree, store } = createLink({ href: '/first', shouldDispatch: false })

  expect(tree).toMatchSnapshot()

  tree.props.onClick()

  const { location } = store.getState() /*? $.location */

  expect(location.pathname).not.toEqual('/first')
  expect(location.type).not.toEqual('FIRST')
  expect(location.pathname).toEqual('/')
})

it('ON_CLICK: does NOT dispatch if onPress returns false', () => {
  const { tree, store } = createLink({ href: '/first', onPress: () => false })

  expect(tree).toMatchSnapshot()

  tree.props.onClick()

  const { location } = store.getState() /*? $.location */

  expect(location.pathname).not.toEqual('/first')
  expect(location.type).not.toEqual('FIRST')
  expect(location.pathname).toEqual('/')
})

it('ON_CLICK: DOES dispatch if onPress returns true', () => {
  const { tree, store } = createLink({ href: '/first', onPress: () => true })

  expect(tree).toMatchSnapshot()

  tree.props.onClick()

  const { location } = store.getState() /*? $.location */

  expect(location.pathname).toEqual('/first')
  expect(location.type).toEqual('FIRST')
})

it('ON_CLICK: DOES dispatch if onPress returns undefined', () => {
  const { tree, store } = createLink({
    href: '/first',
    onPress: () => undefined
  })

  expect(tree).toMatchSnapshot()

  tree.props.onClick()

  const { location } = store.getState() /*? $.location */

  expect(location.pathname).toEqual('/first')
  expect(location.type).toEqual('FIRST')
})

it('ON_MOUSE_DOWN: dispatches action onMouseDown if down === true', () => {
  const { tree, store } = createLink({
    href: '/first',
    down: true
  }) /*? $.tree */

  expect(tree).toMatchSnapshot()

  tree.props.onClick(event) // e.preventDefault() called and nothing dispatched + linking prevented

  let { location } = store.getState()
  expect(location.pathname).toEqual('/')

  tree.props.onMouseDown()

  location = store.getState().location /*? */

  expect(location.pathname).toEqual('/first')
  expect(location.type).toEqual('FIRST')
})

it('ON_TOUCH_START: dispatches action onTouchStart if down === true', () => {
  const { tree, store } = createLink({
    href: '/first',
    down: true
  }) /*? $.tree */

  expect(tree).toMatchSnapshot()

  tree.props.onTouchStart()

  const { location } = store.getState() /*? $.location */

  expect(location.pathname).toEqual('/first')
  expect(location.type).toEqual('FIRST')
})

it('converts href as array of strings to path', () => {
  const { tree, store } = createLink({ href: ['second', 'bar'] }) /*? $.tree */

  expect(tree).toMatchSnapshot() /*? store.getState() */

  tree.props.onClick(event)

  const { location } = store.getState() /*? $.location */

  expect(location.pathname).toEqual('/second/bar')
  expect(location.type).toEqual('SECOND')
})

it('converts href as action object to path', () => {
  const action = { type: 'SECOND', payload: { param: 'bar' } }
  const { tree, store } = createLink({ href: action }) /*? $.tree */

  expect(tree).toMatchSnapshot() /*? store.getState() */

  tree.props.onClick(event)

  const { location } = store.getState() /*? $.location */

  expect(location.pathname).toEqual('/second/bar')
  expect(location.type).toEqual('SECOND')
})

it('converts href as non-matched action object to "#" for path', () => {
  const action = { type: 'MISSED' }
  const { tree, store } = createLink({ href: action }) /*? $.tree */

  expect(tree.props.href).toEqual('#')
  expect(tree).toMatchSnapshot()

  tree.props.onClick(event)

  const { location } = store.getState() /*? $.location */
  expect(location.type).toEqual(NOT_FOUND)
})

it('converts invalid href to "#" for path', () => {
  const { tree, store } = createLink({}) /*? $.tree */

  expect(tree.props.href).toEqual('#')
  expect(tree).toMatchSnapshot()

  tree.props.onClick(event)

  const { location } = store.getState() /*? $.location */
  expect(location.type).toEqual(NOT_FOUND)
})
