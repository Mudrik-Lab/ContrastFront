# Multiple projects in the save source directory

## Problem

We want to have multiple projects in the same source directory.
We want the projects to be independent of each other, at some level but to share node modules, configurations, and components.

## Solution
Vite has a feature called Multi-page app, which allows us to have multiple entry points in the same source directory.
Vite also has a difference between mode and environment variables, which allows us to have different configurations for each project.


### References

- [Multiple projects in the same source directory](https://stackoverflow.com/questions/74159670/vite-multiple-apps-with-same-source)
- [Vite Docs](https://vitejs.dev/guide/features.html#multi-page-app)
- [build-javascript-library-with-multiple-entry-points-using-vite-3](https://www.raulmelo.me/en/blog/build-javascript-library-with-multiple-entry-points-using-vite-3)
