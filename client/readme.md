Current API is hosted in linode so the above URL should work in loading the interactions.
(1) At page startup, 2 GET requests are initiated to display the initial list of podcasts in the list in the side area as well as the latest episode of each in the main area
(2) After these are loaded, users can use the toolbar on the top right hand side of the screen to do 3 interactive things:
    (a) Add an existing podcast to the list through its RSS feed url (most podcasts have this and can be google-able for testing) by pasting the RSS feed url in the input labeled 'RSS Feed URL'  and clicking 'ADD' (done using POST)
    (b) Delete an existing podcast in the list through its RSS feed url (most podcasts have this and can be google-able for testing) by pasting the RSS feed url in the input labeled 'RSS Feed URL' and clicking 'DELETE' (done using DELETE)
    (c) Showing more latest episodes (default to only showing one or the actual latest episode) through the number input from 1 - 3 (maxed out at 3 as we are using another API that is rate-limited) (done using a combination of deleting the current HTML elements, another GET request, and using that GET with the new number filter to render the new elements with more than 1 episode)
(3) Miscellaneous jQuery-CSS-HTML interactivity such as:
    (a) clicking on the podcast name in the side area will make the website scroll to that podcast in the main-area, 
    (b) allowing the user to scroll not only in the main area buy also the side area depending on the length of the podcast list, and
    (c) by scrolling down a little a small button will appear at the lower right signifying the scroll-to-top functionality