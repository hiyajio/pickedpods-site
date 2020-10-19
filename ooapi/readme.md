# OO API

## What does it do?
- This API takes podcast information and formats it into a more readable and easier to work with JSON. The api has the following functions
- Podcasts can also be saved, and are stored in a json file as a "database"

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