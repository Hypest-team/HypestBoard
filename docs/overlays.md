# Overlays packs

This document describes how to deal with overlay pack mangament, and how **scoreman** makes use of them.

## What is an overlay pack

An overlay (in the context of **scoreman**) is nothing more than a simple web application, with the intent of displaying scores and other interesting metadata, on stream.

Each overlay pack contains a set of overlays (duh...), which should be used in different situations.

## Finding overlays

When choosing a name for an overlay pack, its name should start with ```scoreman-overlay-```.

Because of this convention, you might find overlays in [GitHub](https://github.com/search?q=scoreman-overlay-) or [npm](https://www.npmjs.com/search?q=scoreman-overlay-).

Download the package, and follow along!

## Installing overlay

These are the two possible methods to install overlays for **scoreman**.

### Using the overlays folder

If you are using the Windows version of **scoreman**, you can simply create an ```overlays``` folder on the same folder that your executable is (if the folder didn't come included with your installation of **scoreman**).

Then, you can simply extract the contents of your overlay pack into that folder.

Inside the ```overlays``` folder there should be multiple folders, each with a different overlay pack.

### Using npm

If you found an overlay pack on npm, it is simply a matter of installing that package. You can simply run:

```bash
npm i -g scoreman-overlay-<overlayname>
```

This works on any operating system, as long as you have NodeJS and npm installed.

Your new overlay pack will be ready to use!

## Technical details for overlays

Overlay packs, as mentioned, are web applications, or sets of web applications.

Each overlay pack will have its own name, usually derived from their manifest.json.

Overlay packs will be served under ``/overlays/<overlay-pack-name>``. 
Everything inside this path is browsable on a browser, and served a static files.

The ```overlay-pack-name``` is assigned following these rules:

* if the pack has a package.json (for npm downloaded overlays packs), the package
* name will be its npm package name
* if not, it will be named ```ext-<overlay-pack-folder>``


## Creating overlays

To create a overlay, you will need to create a folder that will host your webapp.
You can choose any toolkit or framework you wish. Let's assume, as an example, that your
overlay pack will be called **scoreman-overlay-hello-world**.

Let's also assume that this overlay pack contains the following overlays:
* An **ingame** overlay, which will be the "main" overlay displayed to the views
* A **commentary** overlay, for when the commentators are focus on stream
* A **waiting** overlay, for when the streamer is AFK

### Step 1 - creating a **manifest.json**

This file will describe what overlays you pack will contain. The ```manifest.json``` tells **scoreman** what are the available overlays, and lists them on its administration UI.

Start by creating a folder called ```scoreman-overlay-hello-world```.
Inside that directory, create a new file called ```manifest.json```.

It should follow this structure:
```json
{
    "name": "Hello world!", // This is a "human-friendly" name, that will be displayed on the Admin UI
    "baseUrl": "/build", // Optional. If you want the base url to be different, use this
    "notFoundUrl": "404.html", // Optional. Sets the URL to the page, in case there is a 404.
                            // very useful for single page application styles
    "appType": "", // Optional (and advanced!). Sets the application type your overlay webapp is.
                    // Applies some nice tricks and hacks specific to a certain framework
                    // The only supported value is "react". More can come
    "overlays": [{
        "name": "In-game", // Same criteria as the overlay pack name
        "url": "ingame/index.html" // The path name is relative to the root of your overlay pack
    }, {
        "name": "Commentary overlay",
        "url": "commentary/index.html"
    }, {
        "name": "Waiting",
        "url": "waiting/index.html"
    }]
}
```

Save your changes, and now you have a manifest!

### Step 2 - creating the overlays

Each overlay is basically a web page that will display scores. Create a web app, however you wish. You can use vanilla javascript, React, Vue, Angular, jQuery, or whatever is cool nowadays in the frontend world.

But for the sake of simplicity, lets just assume these web apps will be "magically" done.

Create the following folders inside your overlay root:
* ```ingame```
* ```commentary```
* ```waiting```

And inside each folder, place an ```index.html``` file that will display the appropriate overlay.

*Voilà*, you have yourself your own overlay ready to go.

Have a look on the api.md document to know more about how each overlay is hosted, and what is the available API.