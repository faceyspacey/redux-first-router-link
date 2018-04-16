import { NOT_FOUND } from 'redux-first-router'
import { createNavLink, event } from '../__test-helpers__/createLink'

test('NON-EXACT: show active class', () => {
  const { tree } = createNavLink('/first', {
    to: '/first',
    activeClassName: 'active'
  }) /*? $.tree */

  expect(tree).toMatchSnapshot() /*? store.getState() */
})

test('EXACT: DONT show active class', () => {
  const { tree } = createNavLink('/second/dog', {
    to: '/second',
    exact: true,
    activeClassName: 'active'
  }) /*? $.tree */

  expect(tree).toMatchSnapshot() /*? store.getState() */
})

test('STRICT: DONT show active class', () => {
  const { tree } = createNavLink('/first', {
    to: '/first/',
    strict: true,
    activeClassName: 'active'
  }) /*? $.tree */

  expect(tree).toMatchSnapshot() /*? store.getState() */
})

test('show activeStyle', () => {
  const { tree } = createNavLink('/first', {
    to: '/first',
    activeStyle: { color: 'red' }
  }) /*? $.tree */

  expect(tree).toMatchSnapshot() /*? store.getState() */
})

test('combine with existing styles and class', () => {
  const { tree } = createNavLink('/first', {
    to: '/first',
    className: 'foo',
    style: { fontSize: 32 },
    activeClassName: 'active',
    activeStyle: { color: 'red' }
  }) /*? $.tree */

  expect(tree).toMatchSnapshot() /*? store.getState() */
})

test('reacts to state changes (onClick)', () => {
  const { tree, store, component } = createNavLink('/first', {
    to: '/second/bar',
    activeClassName: 'active'
  })

  expect(tree.props.className).not.toBeDefined()
  expect(tree).toMatchSnapshot() /*? tree */

  // store.dispatch({ type: 'SECOND', payload: { param: 'bar' } })
  tree.props.onClick(event) // this dispatches above action (obviously)

  const tree2 = component.toJSON() /*? */

  expect(tree2.props.className).toEqual('active')
  expect(tree2).toMatchSnapshot()
})

test('isActive returns true', () => {
  const { tree, store } = createNavLink('/first', {
    to: '/first',
    activeClassName: 'active',
    isActive: (match, location) => {
      expect(match).toMatchSnapshot()
      expect(location).toMatchSnapshot()
      return match
    }
  })

  expect(tree).toMatchSnapshot()
})

test('isActive return false', () => {
  const { tree, store } = createNavLink('/first', {
    to: '/first',
    activeClassName: 'active',
    isActive: (match, location) => {
      expect(match).toMatchSnapshot()
      expect(location).toMatchSnapshot()
      return false
    }
  })

  expect(tree).toMatchSnapshot()
})

it('supports custom HTML tag name', () => {
  const { tree, store } = createNavLink('/first', {
    to: '/second',
    activeClassName: 'active',
    tagName: 'div'
  }) /*? $.tree */

  expect(tree).toMatchSnapshot()
})

it('supports custom HTML tag name in active mode', () => {
  const { tree, store } = createNavLink('/first', {
    to: '/first',
    activeClassName: 'active-foo',
    tagName: 'div'
  }) /*? $.tree */

  expect(tree).toMatchSnapshot()
})

it('supports custom HTML tag name which is still a link', () => {
  const { tree, store } = createNavLink('/first', {
    to: 'somewhere',
    tagName: 'a'
  }) /*? $.tree */

  expect(tree).toMatchSnapshot()
})

test('query params are ommitted', () => {
  const { tree } = createNavLink('/first', {
    to: '/first?foo=123',
    activeClassName: 'active'
  })

  expect(tree).toMatchSnapshot()
})

test('function as Child is executed with active boolean', () => {
  const children = jest.fn(() => '')
  const { tree } = createNavLink('/first', {
    to: '/first',
    children
  })

  expect(children).toBeCalledWith(true)
})
