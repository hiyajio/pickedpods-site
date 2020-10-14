# PickedPods

Programming Paradigms Final Project

|Request Type | Resource endpoint | Body | Response |
|:-----------|:-----------------|:----|:-------|
| GET | `/podcasts/all` | None |  JSON list of all podcasts that are currently subscribed to |
| GET | `/podcasts?url=<podcast url>` | None | JSON object of the given podcast | 
| POST | `/podcasts/suscribe` |`{'url':<podcast url>}` |  `{'result': 'success'}`  if success|
| PUT | `/podcasts/suscribe` |`{'url':<podcast url>}` |  `{'result': 'success'}`  if success|
| DELETE | `/podcasts/unsuscribe` | `{'url':<podcast url>}` | `{'result': 'success'}`  if success|