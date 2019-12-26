# reduce.ac: A framework over [@thi.ng/umbrella](http://thi.ng/umbrella)

Framework components:
- An event-stream based (translucent) web app framework covering architectural needs such as:
  - universal (browser/server) routing
  - 

## Design Goals
- uses pattern matching for routing
- agnostic to where the user enters the app
- deeplinks are supported via "intelligent hydration"
- Not coupled to rendering/view, it's "just data" (mostly)

### Pattern Matching
- Uses `@thi.ng/associative` `EquivMap` for pattern matching

#### Examples
Simple path:
paths are represented as an ordered list (Array)
```
URL: https://example.com/parent/child

parses to:
{ path: [parent, child] }
```

Path with params:
params are represented as an EquivMap (key, value pairs)
```
URL: https://example.com/parent/child?query=just+for+looks

parses to:
{ path: [parent, child], params: {query: "just for looks"} }
```

### Intelligent Hydration

There are a number of ways a user may enter a web app:
1. from the home page (e.g., `/`)
2. from a deeplink (e.g., `/parent/child`): via shared link or bookmark
3. through a link from another page within the same app (e.g., `./child`)

`hurl` intercepts both direct links and click events on link elements and runs through this decision-tree:
1. if it's a relative link (from within the app) it concats a lens from the current path with the relative one
2. if it's a direct link from outside (e.g., a shared link), it requests the state needed to build the page (See "Hydration Strategy")
3. if it's an absolute link from within the app, it diffs the current path with the new one to only request the needed (additional) state

#### Examples:
Basic dispatch on pattern:
```js
import { EquivMap } from "@thi.ng/associative"
import * as P from "@thi.ng/paths"
import { Home, Parent, Child, Four0Four } from "./specs" // cursor+spec components

let route_match = args => {
  let { path, params } = parse_URL(args) // TDB
  return new EquivMap([
    [{path: [""]}, Home],
    [{path: ["parent"], params }, Parent()(params)],
    [{path: ["parent", "child"], params }, Parent(Child)(params)],
  ]).get(parse_URL(args) || Four0Four(path, params)
}
// browser
history.addListener("popState", (a, b, c) => TBD(a, b)(route_match(c)))

```

#### Hydration Strategy

`hurl` follows the principle of "view as a function of state", but gives you the means by which to construct your view from the URL

There are a few elements that come into play here:
1. At the root of the app a URL listener is registered
2. This is a bi-directional listener, i.e., changes/entries into the URL trigger events and events can trigger changes/entries to the URL
3. The URL is the "command center" for all lower-level logic (the logic hub)
4. Pattern matching is used to determine what logic is deployed based on the path and params
5. Patterns are associated with functions that are completely naive (and probably composed of) from de-coupled/independent functionality 
6. Each path is associated with a lens into a global App state


### Global App State

The global application state is a `@thi.ng/atom`, which has a number of useful features we'll need to implement the intelligent hydration
1. Atom can be immutably manipulated via lensed "cursors" (paths) into the data structure
2. Any changes made to the Atom can trigger events (bi-directionality functionality) to subscribers/consumers of the Atom
3. Derived views can be made on top of the atom, which provide a read-only view of the data. This will be where we instrument our views/rendering functionality

In order to implement the intelligent hydration, the app state needs to be able to make remote resource requests for data in order to fullfil any views, which require such data.

Say the user gets a shared link from one of her friends to: https://example.com/parent/child. Here's what happens:
1. The URL listener gets the path: [parent, child]
2. a dispatcher looks for data within the global Atom associated with that path
3. if the data is not empty or `null` (non falsy), that data is presented (i.e., the state is already hydrated, probably from earlier navigation/service worker cache)
4. if the data is falsy, the pattern associated with that path can make the necessary resource requests to hydrate the atom to fulfill the view

Hence, the Pattern matching functionality here is the hub of the logic, implementing:
1. route matches
2. resource requirements and fetching arguments (which might also be contained in the URL as params) for the route
3. any view that is associated with that path

## Views 

It's up to the dev to decide what to do with the data. This is completely agnostic.

The way this could be implemented with `@thi.ng/hdom` is as follows:
- use `deeptransform` transducer, which takes an `hdom` "spec" and applies it to the data

## Route/View Transitions

The router can also be stateful. Consider a user which transitions between two routes with significantly different layouts/views. It would be nice if these transitions would be animated to make them less "janky". I.e., we can keep track of the rendering of the views and record the location of the previous components. Once a user initiates a transition, the diff between the previous and new views can be used to instrument a FLIP transition animation between components/elements that exist on both states and a disolve/fade transition can be applied to the elements leaving/entering between frames. 

Instead of applying this transducer to the actual view (hdom), we would only record the actual rendered position of the last frame (lazily) and attach it to the state/Atom of the previous state, then use that state to calculate the styles for the next view and attach it as styles to the new view. Each state treated as a single element within a collection of TBD state (frame) items. This should be done either via `id` or a `class` that specifies such tracking should be "turned on" to instrument the animation calculation efficiently (i.e., not on every element naively)

