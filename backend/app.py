#!/usr/bin/env python3

from flask import Flask, request
from _podcast_controller import PodcastController
import json

app = Flask(__name__)
controller = PodcastController()

@app.route('/podcasts/all', methods=["GET"])
def getAll():
    return json.dumps(controller.getAllPodcasts())
    
@app.route('/podcasts/', methods=["POST"])
def getPod():
	try:
		url = json.loads(request.data)["url"]
		return json.dumps(controller.getPodcastInfo(url))
	except:
		return json.dumps({"error":"POST body is not valid"})
		
	return ""
	
@app.route('/podcasts/subscribe', methods=["POST", "PUT"])
def subPod():
	pass

	
@app.route('/podcasts/unsubscribe', methods=["DELETE"])
def unsubPod():
	pass
	
@app.route('/episodes/', methods=["POST"])
def getEps():
	try:
		data = json.loads(request.data)
		url = data["url"]
		count = data.get("count", -1)
		return json.dumps(controller.getEpisodes(url,count=count))
	except:
		return json.dumps({"error":"POST body is not valid"})
		
	return ""

if __name__ == "__main__":
	app.run(port=12345)