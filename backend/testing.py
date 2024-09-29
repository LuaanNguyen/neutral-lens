from youtube_transcript_api import YouTubeTranscriptApi
from flask import Flask, jsonify
import spacy
import requests

yt_code = 'wiwPdsDeNck&ab_channel=BingeSociety'
yt_transcript = YouTubeTranscriptApi.get_transcript(yt_code)
text = ""
text_list = [] # json text format
start_duration_list = [] #
plain_text_list = []
response_list = []
# Iterate over each object in the JSON

for obj in yt_transcript:
    text_list.append({'text': obj['text']})  # Original format with dict
    plain_text_list.append(obj['text'])  # Plain text without dict format
    start_duration_list.append({
        'start': obj['start'],
        'duration': obj['duration']
    })

# Flask app
app = Flask(__name__)

# API URL (replace with your actual URL)
url = 'https://mo5fr3ll9qufbwuy.us-east-1.aws.endpoints.huggingface.cloud/'


# Function to send each chunk of text to the API
for i, text in enumerate(plain_text_list):
    myobj = {'inputs': text}
    response = requests.post(url, json=myobj)
    response_data = response.json()  # Parse JSON response
    response_data_with_meta = {
        'start': start_duration_list[i]['start'],
        'duration': start_duration_list[i]['duration'],
        'response': response_data
    }
    response_list.append(response_data_with_meta)

# # Printing all responses
# for response in response_list:
#     print(response)

# New GET endpoint to retrieve responses
@app.route("/get-transcript-responses", methods=["GET"])
def get_transcript_responses():
    return jsonify(response_list)  # Return the response list as JSON

""" TEST ROUTE """
@app.route("/health-check")
def hello_world():
    return "<p>Connected</p>"

