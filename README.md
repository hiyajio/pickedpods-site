# PickedPods

Programming Paradigms Final Project

## JSON Spec

|Request Type | Resource endpoint | Body | Response |
|:-----------|:-----------------|:----|:-------|
| GET | `/podcasts/all` | None |  JSON list of all podcasts that are currently subscribed to |
| POST | `/podcasts` | `{"url": <podcast url>}` | JSON object of the given podcast | 
| POST | `/podcasts/suscribe` |`{'url':<podcast url>}` |  `{'result': 'success'}`  if success|
| PUT | `/podcasts/suscribe` |`{'url':<podcast url>}` |  `{'result': 'success'}`  if success|
| DELETE | `/podcasts/unsuscribe` | `{'url':<podcast url>}` | `{'result': 'success'}`  if success|
| POST | `/episodes` | `{"url": <podcast url>, "count":<(optional) number of episodes to return>}` | JSON object of the episodes of the given podcast | 


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
	
## Backend Installation Instructions
- All the python dependencies should already be installed in the `/backend` folder
- In the unlikely event a dependency does not work, run:
```
pip3 install bs4
pip3 install lxml
pip3 install Flask
```
	
## How To Run Server
- Make sure you are in the `/backend` folder
- run `python3 app.py`
	- Note: port is 1234 by default, but can be changed in `app.py`

## How To Run Tests
- Make sure you are in the `/backend` folder and that the server is running locally
- run `python3 test.py`
- and `python3 test_api.py`