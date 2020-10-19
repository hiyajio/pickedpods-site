# Server
## JSON Specification

|Request Type | Resource endpoint | Body | Response |
|:-----------|:-----------------|:----|:-------|
| GET | `/podcasts/all` | None |  JSON list of all podcasts that are currently subscribed to |
| POST | `/podcasts` | `{"url": <podcast url>}` | JSON object of the given podcast | 
| POST | `/podcasts/suscribe` |`{'url':<podcast url>}` |  `{'result': 'success'}`  if success|
| PUT | `/podcasts/suscribe` |`{'url':<podcast url>}` |  `{'result': 'success'}`  if success|
| DELETE | `/podcasts/unsuscribe` | `{'url':<podcast url>}` | `{'result': 'success'}`  if success|
| POST | `/episodes` | `{"url": <podcast url>, "count":<(optional) number of episodes to return>}` | JSON object of the episodes of the given podcast | 

	
## How To Run Server
- Make sure you are in the `/server` folder
- run `python3 app.py`
	- Note: port is 1234 by default, but can be changed in `app.py`

## How To Run Test
- Make sure you are in the `/server` folder and that the server is running locally
	- run `python3 test_api.py`
