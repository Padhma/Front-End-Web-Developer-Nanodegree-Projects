# Project Overview

In this project a web-based application has been given that contains reads RSS feeds.
## Why this Project?

Testing is an important part of the development process and many organizations practice a standard of development known as "test-driven development". This is when developers write tests first, before they ever start developing their application. All the tests initially fail and then they start writing application code to make these tests pass.

## How I did this project?

For a given web-based application, tests have been written based on Requirements using the JavaScript testing framework Jasmine.

* A test to check whether allFeeds contain URL and it is not empty.
* A test to check whether allFeeds contain a name and it is not empty.
* A new test suite called "The Menu"
* "The Menu" test checks whether the menu is hidden and toggles correctly.
* A new test suite called "Initial Entries"
* It checks whether the .feed container has at least one entry.
* A new test suite called "New Feed Selection" which checks whether the content of the feed changes each time.

## How to run this project?

* Open the index.html file in your browser.
* Once all the tests are passed it appears at the bottom of the screen.
* The js/app.js file contains the necessary functions for the application.
* A new test suite is written in the jasmine/spec/feedreader.js file.
