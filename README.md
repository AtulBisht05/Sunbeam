# Sunbeam-Weather-App

It is an Angular-Electron App which give you information about Weather Forecast.

## Prerequisites
Be sure to have Node >= 8.0 and NPM >= 5 installed on your computer/server

You can download NodeJS by following this <https://nodejs.org/en/>, take the LTS version. The installer will install Node and Npm.

### check node version
node -v

### check npm version
npm -v

## Clone App

<https://github.com/AtulBisht/Sunbeam-Weather-App.git>

## Install dependencies with npm 

``npm install``

## To Run app in ELECTRON

``npm run electron``

## Easily test your app locally while developing

``ng serve``

## electron-builder to package and build distributable electron app

Link :- 
 <https://www.electron.build/>

A complete solution to package and build a ready for distribution Electron app for macOS, Windows and Linux with “auto update”

#### -> If you want to run electron-builder through npm, install the package locally:

``npm install --save-dev electron-builder``

#### -> Set productName, version, author, copyright, appID, Output folder, target, Icon in package.json
   {
     
  "name": "sunbeam_weather_app", 

  "description": "Weather app",

  "productName": "Sunbeam-Weather-App",

  "version": "0.0.0",

  "license": "MIT",

  "author": "Atul Bisht <atul.bisht@nerdapplabs.com>",

  "copyright": "© 2018, nerdAppLabs software solution",

  "main": "main.js",

  "build": {

    "appId": "com.nerdAppLabs.sunbeam-weather-app",
    "directories": {
      "output": "app"
    },
    "mac": {
      "category": "weather.app-category.weather",
      "target":"pkg", //target :- dmg (default), mas, zip, 7z, tar.xz, tar.lz 
      "icon": "build/SWA.icns"
    },
    "win": {
      "target":"zip", //target :- nsis (default), appx, 7z, tar.xz, tar.lz, tar.gz, tar.bz2
      "icon": "build/SWA.ico"
    },
    "linux":{
      "target":"snap", //target :- AppImage (default), 7z, zip, tar.xz, tar.lz, tar.gz, tar.bz2
      "icon":"build/SWA.png"
    },
  }

}

#### -> Edit the scripts section of your package.json:

"scripts": {

    "build-ml": "electron-builder -ml",
  
    "build-mac": "electron-builder  --mac",

    "build-linux": "electron-builder  --linux",

    "build-win": "electron-builder  --win",
   
  },
  "devDependencies": {
   
    "electron": "*",

    "electron-builder": "*"
  }

#### -> Run app in Electron
  ``npm run electron``

#### To package and build distributable electron app for macOS and Linux
``npm run build-ml``

#### -> To package and build distributable electron app for Windows 
``npm run build-win``

Note: If you are using macOS to create distributable file for windows install wine.

#### -> To package and build distributable electron app for MacOS 
``npm run build-mac``

#### -> To package and build distributable electron app for Linux 
``npm run build-linux``