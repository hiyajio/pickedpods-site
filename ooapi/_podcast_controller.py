#!/usr/bin/env python3
from bs4 import BeautifulSoup
from bs4.element import CData
from pprint import pprint
import requests,json, os
import concurrent.futures
from pathlib import Path


class PodcastController:
	def __init__(self):
		self.jsonPATH = Path(__file__).parent / "podcasts.json"
		self.urlPATH = Path(__file__).parent / "podcastURLs.json"
	
		if not os.path.isfile(self.jsonPATH):
			self.loadPodcasts()
		else:
			try:
				file = open(self.jsonPATH, "r")
				self.podcasts = json.loads(file.read())
				file.close()
			except:
				self.loadPodcasts()
		
	# Pre load some default podcasts
	def loadPodcasts(self):
		print("loading podcasts...")
		file = open(self.urlPATH, "r")
		urls = json.loads(file.read())
		
		podcasts = []
		
		for url in urls:
			newPod = self.getPodcastInfo(url)
			
			if newPod is not None:
				podcasts.append(newPod)
	
		file = open(self.jsonPATH, "w")
		file.write(json.dumps(podcasts))
		
		print(f"podcasts loaded to {self.jsonPATH}!")
		
	def getAllPodcasts(self):
		return self.podcasts
		
	def getPodcastInfo(self, url):
		feed = requests.get(url)
		feed.raise_for_status()
		soup = BeautifulSoup(feed.text, 'lxml')
		
		if soup.rss is None: 
			return None # Not an RSS Link
		
		rss = soup.rss
		
		podTitle = rss.title.string
		podAuthor = rss.find("itunes:author").string
		podDescription = rss.find("description").string
		podShowArt = rss.find("itunes:image")["href"]
		
		representation = {
			"title":podTitle,
			"rssFeed":url,
			"description":podDescription,
			"author":podAuthor,
			"showArt":podShowArt
		}
		
		return representation
	
	def getEpisodes(self, url, count = -1):
		feed = requests.get(url)
		feed.raise_for_status()
		soup = BeautifulSoup(feed.text, 'html.parser')
		
		if soup.rss is None: 
			return None # Not an RSS Link
		
		episodesXML = soup.rss.findAll("item")
			
		if count <= 0:
			count = len(episodesXML)
			
		episodes = []
			
		for episodeXML in episodesXML[:count]:
			epTitle = episodeXML.title.string	
			epURL = episodeXML.enclosure["url"]
			
			try:
				epDuration = int(episodeXML.enclosure["length"])
			except:
				epDuration = -1
				
			content = episodeXML.find("content:encoded")
			
			if content is None:
				content = episodeXML.find("content")
				
			if content is None:
				epDesc = ""
			else:
				epDesc = ""
				for tag in content.contents:
					epDesc += str(tag)
					
			
			representation = {
				"title":epTitle,
				"audioURL":epURL,
				"description":epDesc,
				"duration":epDuration
			}
			
			episodes.append(representation)

		return episodes
		
	def subscribe(self, url):
		urls = [pod["rssFeed"] for pod in self.podcasts]
		
		if url in urls:
			return {"error":"podcast already subscribed to"}
	
	
		newPod = self.getPodcastInfo(url)
		
		if newPod is None:
			return {"error":"URL is invalid"}
			
		self.podcasts.append(newPod)
		
		file = open(self.jsonPATH, "w")
		file.write(json.dumps(self.podcasts))
		file.close()
			
		return {"success":"successfully subscribed to podcast"}
	
	def unsubscribe(self, url):
		urls = [pod["rssFeed"] for pod in self.podcasts]
		
		if url not in urls:
			return {"error":"podcast is not subscribed to"}
	
	
		self.podcasts = list(filter(lambda pod: pod["rssFeed"] != url, self.podcasts))
		
		file = open(self.jsonPATH, "w")
		file.write(json.dumps(self.podcasts))
		file.close()
			
		return {"success":"successfully unsubscribed to podcast"}


if __name__ == "__main__":
	controller = PodcastController()
	controller.loadPodcasts()
	
	