#!/usr/bin/env python3
import unittest, requests
from bs4 import BeautifulSoup
from _podcast_controller import PodcastController

controller = PodcastController()
testURL = "https://rss.simplecast.com/podcasts/2389/rss"
		
class TestPodcastController(unittest.TestCase):
	def testGetAll(self):
		podcasts = controller.getAllPodcasts()
		testPodcast = controller.getPodcastInfo(testURL)
		
		self.assertTrue(testPodcast in podcasts)
	
	def testGetEpisodes(self):
		num = 6
	
		episodes = controller.getEpisodes(testURL, num)
		
		res = requests.get(testURL)
		rss = BeautifulSoup(res.text, "html.parser")
		
		eps = rss.find_all("item")[:num]
		
		for i in range(num):
			self.assertEqual(episodes[i]["title"], eps[i].title.string)	
		
	def testGetPodcast(self):
		podcast = controller.getPodcastInfo(testURL)
		
		res = requests.get(testURL)
		rss = BeautifulSoup(res.text, "html.parser")
		
		self.assertEqual(podcast["title"], rss.title.string)
		self.assertEqual(podcast["description"], rss.description.string)
		self.assertEqual(podcast["showArt"], rss.find("itunes:image")["href"])
		
	def testUnsubscribe(self):
		res = controller.unsubscribe(testURL)
		
		self.assertEqual(res.get("error", "no error here"), "no error here")
		
		podcasts = controller.getAllPodcasts()
		urls = [pod["rssFeed"] for pod in podcasts]
		
		self.assertFalse(testURL in urls)
		
		controller.subscribe(testURL)
		
	
	def testSubscribe(self):
		res = controller.unsubscribe(testURL)
		
		self.assertEqual(res.get("error", "no error here"), "no error here")
		
		podcasts = controller.getAllPodcasts()
		urls = [pod["rssFeed"] for pod in podcasts]
		
		self.assertFalse(testURL in urls)
		
		controller.subscribe(testURL)
		
		podcasts = controller.getAllPodcasts()
		urls = [pod["rssFeed"] for pod in podcasts]
		self.assertTrue(testURL in urls)

if __name__ == "__main__":
	unittest.main()
