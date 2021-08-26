# Microblogging-website-spa-project

## Installing / Getting started

1. For angular you need to add node modules. Run this command in your terminal.

```
npm install --save-dev @angular-devkit/build-angular
```

2. For running the API, u have to add a user secret file or update ur appsettings.

- Adding user secret:

![](/gifs/user_secret_adding.gif)

- Or update ur appsettings:

```
{
  "ConnectionStrings": {
    "ConStr": "YOUR_CONNECTION_STRING"
  },
  "AppSettings": {
    "SecretKey": "YOUR_SECRET_KEY"
  },
  "CloudinarySettings": {
    "CloudName": "YOUR_CLOUDINARY_ACCOUNT_CLOUD_NAME",
    "ApiKey": "YOUR_CLOUDINARY_API_KEY",
    "ApiSecret": "YOUR_CLOUDINARY_API_SECRET_KEY"
  }
}
```

3. For Cloudinary you can create a free account to store your images. [To sign up for free](https://cloudinary.com/users/register/free).


4. Database creation:
    - Open package manager console in Visual Studio.
    - Select 'TwitterModel' as default project in package manager console.
    - And then run this code: ``` update-database ```