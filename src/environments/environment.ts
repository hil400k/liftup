// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyCLuc25Jw0v41HL8U-r9-UCMOFZFyTHv10',
    authDomain: 'liftup-e0a03.firebaseapp.com',
    databaseURL: 'https://liftup-e0a03.firebaseio.com',
    projectId: 'liftup-e0a03',
    storageBucket: 'liftup-e0a03.appspot.com',
    messagingSenderId: '822529297896'
  },
  apiUrl: 'http://localhost:1337'
};

/*
 * In development mode, for easier debugging, you can ignore zone related error
 * stack frames such as `zone.run`/`zoneDelegate.invokeTask` by importing the
 * below file. Don't forget to comment it out in production mode
 * because it will have a performance impact when errors are thrown
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
