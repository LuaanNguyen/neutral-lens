from youtube_transcript_api import YouTubeTranscriptApi
import spacy
import requests
haha = YouTubeTranscriptApi.get_transcript('yjPxL5w3OOU&t=4973s&ab_channel=FRONTLINEPBS%7COfficial')
text = ""
nlp = spacy.load("en_core_web_sm")

for object in haha:
    for value in object:
        text += value + " "

# Optionally, strip the trailing space at the end
result = text.strip()

print(result)

url = 'https://mo5fr3ll9qufbwuy.us-east-1.aws.endpoints.huggingface.cloud/'

myobj = {'inputs': result}

x = requests.post(url, json = myobj)
print(x.text)