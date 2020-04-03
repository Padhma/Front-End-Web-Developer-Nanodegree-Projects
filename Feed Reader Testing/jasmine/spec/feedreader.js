/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

$(function() {
    describe('RSS Feeds', function() {
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        it('URL defined for each feed and URL is not empty',function(){
            //loop through each feed
            for(let feedURL of allFeeds) {
                //checks whether a URL is defined
                expect(feedURL.url).toBeDefined();
                //checks if the URL is not empty
                expect(feedURL.url.length).not.toBe(0);
            }
        });

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

    describe('The Menu',function(){

        //checks if the menu is hidden
        it('menu is hidden by default',function(){
            let feedBody = document.querySelector('body');
            expect(feedBody.classList.contains('menu-hidden')).toBe(true);
        });

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

    describe('Initial Entries',function(){
        //calls the loadFeed function
        beforeEach(function(done){
            loadFeed(0,done);
        });

        it('at least one .entry element within .feed container',function(){
            let entry = document.querySelectorAll('.feed > .entry-link');
            //checks if there is at least one entry
            expect(entry.length).toBeGreaterThan(0);
        });
    });

    describe('New Feed Selection',function(){
        let feed = document.querySelector('.feed');
        let feedArray = [];

        beforeEach(function(done){
            loadFeed(0, function(){
                Array.from(feed.children).forEach(function(e){
                    feedArray.push(e.innerText);
                });
                loadFeed(1,done);
            });
        });
        it('content changes when a new feed is loaded',function(){
            Array.from(feed.children).forEach(function(loadedFeed, index){
               expect(feedArray[index]).not.toContain(loadedFeed.innerText);
            });
        });
    });


}());
