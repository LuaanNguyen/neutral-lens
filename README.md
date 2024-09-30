# Neutral Lens - See Beyond the Bias: Empower Your YouTube Experience 📹

"Neutral-lens" is a browser extension that aims to reduce political bias in Youtube videos, particularly during election seasons and political debates. This tool analyzes news content, identifying biased language. By doing so, it helps viewers gain a more balanced perspective on political issues, encouraging critical thinking and allowing users to form their own opinions based on less skewed information. The extension's goal is to promote a more objective consumption of news media, especially crucial during times of heightened political discourse and electoral campaigns.


![Image](/extension/public/Neutral_Lens.png)

## How we build it 👷

<!-- ![Archtecture](architecture.png) -->

### Tech Stacks 💻

- `ReactJS` for SEO optimization and server-side rendering
- `TypeScript` for safer deployment
- `Lucide` for modern icons
- `Flask` for handling HTTP requests and API development
- `GUS-Net NER model ` API intergration for advanced NLP
- `Youtube Transcript API` for automatic generated subtitles and subtitle translations/transcriptions

### How It Works 🧑‍🍳

- The extension activates when you're watching a YouTube video.
- It analyzes the video transcript using our Ethical Spectacle Reseach's AI model.
- Content is classified into the three categories mentioned above.
- Results are displayed in a graph overlay on the video page.

### Usage 🍳

- Navigate to any YouTube video.
- Click the Neutral Lens icon in your toolbar and press `detect bias` to analyze.
- Watch as the graph populates with bias detection results in real-time.

## How to run the program 💻

### Client

```shell
> cd client
> npm i #install all dependencies if this is the first time you are doing this
> npm ci (optional)
> npm run build (for production-ready)
> npm run dev
```

### Server - `Running on http://127.0.0.1:5000`

```shell
> cd server
> python3 -m venv venv
> source venv/bin/activate
> pip install  -r requirements.txt
> python3 testing.py
```

### Envrionments variables 🤐

Create a .env files in `server`

- `ESR_API_KEY=YOUR_KEY`

### License 🪪

`Neutral Lense` is licensed under MIT License. All development is currently maintain by [Luan Nguyen](https://github.com/LuaanNguyen).
