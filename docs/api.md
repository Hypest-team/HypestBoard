# Scoreman API

When running scoreman (either in "server" or "standalone" mode), it will, by default, run a web server on port 3000 of your ```localhost```.

Simply, everything will available on ```http://localhost:3000/```.

These are the ReST endpoints that are available for overlays
and any other applications tha want to interface with **scoreman**.

## Considerations when running on reverse proxy

Before requesting any kind of API request to **scoreman**, the overlay __should__
do the following from anywhere, whithin its subpath:

```
GET !serverconfig
```

This will return an answer like this:
```json
{
  "baseUrl": "/scoreman",
  "homepage": "//urano:8080/scoreman",
  "hostname": "urano",
  "port": 8080
}
```

If scoreman happens to be installed on a sub-path like `/scoreman`,
whose domain is `example.com` (making the base path `http(s)://example.com/scoreman`)
behind a **nginx** reverse proxy, the `GET !serverconfig` call would yield something like:
```json
{
  "baseUrl": "/scoreman",
  "homepage": "//example.com:80/scoreman",
  "hostname": "urano",
  "port": 80
}
```

> :warn: Overlays that are served directly by **scoreman** should keep this is mind, if they
wish to work in most scenarios!

## Calling the API from an overlay

It is recommended that when an overlay makes an API call to **scoreman**'s server,
they do so by requesting from a root, acquired as documented on step above.

From **scoreman** 0.1.x and newer, root requests are discouraged, because doing so
causes issues when running behing a reverse proxy.

Each available overlay pack will be served under ```<scoreman-subpath>/overlays/<overlay-pack-name>/```
with every file inside being served.

See /docs/overlays.md for more information.

## Overlay API

These calls should be used within the context of an overlay pack so it can set itself up

### `GET ./!serverconfig`

Returns the current server configuration.

**Sample response**
```json
{
  "baseUrl": "/scoreman",
  "homepage": "//example.com:80/scoreman",
  "hostname": "urano",
  "port": 80
}
```


## Scoreboard API

>All the responses and requests bodies have to follow the json schema specified in
```/packages/server/data/schema/scoreboard.json```

### `GET /api/scoreboard`

Returns all the stored scoreboard information that keeps players, scores, and other
interesting metadata to be used by overlays.

**Sample response**
```json
{
  "entrants": [{
    "name": "",
    "score": 2,
    "players": [{
      "name": "Armada",
      "character": {
        "name": "Peach",
        "id": "peach",
        "color": {
          "id": "default",
          "name": "Pink (default)",
          "hex": "#fff"
        }
      },
      "country": {
        "name": "Sweden",
        "code": "se"
      },
      "sponsor": "A"
    }]
  }, {
    "name": "",
    "score": 0,
    "players": [{
      "name": "Mang0",
      "character": {
        "name": "Fox",
        "id": "fox",
        "color": {
          "id": "red",
          "name": "Red",
          "hex": "#fe6565"
        }
      },
      "country": {
        "name": "United States",
        "code": "us"
      },
      "sponsor": "C9"
    }]
  }],
  "commentators": [{
    "name": "Scar",
    "handle": "@bobbyscar"
  }, {
    "name": "Toph",
    "handle": "@toph_bbq"
  }],
  "round": "Grand Finals",
  "tournamentName": "Genesis 4",
  "caster": "",
  "streamer": "VGBootCamp",
  "game": {
    "id": "melee",
    "name": "Super Smash Bros Melee"
  }
}
```

### `POST /api/scoreboard`

Sets all the stored scoreboard information that keeps players, scores, and other
interesting metadata to be used by overlays.

**Sample body**

