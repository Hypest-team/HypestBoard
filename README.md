# HypestBoard
Stream overlay software for Super Smash Brothers for use with OBS/Xsplit and the respective BrowserSource plugins.

# Setting up

## The manual way

First, make sure you have the latest version of NodeJs installed on your machine. You can get it here https://nodejs.org/en/download/ or install it on your system using a package manager of some kind.

After that you'll need to checkout this repository into your local machine. Use your favorite GUI git client or just do:

```
git checkout https://github.com/Hypest-team/HypestBoard/
```

This is a monorepo, that is based on lerna. So you need to install and setup [lerna](https://github.com/lerna/lerna) (this can take a bit):
```
npm install -g lerna  # if this does not work, run it as root or admin
lerna bootstrap
```

Now that we have all the dependencies, we need to build the Frontend for the Admin UI (this also can take a bit):
```
npm --prefix="packages/client" run build
```

Finally, we are good to go to launch the server
```
npm --prefix="packages/server" start
```

Now, the server should be running. It runs on port 3000, so access http://localhost:3000/ and you can start setting scores.

## The docker way

You may have noticed that this project comes with a Dockerfile. If you have docker installed, good. If you want to install it, and have fun with it check https://docs.docker.com/install/.

Assuming you have docker installed and configured on your system, you just need to run these commands:

```
git checkout https://github.com/Hypest-team/HypestBoard/
docker build . -t hypestteam/hypestscore
docker run -p 3000:3000 -d hypestteam/hypestscore
```

After running these commands, you should have a docker container running HypestScore. Just nagivate to http://localhost:3000/ and have fun.
