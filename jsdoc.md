# JSDocs doc... (meta)

## Installation

Recommended: Install as a `-D` devdependency

```
npm i -D jsdoc
```

## CLI configuration:

```
jsdoc -c jsdoc.json src -r -d docs
```

Breaking this down:
- `jsdoc`: Global CLI install
- `-c jsdoc.json`: use configuration file at this path (more below)
- `src -r`: just recurs through all the files in the `src` directory
- `-d docs`: destination folder

### Configuration file

If you need to do anything more fancy with your configuration, it's recommended to use a `.json` or `.js` config file with a simpler node script 

```
  "scripts": {
    "docs": "jsdoc --configure jsdoc.json --verbose"
  },
```

Markdown is enabled by creating a `jsdoc.json` file (I use root, but wherevs):

```js
{
  "tags": {
    "allowUnknownTags": true,
    "dictionaries": ["jsdoc"]
  },
  "source": {
    // which files and folders to parse
    "include": ["src", "package.json", "README.md"],
    "includePattern": ".js$",
    "excludePattern": "(node_modules/|docs)"
  },
  "plugins": [
    // very nice plugin for rendering markdown in comments
    "plugins/markdown"
  ],
  // TEMPLATE SPECIFIC CONFIG ➡ https://github.com/braintree/jsdoc-template
  "templates": {
    // shows up right below the 🏠 link of your doc site
    "referenceTitle": "HURL Documentation",
    // `false` will sort the docs alphabetically, which I didn't want
    "disableSort": true, 
    //  When set to true only the active component's members are expanded.
    "collapse": true,
    // just some links for external resources. Can be whatever you want
    "resources": {
      "@thi.ng/umbrella": "http://thi.ng/umbrella"
    }
  },
  "opts": {
    "destination": "./docs/",
    "encoding": "utf8",
    "private": true,
    // recur through files/folders in the `"source": { "include":` path
    "recurse": true,
    // the weird bit:
    "template": "./node_modules/jsdoc/templates/jsdoc-template"
  }
}
```

## Templates

### Step 1: Clone a template ([example](https://github.com/braintree/jsdoc-template)) into the _local_ `node_modules/jsdoc/templates` directory

This is the weirdest part of the process. 

Dealing with absolute paths and node is a nightmare, especially on Windows. Though you may clone your template into the global jsdoc node_modules folder, the way I did it was to actually clone the template into the local (dev dependency) in the jsdoc/templates directory:

In the above `jsdoc.json` config, note the `"opts": { "template": "./node_modules/jsdoc/templates" }` directory. This is where you'll clone your copy of your desired template.

I know, it's weird, but I couldn't figure out any other way of doing it.

### Step 2: Add the `"template"` key to your `jsdoc.json` config file

As shown above

### Step 3: Run the command

```
npm run docs
```

### Helpful commands:
- `jsdoc -h`: Help

TODO:
See [@module FileNameOrCustomModuleName](https://stackoverflow.com/a/52712934) comments for breaking up the "everything Global" generated site structure