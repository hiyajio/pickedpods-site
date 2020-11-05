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

