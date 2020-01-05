## Animated Lensed Routing via `href_TSK`

let's say we have this global state data structure:

```js
let global_state = {
  me: { // hydrated by authentication
    profile: {},                                      // |
    account: {}                                       // |
  }                                                   // |
  users: [                                            // |
    {                                                 // |
      user_id: "foughtforname",                       // |
      img: "https://picsum.io/1",                     // |
      bio: "long string of text",                     // |
      social: [                                       // |
        twitter: null,                                // |
        facebook: null, // etc...                     // | 
      ],                                              // |
      firstname: "Some",                              // |
      lastname: "Family",                             // |
      posts: [                                        // |
        "some-article-i-fought-for_543425",           // <-- 
        "some-draft-i-havent-sent_325354"             // |
      ]                                               // |
    },                                                // |
    {                                                 // |
      UID: "anynamewilldothx",                        // |
      img: "https://picsum.io/2",                     // |
      bio: "long string of text",                     // |
      firstname: "Another",                           // |
      lastname: "Family",                             // |
      posts: null                                     // |
    },                                                // |
  ],                                                  // |
  posts: [                                            // |
    {                                                 // |
      post_id: "some-article-i-fought-for_543425",    // <--
      title: "Some Article I Fought for",             // |
      body: "## Markdown \n \n string",               // |
      authors: [ "foughtforname" ],                   // |
      status: "published",
      tags: []
    },                                                // |
  ],                                                  // |
}
```

Types of animations all triggered by `<a href..` events:

### Single Target Mappings

#### Zoom
previous path and new path overlap, but new path is either:
- shorter: zoom out
- longer: zoom in

#### Pivot
paths don't overlap, but their targets share the same `id`
```html
<a id="123" href="/posts/123">
```
here, on `click`ing the link the path is sniffed from the
current window.location.href and compared with the
`parse_href(href)`, but their root path doesn't overlap.
However, the `id` from the href matches the last element in
the `path` parsed from the `href`

### List Targets Mappings

#### Shift
paths are the same, but the `href` causes a sort of one kind
or another of the (list) items in the current path (e.g.,
deletion, addition of new element in list).

In this case, all the `<a id="321"...` links in the parent
container are caculated before running the FLIP

### Custom/multi Targeted Mappings

#### (un)Pack
This is a more complex FLIP due to mutltiple from and to
targets need to be mapped to each other facilitating either
an "unpack" (expand) animation or a "pack" (contract)
animation, where some details that are obscured (no present)
in one view are made visible in another

## Generalization

Essentially each of the single target mappings can be
modeled as a Command and the multi-target mappings as a
Task, however, what makes this complex is that - for
mult-target Tasks, the targets have to be defined
dynamically upon construction of the DOM representation,

consider `run$.next(getSurroundingItems.map(x => Command(x)))`
diagram:
```
<a id="123" href=🔗/> -> 📃 <div id="123" />
```

