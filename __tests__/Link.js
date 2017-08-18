import { NOT_FOUND } from 'redux-first-router'
import createLink, { event } from '../__test-helpers__/createLink'

test('ON_CLICK: dispatches location-aware action', () => {
  const { tree, store } = createLink({
    to: '/first',
    children: 'CLICK ME'
  }) /*? $.tree */

  expect(tree).toMatchSnapshot() /*? store.getState() */

  tree.props.onClick(event)

  const { location } = store.getState() /*? $.location */

  expect(location.pathname).toEqual('/first')
  expect(location.type).toEqual('FIRST')
})

it('ON_CLICK: does NOT dispatch if shouldDispatch === false', () => {
  const { tree, store } = createLink({ to: '/first', shouldDispatch: false })

  expect(tree).toMatchSnapshot()

  tree.props.onClick(event)

  const { location } = store.getState() /*? $.location */

  expect(location.pathname).not.toEqual('/first')
  expect(location.type).not.toEqual('FIRST')
  expect(location.pathname).toEqual('/')
})

it('ON_CLICK: does NOT dispatch if onClick returns false', () => {
  const { tree, store } = createLink({ to: '/first', onClick: () => false })

  expect(tree).toMatchSnapshot()

  tree.props.onClick(event)

  const { location } = store.getState() /*? $.location */

  expect(location.pathname).not.toEqual('/first')
  expect(location.type).not.toEqual('FIRST')
  expect(location.pathname).toEqual('/')
})

it('ON_CLICK: DOES dispatch if onClick returns true', () => {
  const { tree, store } = createLink({ to: '/first', onClick: () => true })

  expect(tree).toMatchSnapshot()

  tree.props.onClick(event)

  const { location } = store.getState() /*? $.location */

  expect(location.pathname).toEqual('/first')
  expect(location.type).toEqual('FIRST')
})

it('ON_CLICK: DOES dispatch if onClick returns undefined', () => {
  const { tree, store } = createLink({
    to: '/first',
    onClick: () => undefined
  })

  expect(tree).toMatchSnapshot()

  tree.props.onClick(event)

  const { location } = store.getState() /*? $.location */

  expect(location.pathname).toEqual('/first')
  expect(location.type).toEqual('FIRST')
})

it('ON_MOUSE_DOWN: dispatches action onMouseDown if down === true', () => {
  const { tree, store } = createLink({
    to: '/first',
    down: true
  }) /*? $.tree */

  expect(tree).toMatchSnapshot()

  tree.props.onClick(event) // e.preventDefault() called and nothing dispatched + linking prevented

  let { location } = store.getState()
  expect(location.pathname).toEqual('/')

  tree.props.onMouseDown(event)

  location = store.getState().location /*? */

  expect(location.pathname).toEqual('/first')
  expect(location.type).toEqual('FIRST')
})

it('ON_CLICK: dispatches redirect if redirect === true', () => {
  const { tree, store } = createLink({
    to: '/first',
    children: 'CLICK ME',
    redirect: true
  }) /*? $.tree */

  expect(tree).toMatchSnapshot() /*? store.getState() */

  tree.props.onClick(event)

  const { location } = store.getState() /*? $.location */

  expect(location.pathname).toEqual('/first')
  expect(location.kind).toEqual('redirect')
})

it('ON_TOUCH_START: dispatches action onTouchStart if down === true', () => {
  const { tree, store } = createLink({
    to: '/first',
    down: true
  }) /*? $.tree */

  expect(tree).toMatchSnapshot()

  tree.props.onTouchStart(event)

  const { location } = store.getState() /*? $.location */

  expect(location.pathname).toEqual('/first')
  expect(location.type).toEqual('FIRST')
})

it('converts href as array of strings to path', () => {
  const { tree, store } = createLink({ to: ['second', 'bar'] }) /*? $.tree */

  expect(tree).toMatchSnapshot() /*? store.getState() */

  tree.props.onClick(event)

  const { location } = store.getState() /*? $.location */

  expect(location.pathname).toEqual('/second/bar')
  expect(location.type).toEqual('SECOND')
})

it('converts href as action object to path', () => {
  const action = { type: 'SECOND', payload: { param: 'bar' } }
  const { tree, store } = createLink({ to: action }) /*? $.tree */

  expect(tree).toMatchSnapshot() /*? store.getState() */

  tree.props.onClick(event)

  const { location } = store.getState() /*? $.location */

  expect(location.pathname).toEqual('/second/bar')
  expect(location.type).toEqual('SECOND')
})

it('converts href as non-matched action object to "#" for path', () => {
  const action = { type: 'MISSED' }
  const { tree, store } = createLink({ to: action }) /*? $.tree */

  expect(tree.props.href).toEqual('#')
  expect(tree).toMatchSnapshot()

  tree.props.onClick(event)

  const { location } = store.getState() /*? $.location */
  expect(location.type).toEqual(NOT_FOUND)
})

it('converts invalid href to "#" for path', () => {
  const { tree, store } = createLink({ to: '' }) /*? $.tree */

  expect(tree.props.href).toEqual('#')
  expect(tree).toMatchSnapshot()

  tree.props.onClick(event)

  const { location } = store.getState() /*? $.location */
  expect(location.type).toEqual(NOT_FOUND)
})

it('supports custom HTML tag name', () => {
  const { tree, store } = createLink({
    to: 'somewhere',
    tagName: 'div'
  }) /*? $.tree */

  expect(tree).toMatchSnapshot()
})

it('supports custom HTML tag name which is still a link', () => {
  const { tree, store } = createLink({
    to: 'somewhere',
    tagName: 'a'
  }) /*? $.tree */

  expect(tree).toMatchSnapshot()
})
