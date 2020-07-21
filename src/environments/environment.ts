// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  apiUrl: 'http://localhost:4000',
  api: 'http://localhost:8080/api',
  loginUrl: 'http://localhost:8080/api/auth/signin',
  signupUrl: 'http://localhost:8080/api/auth/signup',
  roletypes: 'http://localhost:8080/api/protected/roletypes',
  updateProfile: 'http://localhost:8080/api/protected/updateprofile',
  getAllRequests: 'http://localhost:8080/api/protected/requests',
  approveRequest: 'http://localhost:8080/api/public/roleconfirmation?token=',
  rejectRequest: 'http://localhost:8080/api/public/rolerejection?token=',

  uploadFileUrl: 'http://localhost:8080/api/storage/upload',
  getFilesUrl: 'http://localhost:8080/api/storage/files',
  getFileUrl: 'http://localhost:8080/api/storage/file',
  uploadFolderUrl: 'http://localhost:8080/api/storage/uploadfolder',
  production: false
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
