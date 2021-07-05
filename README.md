# Angular Assessment

## Overview

Developed in the Ubuntu version of VS Code, and tested using recent versions of Firefox and Vivaldi. Notable VS Code extensions included [`es6-string-html`](https://marketplace.visualstudio.com/items?itemName=Tobermory.es6-string-html) (enables HTML syntax highlighting for template strings prefixed with a `/*html*/` comment).

### Styles and Appearance

Style sheets are written in SCSS. CSS frameworks were assumed to be part of the restriction on external libraries, and were avoided. Likewise symbols like ✓ and ❮ ❯ were handled with Unicode characters rather than external images or a webfont.

### Angular Router

A basic routing structure is implemented, including the landing page (root path), and a 404 Error page (any other path).

### Table and Pagination

Clicking on the table header selects all rows, including those on other pages; click again while all are selected to deselect all. Once selected, a row will remain selected until clicked again (or a deselect all command is give); no Ctrl+click or Shift+click modifiers were implemented.

The "rows per page" dropdown below the table (`custom-select`) doesn't rely on JS for rendering and closing the popup, but does use `IntersectionObserver` to switch the popup's expansion direction when it would clip outside the viewport. The option to display 1 record per page was included to make this behaviour easier to demonstrate.

When the user changes the number of rows per page, the page number is automatically updated to ensure that the head of the data previously being viewed remains visible. E.g. while viewing "rows 51-60" (page 5), if the user switches from 10 rows per page to 40, they will be taken to "rows 41-80" (page 2) which includes the previous content.

If the list of users is empty, the table body will be replaced by a message informing the user that no results were found.

### Chart

Chart was implemented as dynamic embedded SVG.

The Y axis is normally labelled from 0-1000. However, if any Y values are higher than 1000, it will use that as its maximum instead, rounded up to the nearest 100.

On small screens, the layout of the infobox changes to place the chart at the bottom rather than the right.

### AJAX

Mock user data, consisting of 100 dummy users, is retrieved from `/assets/users.json` at runtime via HTTP GET request. If the request is unsuccessful after 3 retries, an error message will displayed.

Code for generating an arbitrary number of dummy users can be found in `/src/app/user.ts`.

## Running

Commands are standard for [Angular CLI](https://github.com/angular/angular-cli) version 12.0.5.

- `ng serve` - Run the dev server at `http://localhost:4200/`. Hot reloading is enabled for all changes to the source files.
- `ng build` - Create a production build, outputted to the `dist/` folder.
