# @scoreman/server

This is the server side for the Scoreman project.

It is a simple Express based NodeJS app, that keeps its score, name, character, etc metadata in memory, ready to be served on an API call.

## Running

To start the server, run
```
yarn start
```

The server will be available on port 3000 (http://localhost:3000).

Because this depends on @scoreman/client, you already have a GUI ready to go.
And because of @scoreman/overlays, you already have access to the overlays

## API calls

### GET /api/scoreboard
Gets the current stored scoreboard data

### POST /api/scoreboard
Sets the current stored scoreboard data

### GET /api/config/flags
Gets a list of all available flag names, indexed by country code

### GET /api/config/games
Gets a list of all available game configurations that can be used. This is useful for @scoreman/client, so it can change layouts depending on the chosenconfig.

### GET /overlays/manifest.json
Lists all the overlays available on @scoreboard/overlays

