#!/usr/bin/env python3
from bs4 import BeautifulSoup
from bs4.element import CData
from pprint import pprint
import requests,json, os
import concurrent.futures


class PodcastController:
	def __init__(self):
		self.jsonPATH = "podcasts.json"
		self.urlPATH = "podcastURLs.json"
	
		if not os.path.isfile(self.jsonPATH):
			self.loadPodcasts()
		else:
			file = open(self.jsonPATH, "r")
			self.podcasts = json.loads(file.read())
			file.close()
		
	# Pre load some default podcasts
	def loadPodcasts(self):
		print("loading podcasts...")
		file = open(self.urlPATH, "r")
		urls = json.loads(file.read())
		
		podcasts = []
		
		for url in urls:
			podcasts.append(self.getPodcastInfo(url))
	
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
			return json.dumps({}) # Not an RSS Link
		
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
	
	def getEpisodes(self, url, num = -1):
		feed = requests.get(url)
		feed.raise_for_status()
		soup = BeautifulSoup(feed.text, 'html.parser')
		
		if soup.rss is None: 
			return json.dumps({}) # Not an RSS Link
		
		episodesXML = soup.rss.findAll("item")
			
		if num <= 0:
			num = len(episodesXML)
			
		episodes = []
			
		for episodeXML in episodesXML[:num]:
			epTitle = episodeXML.title.string	
			epURL = episodeXML.enclosure["url"]
			
			try:
				epDuration = episodeXML.enclosure["length"]
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

		
# feed = requests.get("https://daringfireball.net/thetalkshow/rss")
# soup = BeautifulSoup(feed.text, 'lxml')
# 
# episodes = soup.find_all("item")
# 
# titles = map(lambda x: x.title, episodes)
# 
# for title in titles:
# 	print(title.text)

if __name__ == "__main__":
	controller = PodcastController()
	
	print(controller.getAllPodcasts())
	#eps = controller.getEpisodes("https://rss.simplecast.com/podcasts/2389/rss")
	
	