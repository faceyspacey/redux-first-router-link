# redux-first-router-link

<p align="center">
  <a href="https://www.npmjs.com/package/redux-first-router-link">
    <img src="https://img.shields.io/npm/v/redux-first-router-link.svg" alt="Version" />
  </a>

  <a href="https://travis-ci.org/faceyspacey/redux-first-router-link">
    <img src="https://travis-ci.org/faceyspacey/redux-first-router-link.svg?branch=master" alt="Build Status" />
  </a>

  <a href="https://lima.codeclimate.com/github/faceyspacey/redux-first-router-link/coverage">
    <img src="https://lima.codeclimate.com/github/faceyspacey/redux-first-router-link/badges/coverage.svg" alt="Coverage Status"/>
  </a>

  <a href="https://greenkeeper.io">
    <img src="https://badges.greenkeeper.io/faceyspacey/redux-first-router-link.svg" alt="Green Keeper" />
  </a>

  <a href="https://lima.codeclimate.com/github/faceyspacey/redux-first-router-link">
    <img src="https://lima.codeclimate.com/github/faceyspacey/redux-first-router-link/badges/gpa.svg" alt="GPA" />
  </a>

  <a href="https://www.npmjs.com/package/redux-first-router-link">
    <img src="https://img.shields.io/npm/dt/redux-first-router-link.svg" alt="Downloads" />
  </a>
  
  <a href="https://snyk.io/test/github/faceyspacey/redux-first-router-link">
    <img src="https://snyk.io/test/github/faceyspacey/redux-first-router-link/badge.svg" alt="Known Vulnerabilities" data-canonical-src="https://snyk.io/test/github/faceyspacey/redux-first-router-link">
  </a>

  <a href="https://www.npmjs.com/package/redux-first-router">
    <img src="https://img.shields.io/npm/l/redux-first-router.svg" alt="License" />
  </a>
</p>

## Installation
```bash
yarn add redux-first-router-link
```

## Usage

```javascript
import Link from 'redux-first-router-link'

// as a standard href path string:
<Link href='/list/db-graphql'>DB & GRAPHQL</Link>

// as an array of path segments:
<Link href={['list', 'react-redux']}>REACT & REDUX</Link>

// as an action object:
<Link href={{ type: 'LIST', payload: { category: 'fp' } }}>FP</Link>
```

In all **3 cases**, a simple link will be rendered, eg:

```javascript
<a href='/list/fp'>FP</a>
````


## Recommendation

Creating your links with `hrefs` as an action object is obviously the best solution, as it will allow you to change
static path segments in the `routesMap` you pass to `connectRoutes()` at any time, without
having to change any of your `<Link />` components. That means you only have to change URLs in one place. 

For example, if you have:

```javascript
import { createStore, compose, applyMiddleware, combineReducers } from 'redux'
import createBrowserHistory from 'history/createBrowserHistory'
import connectRoutes from 'redux-first-router'

const history = createBrowserHistory()

const { enhancer, middleware, reducer } = connectRoutes(history, {
  LIST: '/list/:category'
})

const rootReducer = combineReducers({ location: reducer })
const store = createStore(rootReducer, compose(enhancer, applyMiddleware(middleware)))
```

Then you can change the static segment of the path at any time, eg:
```javascript
const { middleware, enhancer, reducer } = connectRoutes(history, {
  LIST: '/browse/:category'
})
```

But its entirely up to you. If it's easier to start to thinking in terms of paths, go for it! If that's the case, we recommend the 
array syntax, since its easier to pass variables, eg:

```javascript
const category = 'react-redux'
const href = ['list', category]
<Link href={href}>REACT & REDUX</Link>
```
vs

```javascript
const category = 'react-redux'
const href = `/list/${category}` // can get long & yucky with lots of variables
<Link href={href}>REACT & REDUX</Link>
```


## Additional Props:

* **down: boolean = false** - if `true` supplied, will trigger linking/dispatching `onMouseDown` instead of `onMouseUp`
* **shouldDispatch: boolean = true** - if `false` will not dispatch (useful for SEO when action handled elsewhere)
* **target: string** - eg: `'_blank'` to open up URL in a new tab (same as standard `target` attribute to `<a>` tags)
* **onPress: (SyntheticEvent) => ?boolean** - you can provide an `onPress` handler to do anything you want (e.g. play a sound), but if you return `false` it will prevent
  linking/dispatching just as you may be used to. TIP: Use returning `false` instead of `shouldDispatch` when you want to dynamically determine
  whether to trigger the action or not!
* **...props:** - you can pass any additional props that an `<a>` tag takes, such as `className`

