# grunt-mwat

Creates multiple language versions of a site based on vocab JSON files and templates.  Example:

```
grunt.initConfig({
  mwat: {
    default: {
      options: {
        dictionary:  'vocabs'
      },
      files: {
        'destination_folder': ['templates/**.html']
      }
    }
  }
});
```

Will take vocab objects and templates:

```
templates/index.html
vocabs/english.json
vocabs/mundo.json
```

And create the following output:

```
destination_folder/english/index.html
destination_folder/mundo/index.html
```

The vocab objects are JSON, each property corresponds to a variable in the template file...

```
{
foo: "bar"
}
```

```
<p><%= foo %></p>
```

It uses [lodash's template engine](http://lodash.com/docs#template).

## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-mwat --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-mwat');
```

## The "mwat" task
_Run this task with the `grunt less` command._

Task targets, files and options may be specified according to the grunt [Configuring tasks](http://gruntjs.com/configuring-tasks) guide.

### Options

#### dictionary
Type: `String`
Default value: ''

Mandatory path relative from your grunt file where your vocab JSON files reside. 

### Special variables

When the templates run, there are additional template variables available that are not defined by the vocab or options.data object.  This are:

`<%= vocab_dir %>` - name of directory template is being rendered into, e.g. 'english'.

