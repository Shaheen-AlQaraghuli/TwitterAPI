# TwitterAPI

###### What can I do?

- Get recent tweets (up to 200 most recent).
- Filter tweets from a specified user that may be related to cryptocurrency.
- Return a graph figure in the base64 format for the disturbution of the most 200 recent tweets over the months for a specified user. 

## Getting Started

Clone the repository to your machine and install the required packages

### Packages

Inside the express directory, run:
```
npm i 
```
Inside the fastapi directory, run: 
```
pip install -r requirements.txt
```


### Configuration

Navigate to the .env file inside the express directory and replace the placeholders with your Twitter Developer account's API Key, API Secret Key, and Bearer Token.
The server will run on port 3000 by default. To run the server on a different port, change the value of `PORT` to the port desired.



### Running The Services

To run the express server, inside the express directory run:
```
node app.js
```

To run the fastapi server, inside the fastapi directory run:
```
hypercorn main:app
```


## Usage

### Get Tweets

Using Postman, initiate a POST request to URL:
```
http://localhost:3000/tweets/
```

Body: 
- name: string (required)
- count: number (optional, 10 by default)

name is the username for the twitter account, from which the tweets will be retrieved. Count is the number of the most recent tweets to return. Count is set to 10 by default and maximum allowed is 200.

Request example:
```
{
  "name": "john_doe",
  "count": 2
}
```

Response example:
```
[
  {
    "id": "124214233412",
    "tweet": "@john_doe2 Hi, I have just joined Twitter!"
  },
  {
    "id": "124214233413",
    "tweet": "@john_doe2 how is it going?"
  }
]
```

### Get Tweets Related to Crypto

Using Postman, initiate a POST request to URL:
```
http://localhost:3000/tweets/crypto
```

Body: 
- name: string (required)

name here refers to the username of the twitter account, from which the tweets will be retrieved. Using a dictionary with common words related to cryptocurrencies. The code will filter the most recent 200 tweets and return the ones that contain at least one word from the dictionary.

Request example:
```
{
  "name": "VitalikButerin"
}
```

Response example:
```
{
  "count": 51,
  "tweetsThatContainCrypto": [
    {
      "id": 1400560669351727000,
      "date": "Thu Jun 03 21:10:59 +0000 2021",
      "tweet": "RT @lexfridman: Here's my conversation with @VitalikButerin, his second time on the podcast. We talk about @Ethereum, @Bitcoin, @Dogecoin,…"
    },
    {
      "id": 1397298390468219000,
      "date": "Tue May 25 21:07:51 +0000 2021",
      "tweet": "Blockchain voting is overrated among uninformed people but underrated among informed people:\n\nhttps://t.co/hLFJuwlT73"
    },
    .
    .
    .
```


### Get Tweets Frequency Over The Monhts

Using Postman, initiate a POST request to URL:
```
http://localhost:3000/tweets/frequency
```

Body: 
- name: string (required)

name is the username for the twitter account, from which the tweets will be retrieved.. The response is an image for the graph figure in base64 format. 
Request example:
```
{
  "name": "john_doe"
}
```

Response example:
```
{
   "img": "iVBORw0KGgoAAAANSUhEUgAAAoAAAAHgCAYAAAA10dzkAAAAOXRFWHRTb2Z0d2FyZQBNYXRwbG90bGliIHZlc..."
} 
```

Using an online base64 to image converter:
![graph image](https://user-images.githubusercontent.com/36564017/120932351-70bb8200-c706-11eb-85ab-7ae2dca71444.jpeg)
