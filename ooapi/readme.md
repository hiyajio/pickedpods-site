# OO API

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
- Make sure you are in the `/server` folder and that the server is running locally
	- run `python3 test_ws.py`