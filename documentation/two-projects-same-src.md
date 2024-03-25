# Multiple projects in the save source directory

## Problem

We want to have multiple projects in the same source directory.
We want the projects to be independent of each other, at some level but to share node modules, configurations, and components.

## Solution
Vite has a feature called Multi-page app, which allows us to have multiple entry points in the same source directory.
Vite also has a difference between mode and environment variables, which allows us to have different configurations for each project.

## Things to consider

- I've tried to put the html files in different folder. But vite does not support that. And the trials to change the root of the folder bare little fruit. So all html files are in the root of the source directory.
- The only way to change the default html file is with a vite built-in plugin: [vite-plugin-html](https://vitejs.dev/guide/api-plugin.html#conditional-application)
- The big problem with all of this was with the dev server and **Not the build**. As far as I could see changing the build was pretty strait forward.

### Breaking changes

The goal is here **Not to have any breaking changes**. At least not for now.

In the future we could delete index.html and main.jsx files.

### References

- [Vite Docs - multi page apps](https://vitejs.dev/guide/features.html#multi-page-app)
- [Vite Docs - build config](https://vitejs.dev/guide/build)

### All kinds of experiments and hacks (not official)
- [Multiple projects in the same source directory](https://stackoverflow.com/questions/74159670/vite-multiple-apps-with-same-source)
- [build-javascript-library-with-multiple-entry-points-using-vite-3](https://www.raulmelo.me/en/blog/build-javascript-library-with-multiple-entry-points-using-vite-3)
