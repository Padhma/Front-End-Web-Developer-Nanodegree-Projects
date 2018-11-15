/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('URL defined for each feed and URL is not empty',function(){
            //loop through each feed
            for(let feedURL of allFeeds) {
                //checks whether a URL is defined
                expect(feedURL.url).toBeDefined();
                //checks if the URL is not empty
                expect(feedURL.url.length).not.toBe(0);
            }
        });

        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('name defined and it is not empty',function(){
            //loop through each feed
            for(let feedName of allFeeds){
                //checks for a name
                expect(feedName.name).toBeDefined();
                //checks if the name is not empty
                expect(feedName.name.length).not.toBe(0);
            }
        });
    });


    /* TODO: Write a new test suite named "The menu" */
    describe('The Menu',function(){

        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        //checks if the menu is hidden
        it('menu is hidden by default',function(){
            let feedBody = document.querySelector('body');
            expect(feedBody.classList.contains('menu-hidden')).toBe(true);
        });

         /* TODO: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
        it('menu changes when clicked',function(){
            let feedBody = document.querySelector('body');
            let menuLink = document.querySelector('.menu-icon-link');
            //checks whether the menu toggles on each click
            menuLink.click();
            expect(feedBody.classList.contains('menu-hidden')).toBe(false);
            menuLink.click();
            expect(feedBody.classList.contains('menu-hidden')).toBe(true);
        })
    });

    /* TODO: Write a new test suite named "Initial Entries" */


    describe('Initial Entries',function(){
        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */

        //calls the loadFeed function
        beforeEach(function(done){
            loadFeed(0,done);
        });

        it('at least one .entry element within .feed container',function(done){
            let entry = document.querySelectorAll('.entry');
            //checks if there is at least one entry
            expect(entry.length).toBeGreaterThan(0);
            done();
        });
    });
    /* TODO: Write a new test suite named "New Feed Selection" */

        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
    describe('New Feed Selection',function(){
        let firstURL, secondURL;

        beforeEach(function(done){
            let baseEntry = document.querySelector('.entry-link');
            //gets the previous URL content
            firstURL = baseEntry.getAttribute("href");
            loadFeed(1,done);
        });

        it('a new feed is loaded by the loadFeed function',function(done){
            let baseEntry = document.querySelector('.entry-link');
            //gets the next URL content
            secondURL = baseEntry.getAttribute("href");
            //expects the first and second URL content to be not same
            expect(secondURL).not.toBe(firstURL);
            done();
        });

    });

}());
