from youtube_transcript_api import YouTubeTranscriptApi
from flask import Flask, jsonify
import requests
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

yt_code = 'wiwPdsDeNck&ab_channel=BingeSociety'
yt_transcript = YouTubeTranscriptApi.get_transcript(yt_code)
plain_text_list = [obj['text'] for obj in yt_transcript]
start_duration_list = [{'start': obj['start'], 'duration': obj['duration']} for obj in yt_transcript]

# API URL (replace with your actual URL)
url = os.environ.get("ESR_API_KEY")


@app.route("/get-transcript-responses", methods=["GET"])
def get_transcript_responses():
    response_list = []
    for i, text in enumerate(plain_text_list):
        try:
            myobj = {'inputs': text}
            response = requests.post(url, json=myobj)
            response.raise_for_status()
            response_data = response.json()
            response_data_with_meta = {
                'start': start_duration_list[i]['start'],
                'duration': start_duration_list[i]['duration'],
                'response': response_data
            }
            response_list.append(response_data_with_meta)
        except requests.RequestException as e:
            print(f"Error making API request: {e}")
    return jsonify(response_list)
\
@app.route("/health-check")
def hello_world():
    return "<p>Connected</p>"

if __name__ == "__main__":       
    app.run(debug=True)