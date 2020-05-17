# Scoreman
Stream overlay software for Super Smash Brothers for use with OBS/Xsplit and the respective BrowserSource plugins.

# Building

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

Now that we have all the dependencies, we need to build any necessary files (this also can take a bit):
```
yarn run build
```

Finally, we are good to go to launch the application!

# Running Scoreman
Scoreman is ready to use at

* Linux: `./packages/standalone/dist/Scoreman-{version}.AppImage`
* Windows 7/8/10: `./packages/standalone/dist/Scoreman-{version}.exe`
* OSX: *untested*

Now you can start setting scores!

# OBS configuration
To start using the overlay inside OBS, expand the **overlays** section,
and pick the overlay you want to use.

For now (we are in very, *very* early alpha) you can right click the desired overlay, and copy paste it into a Browser source on OBS.

Every time you change the scores (and don't forget to press the Update button!) they will show up on your OBS scene...!

You are all done!