```json
{
  "entrants": [{
    "name": "",
    "score": 2,
    "players": [{
      "name": "Armada",
      "character": {
        "name": "Peach",
        "id": "peach",
        "color": {
          "id": "default",
          "name": "Pink (default)",
          "hex": "#fff"
        }
      },
      "country": {
        "name": "Sweden",
        "code": "se"
      },
      "sponsor": "A"
    }]
  }, {
    "name": "",
    "score": 0,
    "players": [{
      "name": "Mang0",
      "character": {
        "name": "Fox",
        "id": "fox",
        "color": {
          "id": "red",
          "name": "Red",
          "hex": "#fe6565"
        }
      },
      "country": {
        "name": "United States",
        "code": "us"
      },
      "sponsor": "C9"
    }]
  }],
  "commentators": [{
    "name": "Scar",
    "handle": "@bobbyscar"
  }, {
    "name": "Toph",
    "handle": "@toph_bbq"
  }],
  "round": "Grand Finals",
  "tournamentName": "Genesis 4",
  "caster": "",
  "streamer": "VGBootCamp",
  "game": {
    "id": "melee",
    "name": "Super Smash Bros Melee"
  }
}
```

## `GET /api/config/flags.json`

Returns a country code indexed list of countries.

**Sample response:**

```json
{
    "BE": "Belgium",
    "PT": "Portugal"
}
```

## `GET /api/config/games.json`

Returns a list of every game configuration available.

**Sample response:**

```json
[{
    "id": "Melee",
    "name": "Super Smash Bros Melee"
}]
```

## `GET /api/characters/:gameId.json`

Returns the list of all available characters for a given game.

```GET /api/characters/melee.json```
```json
[
  {
    "name": "Peach",
    "id": "peach",
    "colors": [{
        "id": "default",
        "name": "Pink (default)",
        "hex": "#fff"
    }, {
        "id": "yellow",
        "name": "Yellow (Daisy)",
        "hex": "#feb04c"
    }, {
        "id": "white",
        "name": "White",
        "hex": "#989898"
    }, {
        "id": "blue",
        "name": "Blue",
        "hex": "#6564b0"
    }, {
        "id": "green",
        "name": "Green",
        "hex": "#32b165"
    }]
  },
  {
    "name": "Fox",
    "id": "fox",
    "colors": [{
        "id": "default",
        "name": "White (default)",
        "hex": "#fff"
    }, {
        "id": "red",
        "name": "Red",
        "hex": "#fe6565"
    }, {
        "id": "blue",
        "name": "Blue",
        "hex": "#7f7fe4"
    }, {
        "id": "green",
        "name": "Green",
        "hex": "#32b165"
    }]
  },
]
```
> :warning: **The following APIs are unstable** and prone to change!
> They might even not work... Proceed with caution

## Smash.gg API

These calls serve as proxy to get tournament data from [smash.gg](https://smash.gg)
that can be displayed on an overlay
or managed by an alternate administrative UI.

Read https://help.smash.gg/en/articles/1465676-rest-api-access-legacy-old to know more
about smashgg's API responses.

### `GET /api/smashgg/tournament/:tournamentslug`

Returns all the relevant metadata from a tournament.

**Params:**

```tournamentslug```: the slug that identifies the tournament name. This slug can be obtained
from the smashgg's tournament URL: ```https://smash.gg/tournament/<tournamentslug>```

### `GET /api/smashgg/station_queue/:tournamentslug`

Returns an enhanced verison of smashgg's station queue API call, with the builting entrant/player
information, instead of having to do multiple REST calls.

**Params:**

```tournamentslug```: the slug that identifies the tournament. This slug can be obtained
from the smashgg's tournament URL: ```https://smash.gg/tournament/<tournamentslug>```

## Challonge API

These calls serve as proxy to get tournament data from [Challonge](https://challonge.gg)
that can be displayed on an overlay or managed by an alternate administrative UI.

Read https://api.challonge.com/v1 to know more about Challonge's API responses.

### `GET /api/challonge/tournaments/:tournamentId?apikey=:apikey`

Returns all the relevant metadata from a tournament.

**Params:**

```apikey```: your own API key that can be obtained in https://challonge.com/settings/developer
```tournamentId```: the id that identifies the tournament. This id can be obtained
from the challonge's tournament URL: ```https://smash.gg/<tournamentId>```

### GET `/api/challonge/matches/:tournamentId?apikey=:apikey`

Returns all the matches from a given tournament.

**Params:**

```apikey```: your own API key that can be obtained in https://challonge.com/settings/developer
```tournamentId```: the id that identifies the tournament. This id can be obtained
from the challonge's tournament URL: ```https://smash.gg/<tournamentId>```