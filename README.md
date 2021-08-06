# reactNative-NewsApp

React native project for start2impact

![AppScreen1](https://user-images.githubusercontent.com/80625942/128499461-72566643-cad2-489d-8884-0a91a7673adb.png)
![Appscreen2](https://user-images.githubusercontent.com/80625942/128499455-6d11f22a-7973-437a-994d-d43e60248732.png)
![AppScreen3](https://user-images.githubusercontent.com/80625942/128499445-b0a0fdda-271e-4585-87a6-dce957b99a7c.png)

Go to https://newsapi.org/ and get an **Api Key**

open **src/config/news.js** and replace "YourApiKey" with the Api Key from https://newsapi.org/ 

```
const _api_key='yourApiKey'

```



Use the package manager [npm](https://www.npmjs.com/) to install dependencies: 
open terminal on the root folder of the project and run this command

```bash
npm install
```

and for ios

```bash
cd ios && pod install && cd ..
```

## Usage

install on ios simulator

```
npx react-native run-ios
```
