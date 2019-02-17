from bs4 import BeautifulSoup
import requests
import re

def harvestURL(urlArr):
    for url in urlArr:
        extractSource(url)

def extractSource(URL):
    r = requests.get(URL)
    soup = BeautifulSoup(r.text, "html.parser")
    #print(soup.find(class_ = "entry-content").find_all("a"))
    mainText = soup.find(class_ = "entry clearfix").text
    #print(mainText)
    result = re.findall('Source:.*', mainText)
    length = 8
    if (len(result) == 0):
        print("Error pulling data from %s, please manually acquire" % URL)
    else:
        print(result[0][8:])
    #print(mainText)
    #result = re.findall('Source:.*', mainText)

r = requests.get("https://mediabiasfactcheck.com/left/")
soup = BeautifulSoup(r.text, "html.parser")
urlArray = soup.find(class_ = "entry clearfix").find(style = "text-align: center;").find_all("a")
input = []
for aChunk in urlArray:
    input.append(aChunk['href'])

harvestURL(input)
#extractSource("https://mediabiasfactcheck.com/alliance-for-justice-afj/")