#!/usr/bin/env python3
from bs4 import BeautifulSoup
import requests


feed = requests.get("https://daringfireball.net/thetalkshow/rss")
soup = BeautifulSoup(feed.text, 'html.parser')

print(soup.title)