This can be implemented by dynamically adorning the deeptransform `spec`s with the needed styles to be deployed on an ad-hoc basis (dynamic render spec formulation/instrumentation)

This the components of this part are as follows:

0. router as a dynamic dispatch function based on pattern recognition
1. page states as elements of a collection of routing states
2. stateful transducer that formulates the next view 'spec' based on a static/config spec and some dynamic FLIP calcuations (consider `@thi.ng/transducers-fsm`)
3. spec application to page state (data separated from view)
4. view rendering and animation via specs 

## API-first Design

With this design, the web app could be instrumented so that by "flipping a switch" (e.g., via prepending `api` -> https://api.example.com/parent/child), the raw/JSON data view could be shown instead of the rendered markup.

The pattern matching for this could be as easy as creating one pattern matching function that responds to routes after the base URL and then - a super ordinate - pattern match that (depending on whether or not `api` is prepended) renders either the hdom components or just returns JSON data (without specs applied)

## Benefits and Trade-offs

### Trade-offs
1. This design requires more forethought in design of an application as the rendered view is the last step in the process, whereas - in a conventional web app design - you may start "with the end in mind" (i.e., views) and work your way up to the logic
2. This design is more difficult than an ad-hoc design pipeline and may lend itself less to a conventional design -> implementation workflow (with the respective division of labor between them). I.e., the rendered view needs to be intimately "aware" of the data structure (not the other way around).

### Benefits
1. This is a de-coupled approach to web app architecture; it avails itself as both a purely data-oriented approach (and thus agnostic to whether or not the data is precalculated from remote servers or dynamically accumulated via user-initiated client-side event streams
2. Since the view is rather superficially applied to the state/data, it can be imagined that one might target alternative rendering targets (via alternative "specs") with the same routing/data-hydration architecture (e.g., web, mobile-native, smart-watch, IOT, etc.)


#### [Documentation Site](https://loganpowell.github.io/hurl/hurl/0.1.0/)

Documentation generated from markdown comments in source powered by [`jsdoc`](https://www.npmjs.com/package/jsdoc)  with jsdoc's `"plugins/markdown"`

Template from [Braintree](https://braintree.github.io/)'s [`jsdoc-template`](https://github.com/braintree/jsdoc-template)

Setup can be a bit confusing, so I create a [gist](https://gist.github.com/loganpowell/62b8e06a8a6b38540e6268fc2048f5ee) as a sort of note to self, but you may also find it useful if you like the docs of this site.


 
```

 888-~88e  e88~~8e  Y88b    e    / 
 888  888 d888  88b  Y88b  d8b  /  
 888  888 8888__888   Y888/Y88b/   
 888  888 Y888    ,    Y8/  Y8/    
 888  888  "88___/      Y    Y     
                                   
``` 

# Cascade

## Stated Cascade Unidirectional Rendering

Order of execution:
1. Any async data gathering/transformation happens pre-state update
2. All rendering/presentation-oriented feature is a function of state (direct or derived) 

Diagram: 

0: Setup -> register cursors on global state for various components
⬇ 
1: Prep -> any data gathering / xformation
⬇ 
2: State Update -> manipulation of global state Atom
⬇ 
3: State Stream -> downstream state updates to registered components
⬇ 
4: Render (RAF) sidechain -> new view is rendered based on updated state

---
## Lexing (Compile Time)

ARCH: (ctx) => (ctx.state_stream.deref(), ctx.trigger_stream.next({🤔}), )
               |- === === read === === -| |- === === write === === -|

### Example components (powered downstream from state updates):
- URL
  - state_stream
  - state_stream.subscribeTopic(["router"]
    - render
- DATA
  <head>
  - state_stream
    - render
  <body>
  - state_stream
    - render

### Example triggers (powered upstream to state)
- `addeventlistener`s
  - `popstate`
    - cursor_popstate = cursor(["router], DB)
    - trigger_stream.subscribe("route", x => cursor_popstate.reset(y => y = x))
  - `DOMContentLoaded`
    - cursor_styles = cursor(["styles"], DB)
    - trigger_stream.subscribe("styles", x => cursor_styles.reset(y => y = x))
- UI interactions (dispatch)
  - trigger_stream.next({}) -> inject event from `ctx` 

#### 0: Setup
Register UI components on global state Atom as cursors, which both provide a `deref`able view of global state and its registered components 


### Triggers are transducers that are composed on the fly (runtime)

Triggers that are composed into an array are invoked on a substream (using R.invoker?) one step at a time. This allows the user to cancel the entire stream via (e.g., during loading of the steps) `triggers.cancel()` to terminate the entire subprocess before it completes.

An array of triggers spins up a `transducers-fsm` state machine, that controls the passing of values between triggers and emits values to the `triggers.next` stream with these conditions:

- if event contains `resolve` key: resolve promise then 
- if `payload` type === "function": use fsm state ({ state: "pass", payload: [result of function]

Canceling can either be explicitly injected with `triggers.cancel()` or can 

🌊 All pending state updates are batched and send in a single `transaction` at the end of the sequence

#### Signature:

```js
// Higher Order Trigger (used in-situ)
let prefetch_link = (ctx, ev) => {
  ev.preventDefault()

  if (window.location.href === ev.target.href) return // one way of handling noops
  
  // single event object just directly pushes to the triggers stream in the stream xf
  // first set state.loading = true
  ctx.run.next({
    sub: "state",
    path: ["body", "loading"]
    payload: true
  })

  // an array triggers the fsm to pass data between events and batch state updates 
  // run/batch up a sequence of events
  ctx.run.next([
    {
      sub: "init", // sets initial state of FSM
      args: local_state => local_state["href"] = ev.target.href
    },
    {
      sub: "filter", // another way to handle noops -> only emit if passes predicate 
      args: ({ href }) => window.location.href !== href
    },
    {
      // if the xf returns a promise, it is resolved before passing
      sub: "promise", 
      args: ({ href }) => fetch("something" + parse_hurl(href)["path"]),
      // splitting behavior
      // dispatch to next (invoker .next triggers)
      then: local_state => local_state["data"] = r.json(),
      // dispatched to alternative stream (invoker .next errors) and triggers.cancel()
      catch: () => ({ sub: "cancel" args: e })
      }
    },
    {
      sub: "refer",
      args: ({ data }) => route(data, ev.target.href)
    }
  ]) 
}

// Lower Order Trigger (on triggers.next("route") )
let route = (data, href) => [
  {
    sub: "init",
    args: local_state => local_state["init"] = href
  },
  {
    sub: "FLIP", 
    // options (1): https://github.com/davidkpiano/flipping#new-flippingoptions
    // options (2): https://github.com/aholachek/react-flip-toolkit/tree/7382f9380200f5a85296621db852ea2513cc5eec/packages/flip-toolkit
    args: "start" || { opts } // just use the default (empty) new Flipping() 
  },
  {
    sub: "state",
    path: ["head"],
    // 📌 have to create a function that generates/overwrites these defaults...
    args: {
      title: `Hyperlocals ${search && "Search Results for: " + search}`,
      "og:description": "social media for people who hate social media",
      "og:type": "website",
      "og:url": href,
      "og:image": pic,
      "og:image:width": 1200,
      "og:image:height": 1200
    }
  },
  {
    id: "state",
    path: ["body", "content"],
    args: data,
  },
  {
    id: "state",
    path: ["body", "loading"],
    args: false
  },
  {
    id: "state",
    path: ["route"]
    args: { state: parse_URL(href), href }
  },
  {
    id: "pushstate",
    args: { state: parse_URL(href), href }
  },
  {
    id: "FLIP",
    args: "end"
  }
]
```

## PubSub Dispatcher

The dispatching function is an `thi.ng/rstream` `pubsub` instance, which is dispatched to with an asyncronous reduction:

```js


```

## DOM listeners

DOM listeners are registered to the triggers stream as well and can be used to inject events into the stream.

Examples:
- if navigation is executed during `["body", "loading"] === true`, user cancels any pending events in the stream with `triggers.cancel()`,

if any higher order triggers are aliases for lower-order triggers, the lower-order triggers are unwrapped and applied in place of their higher-order alias before emitting event through first higher-order trigger
---

## Parsing (Runtime)

### 1: Prep
Any function that seeks to change the UI

```  
                                          
  888-~88e-~88e  e88~-_  888-~\  e88~~8e  
  888  888  888 d888   i 888    d888  88b 
  888  888  888 8888   | 888    8888__888 
  888  888  888 Y888   ' 888    Y888    , 
  888  888  888  "88_-~  888     "88___/  
                                          
```

inspired by the elm-architecture

- messages / commands -> (event stream) can contain: 
  - a single update command: 
  { 
    path: ['lens', 'to', 'junk'],
    payload: ...whatevs...,
    ...tbd 
  }
  - a transaction command (`state_stream is written to as an `@thi.ng/Atom.transaction`):
  [
    { 
      path: ['first', 'path'],
      payload: { first: 'payload'}, 
    },
    {
      path: ['second', 'path'],
      payload: { second: 'payload' }
    }
  ]
  - any functionality needed for async is done at call site (for deterministic state mgmt)
    - can be lifted into a util if concern is cross-cutting
    - the command with the functions powering the state/path updates may also be encapsulated as modules and used across multiple components for even greater reuse with the advantage of organizing state (consider importing all such modules into the creation of initial Atom for path 'registration'

- state -> (atom) store for write/read intersection:
  - central "update" dispatcher (from elm)
  - subscribes to `event_stream` and allows immutable updates to state using the `path` and `payload` of the event.dispatching mech can be:
    - an `@thi.ng/EquivMap` if you want to use the raw (array-based) path 
    - take the array and turn it into a dot-string for matching on a regular es6 Map
    - take the actual path and use it with `@thi.ng/paths` for immutable updates to the central store/Atom
  - dispatches events for view update on a separate `state_stream` (read only)
  - state stream is subscribed to from all `view`s (can be derived views of the atom
- view (hdom component/s)
  -   
