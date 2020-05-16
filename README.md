# Scoreman
Stream overlay software for Super Smash Brothers for use with OBS/Xsplit and the respective BrowserSource plugins.

# Setting up

## The manual way

First, make sure you have the latest version of NodeJs installed on your machine. You can get it here https://nodejs.org/en/download/ or install it on your system using a package manager of some kind.

After that you'll need to checkout this repository into your local machine. Use your favorite GUI git client or just do in a console or terminal:

```
git clone https://github.com/N0NamedGuy/scoreman/
cd scoreman
```

This is a monorepo, that is based on yarn workspaces. You will need to install and setup [yarn](https://yarnpkg.com) (this can take a bit):
```
npm install -g yarn
```

After having yarn set up, you can install all the dependencies:
```
yarn install
```

Now that we have all the dependencies, we need to build the Frontend for the Admin UI (this also can take a bit):
```
yarn workspace @scoreman/client run build
```

Finally, we are good to go to launch the server
```
yarn workspace @scoreman/server run start
```

Now, the server should be running. It runs on port 3000, so access http://localhost:3000/ and you can start setting scores.