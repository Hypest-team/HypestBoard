![Node.js CI](https://github.com/N0NamedGuy/scoreman/workflows/Node.js%20CI/badge.svg?branch=master)

# Scoreman
Stream overlay software for Super Smash Brothers for use with OBS/Xsplit and the respective BrowserSource plugins.

# Using

## Standalone mode

### Downloading
Download the latest "stable" release [here](https://github.com/N0NamedGuy/scoreman/releases/latest). You can find older released versions on https://github.com/N0NamedGuy/scoreman/releases/.

### Running

To use, just launch the executable, and play around!

Now what is left to be done is to fill in the data.

## Server mode
If you have NodeJS and npm on your system, just run on command line

```
npx -p @scoreman/server scoreman-server
```

# OBS Setup

After opening the application:

* Navigate down to the **Overlays** section.
* Preview and choose your favourite overlay.
* Click the "Copy" button. This will put an the overlay's URL in your clipboard.
* On OBS create a Browser Source, and use that link you have copied to your clipboard.
  - Be sure to set the **width** and the **height** to the size of your OBS canvas (usually 1280x720 or 1920x1080)
  - Carefully adjust the FPS as well, as to save CPU. If the overlay you have chosen doesn't have the need for fluid/smooth animations setting FPS to 30 or below should suffice
* Add the remaining sources, like window or video captures.

Keep in mind that if you close the app, OBS won't be able to update the overlay.

> :warn: Whenever you set scores and other metadata on **scoreman**'s admin page, don't forget to press
> the **Update** button

# Documentation

For more information on how to develop and interface with **scoreman** check out the documentation:
* [Scoreman API](docs/api.md)
* [Overlay packs](docs/overlays.md)


# Building

First, make sure you have the latest version of NodeJs installed on your machine. You can get it here https://nodejs.org/en/download/ or install it on your system using a package manager of some kind.

After that you'll need to checkout this repository into your local machine. Use your favorite GUI git client or just do in a console or terminal:

```
git clone https://github.com/N0NamedGuy/scoreman/
cd scoreman
```

This is a monorepo, that is based on yarn workspaces. You will need to install and setup [yarn](https://yarnpkg.com) (this can take a bit):
```
npm install -g yarn # run as root if it doesn't work
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

## Running Scoreman

### Server mode

To launch **scoreman** just run
```
npx scoreman-server
```

### Standalone mode

**scoreman** is ready to use at

* Linux: `./packages/standalone/dist/Scoreman-{version}.AppImage`
* Windows 7/8/10: `./packages/standalone/dist/Scoreman-{version}.exe`
* OSX: *untested*

Now you can start setting scores!
