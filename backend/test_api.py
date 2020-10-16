#!/usr/bin/env python3
import unittest, requests, json
from bs4 import BeautifulSoup

serverRoot = "http://127.0.0.1:12345/"
testURL = "https://rss.simplecast.com/podcasts/2389/rss"
		
class TestPodcastController(unittest.TestCase):
	def testPodcastsAll(self):
		res = requests.get(serverRoot + "podcasts/all")
		self.assertEqual(res.status_code, 200)
		
		data = json.loads(res.text)
		self.assertTrue(isinstance(data, list))
		
		# Make sure all the podcasts are in a valid format
		urls = [pod.get("rssFeed", "messedUp") for pod in data]
		
		self.assertFalse("messedUp" in urls)
		self.assertTrue(testURL in urls)

	def testPodcasts(self):
		res = requests.post(serverRoot + "podcasts/", json={"url":testURL})
		self.assertEqual(res.status_code, 200)
		
		data = json.loads(res.text)
		self.assertTrue(data.get("error", "no error here"), "no error here")
		
		self.assertEqual(data["title"], "Do By Friday")
		self.assertEqual(data["rssFeed"], testURL)
		
	def testEpisodes(self):
		num = 6
		res = requests.post(serverRoot + "episodes/", json={"url":testURL})
		self.assertEqual(res.status_code, 200)
		data = json.loads(res.text)
		self.assertTrue(isinstance(data, list))
		
		res = requests.get(testURL)
		rss = BeautifulSoup(res.text, "html.parser")
		
		eps = rss.find_all("item")[:num]
		
		for i in range(num):
			self.assertEqual(data[i]["title"], eps[i].title.string)	
	
	def testPodcastsSubPOST(self):
		# Remove test podcast from db
		res = requests.delete(serverRoot + "podcasts/unsubscribe", json={"url":testURL})
		self.assertEqual(res.status_code, 200)
		data = json.loads(res.text)
		self.assertEqual(data.get("error", "no error here"), "no error here")
		
		# Make sure it's really unsubscribed
		res = requests.get(serverRoot + "podcasts/all")
		data = json.loads(res.text)
		urls = [pod["rssFeed"] for pod in data]
		self.assertFalse(testURL in urls)
		
		# test subscribe POST
		res = requests.post(serverRoot + "podcasts/subscribe", json={"url":testURL})
		self.assertEqual(res.status_code, 200)
		data = json.loads(res.text)
		self.assertEqual(data.get("error", "no error here"), "no error here")
	
	def testPodcastsSubPUT(self):
		# Remove test podcast from db
		res = requests.delete(serverRoot + "podcasts/unsubscribe", json={"url":testURL})
		self.assertEqual(res.status_code, 200)
		data = json.loads(res.text)
		self.assertEqual(data.get("error", "no error here"), "no error here")
		
		# Make sure it's really unsubscribed
		res = requests.get(serverRoot + "podcasts/all")
		data = json.loads(res.text)
		urls = [pod["rssFeed"] for pod in data]
		self.assertFalse(testURL in urls)
		
		# test subscribe PUT
		res = requests.put(serverRoot + "podcasts/subscribe", json={"url":testURL})
		self.assertEqual(res.status_code, 200)
		data = json.loads(res.text)
		self.assertEqual(data.get("error", "no error here"), "no error here")
	
	def testPodcastUnsub(self):
		# Remove test podcast from db
		res = requests.delete(serverRoot + "podcasts/unsubscribe", json={"url":testURL})
		self.assertEqual(res.status_code, 200)
		data = json.loads(res.text)
		self.assertEqual(data.get("error", "no error here"), "no error here")
		
		# Make sure it's really unsubscribed
		res = requests.get(serverRoot + "podcasts/all")
		data = json.loads(res.text)
		urls = [pod["rssFeed"] for pod in data]
		self.assertFalse(testURL in urls)
		
		# put it back
		res = requests.post(serverRoot + "podcasts/subscribe", json={"url":testURL})

if __name__ == "__main__":
	unittest.main()
