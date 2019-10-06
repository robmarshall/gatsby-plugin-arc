# gatsby-plugin-arc

Easily add [Arc](https://arc.io/) to your Gatsby site.

## Install

`npm install gatsby-plugin-arc`

or

`yarn add gatsby-plugin-arc`

## How to use

```javascript
// In your gatsby-config.js
module.exports = {
  plugins: [
    {
      resolve: `gatsby-plugin-arc`,
      options: {
        widgetId: "YOUR_WIDGET_ID",
        // Defines where to place the tracking script - `true` in the head and `false` in the body
        head: true,
        // Disables CDN and monetization on these pages
        disable: ["/preview/**", "/nothing-here/at-all"],
        // Disables CDN for certain pages
        disableCDN: ["/preview/**", "/no-cdn-here/please"],
        // Enable on these NODE_ENV environments (defaults to only production)
        env: ['production']
      },
    },
  ],
}
```

## Options

### `widgetId`

Here you place your Arc widget id.

### `head`

Where do you want to place the Arc script? By putting `head` to `true`, it will be placed in the "&lt;head&gt;" of your website. By setting it to `false`, it will be placed in the "&lt;body&gt;". 

Defaults to `true` - as the head is recommended by Arc.

### `disable`

Optional [array/boolean]

If you need to disable any path from running Arc completely, you can add it (one or more) to this optional array as glob expressions. You can also use boolean to completely disable/enable.

Defaults to `false` - all enabled.

### `disableCDN`

Optional [array/boolean]

If you need to disable any path from running Arc CDN but still monetize the path, you can add it (one or more) to this optional array as glob expressions. You can also use boolean to completely disable/enable. Defaults to all enabled.

Defaults to `true` - all disabled.

### `env`

Optional [array]

Allows the Arc plugin to be enabled on certain NODE_ENV environments.

Defaults to `['production']`
