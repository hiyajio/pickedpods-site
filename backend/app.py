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
	output = {}

	try:
		url = json.loads(request.data)["url"]
		
		podInfo = controller.getPodcastInfo(url)
		
		if podInfo is None:
			output["error"] = "URL is not a valid podcast url"
		else:
			output = podInfo
			
			
	except:
		output["error"] = "POST body is not valid"
		
	return json.dumps(output)
	
@app.route('/podcasts/subscribe', methods=["POST", "PUT"])
def subPod():
	output = {}

	try:
		url = json.loads(request.data)["url"]
		output = controller.subscribe(url)
			
	except:
		output["error"] = "POST body is not valid"
		
	return json.dumps(output)

	
@app.route('/podcasts/unsubscribe', methods=["DELETE"])
def unsubPod():
	output = {}

	try:
		url = json.loads(request.data)["url"]
		output = controller.unsubscribe(url)
			
	except:
		output["error"] = "POST body is not valid"
		
	return json.dumps(output)
	
@app.route('/episodes/', methods=["POST"])
def getEps():
	output = {}

	try:
		data = json.loads(request.data)
		url = data["url"]
		count = data.get("count", -1)
		
		eps = controller.getEpisodes(url,count=count)
		
		if eps is None:
			output["error"] = "URL is not a valid podcast url"
			
		output = eps
	except:
		output["error"] = "POST body is not valid"
		
	return json.dumps(output)

if __name__ == "__main__":
	app.run(port=12345)