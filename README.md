# weather-app

A simple weather app built with React and Express. Fetches data from OpenWeatherMap 5-day forecast API (<https://openweathermap.org/forecast5>).

## Resources

- @erikflowers/weather-icons (<https://github.com/erikflowers/weather-icons>)
- @FortAwesome/react-fontawesome (<https://github.com/FortAwesome/react-fontawesome>)

## Local Development

This app contains two npm projects.

1. Node API Server (`./`)
2. React UI (`react-ui/`)

To start development, you need to supply your own API key from OpenWeatherMap (<https://openweathermap.org/>).

```
# Create config file
$ touch .env.development.local
```

`.env.development.local`:

```
API_KEY=
```

You also need to specify the port to run the API server on e.g. `3001`

`.env.development.local`:

```
PORT=
```

### Start the API server

```
# Initial setup
$ npm install

# Start server
$ npm start
```

### Start React development server

```
# Change directory
$ cd react-ui/

# Initial setup
$ npm install

# Start server
$ npm start
```

## Deploy to Heroku

```
$ git clone https://github.com/btrnaoa/weather-app.git
$ cd weather-app/
$ heroku create
$ heroku config:set API_KEY=
$ heroku config:set PORT=
$ git push heroku master
```
