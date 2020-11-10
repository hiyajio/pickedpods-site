# PickedPods

Programming Paradigms Final Project


## Server Installation Instructions
- Install the following dependencies
```
pip3 install bs4
pip3 install lxml
pip3 install Flask
pip3 install flask-cors
```

# Server
## JSON Specification

|Request Type | Resource endpoint | Body | Response |
|:-----------|:-----------------|:----|:-------|
| GET | `/podcasts/all` | None |  JSON list of all podcasts that are currently subscribed to |
| POST | `/podcasts` | `{"url": <podcast url>}` | JSON object of the given podcast | 
| POST | `/podcasts/subscribe` |`{'url':<podcast url>}` |  `{'result': 'success'}`  if success|
| PUT | `/podcasts/subscribe` |`{'url':<podcast url>}` |  `{'result': 'success'}`  if success|
| DELETE | `/podcasts/unsubscribe` | `{'url':<podcast url>}` | `{'result': 'success'}`  if success|
| POST | `/episodes` | `{"url": <podcast url>, "count":<(optional) number of episodes to return>}` | JSON object of the episodes of the given podcast | 

	
## How To Run Server
- Make sure you are in the `/server` folder
- run `python3 app.py`
	- Note: port is 1234 by default, but can be changed in `app.py`

## How To Run Test
- Make sure you are in the `/server` folder and that the server is running locally
	- run `python3 test_api.py`

# OO API

## What does it do?
- This API takes podcast information and formats it into a more readable and easier to work with JSON. Podcasts can also be saved, and are stored in a json file as a "database"
- The api has the following functions


### `loadPodcasts()`
- For demo purposes, the api loads a list of podcasts so the database is not empty

### `getAllPodcasts()`
- Returns the json-formatted podcast information for all podcasts in the database

### `getPodcastInfo(url)`
- Returns the json-formatted podcast information for the podcast in the given rss feed url

### `getEpisodes(url, count)`
- Returns a json-formatted list of podcast episodes for the given podcast url
- optional parameter `count` to specify how many episodes should be retrieved

### `subscribe(url)`
- add a podcast to the database

### `unsubscribe(url)`
- remove a podcast from the database

## JSON Formats
### Podcast
	{
		"title":podTitle,
		"rssFeed":url,
		"description":podDescription,
		"author":podAuthor,
		"showArt":podShowArt
	}

### Podcast Episode
	{
		"title":epTitle,
		"audioURL":epURL,
		"description":epDesc,
		"duration":epDuration
	}

## How To Run Test
- Make sure you are in the `/ooapi` folder and that the server is running locally
	- run `python3 test_ws.py`

# Client/JS Frontend

# User Interactions

> __Note__: Current API is hosted in linode so the URL (http://zacharysy.gitlab.io/pickedpods/) should work in loading the interactions (if it doesn't, simply run the server and client locally). If Chrome or any other browser clings to the HTTPS redirect, choose another browser such as Safari (through our testing, both Chrome and Safari have worked).

1. At page startup, 2 GET requests are initiated to display the initial list of podcasts in the list in the side area as well as the latest episode of each in the main area

![1-start-up](../images/1-start-up.png)

2. After these are loaded, users can use the toolbar on the top right hand side of the screen to do 3 interactive things:
    * Add an existing podcast to the list through its RSS feed url (most podcasts have this and can be google-able for testing) by pasting the RSS feed url in the input labeled 'RSS Feed URL'  and clicking 'ADD' (done using POST)
    ![3-add-rss-feed-input](./images/3-add-rss-feed-input.png)
    ![4-add-rss-feed-btn-hover](./images/4-add-rss-feed-btn-hover.png)
    ![5-add-rss-feed-result](./images/5-add-rss-feed-result.png)
    * Delete an existing podcast in the list through its RSS feed url (most podcasts have this and can be google-able for testing) by pasting the RSS feed url in the input labeled 'RSS Feed URL' and clicking 'DELETE' (done using DELETE)
    ![3-add-rss-feed-input](./images/3-add-rss-feed-input.png)
    ![6-delete-rss-feed-btn-hover](./images/6-delete-rss-feed-btn-hover.png)
    ![7-delete-rss-feed-result](./images/7-delete-rss-feed-result.png)
    * Showing more latest episodes (default to only showing one or the actual latest episode) through the number input from 1 - 3 (maxed out at 3 as we are using another API that is rate-limited) (done using a combination of deleting the current HTML elements, another GET request, and using that GET with the new number filter to render the new elements with more than 1 episode)
    ![8-highlight-number-of-eps-1](./images/8-highlight-number-of-eps-1.png)
    ![9-show-number-of-eps-1](./images/9-show-number-of-eps-1.png)
    ![10-highlight-number-of-eps-2](./images/10-highlight-number-of-eps-2.png)
    ![11-show-number-of-eps-2](./images/11-show-number-of-eps-2.png)

3. Miscellaneous jQuery-CSS-HTML interactivity such as:
    * Click on the podcast name in the side area will make the website scroll to that podcast in the main-area
    ![2-scroll-using-side-list](./images/2-scroll-using-side-list.png)
    * Allow the user to scroll not only in the main area buy also the side area depending on the length of the podcast list
    ![5-add-rss-feed-result](./images/5-add-rss-feed-result.png)
    * Scroll down a little a small button will appear at the lower right signifying the scroll-to-top functionality

# Layout Images

## 1-start-up
![1-start-up](./images/1-start-up.png)

## 2-scroll-using-side-list
![2-scroll-using-side-list](./images/2-scroll-using-side-list.png)

## 3-add-rss-feed-input
![3-add-rss-feed-input](./images/3-add-rss-feed-input.png)

## 4-add-rss-feed-btn-hover
![4-add-rss-feed-btn-hover](./images/4-add-rss-feed-btn-hover.png)

## 5-add-rss-feed-result
![5-add-rss-feed-result](./images/5-add-rss-feed-result.png)

## 6-delete-rss-feed-btn-hover
![6-delete-rss-feed-btn-hover](./images/6-delete-rss-feed-btn-hover.png)

## 7-delete-rss-feed-result
![7-delete-rss-feed-result](./images/7-delete-rss-feed-result.png)

## 8-highlight-number-of-eps-1
![8-highlight-number-of-eps-1](./images/8-highlight-number-of-eps-1.png)

## 9-show-number-of-eps-1
![9-show-number-of-eps-1](./images/9-show-number-of-eps-1.png)

## 10-highlight-number-of-eps-2
![10-highlight-number-of-eps-2](./images/10-highlight-number-of-eps-2.png)

## 11-show-number-of-eps-2
![11-show-number-of-eps-2](./images/11-show-number-of-eps-2.png)

---