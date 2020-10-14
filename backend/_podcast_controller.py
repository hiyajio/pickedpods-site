#!/usr/bin/env python3
from bs4 import BeautifulSoup
import requests


feed = requests.get("https://daringfireball.net/thetalkshow/rss")
soup = BeautifulSoup(feed.text, 'lxml')

episodes = soup.find_all("item")

titles = map(lambda x: x.title, episodes)

for title in titles:
	print(title.text)
