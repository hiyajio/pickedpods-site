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