<div align="center">
<h1>Twitter Clone Project</h1>
    <svg viewBox="0 0 24 24" style="width: 80px;">
            <g>
              <path
                d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49
                2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572
                0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63
                1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257
                1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593
                1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062
                1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z">
              </path>
            </g>
          </svg>
</div>

## About The Project 
<p>It is an ASP .NET Core & Angular project made to reinforce the .NET Core Developer training that I received. Here, the data is transferred to the UI layer by establishing a database communication with the WEB API in the ASP .NET Core framework. UI layer was created with the Angular framework. EF Core - Code First approach and JWT token authentication were used in the project. Currently, there are mechanisms for user registration, user profiles, tweeting, deleting tweets, like, comment, follow. The project is under development.
</p>
</br>

### Built with

- Front-End:
  - [Angular](https://angular.io/) / [Visual Studio Code](https://code.visualstudio.com/)
  - [Typescript](https://www.typescriptlang.org/)
  - [Bootstrap](https://getbootstrap.com)
  - [Ng-bootstrap](https://ng-bootstrap.github.io/#/home)
- Back-End:
  - [ASP .NET Core](https://docs.microsoft.com/en-us/aspnet/core/?view=aspnetcore-5.0) / [Visual Studio 2019](https://visualstudio.microsoft.com/vs/)
  - [Entity Framework Core](https://docs.microsoft.com/en-us/ef/core/)
  - [JWT](https://jwt.io/)
  - [Fluent Validation](https://fluentvalidation.net/)
  - [AutoMapper](https://automapper.org/)
- Database & Cloud:
  - [Microsoft SQL Server](https://www.microsoft.com/en-us/sql-server/sql-server-downloads)
  - [Cloudinary](https://cloudinary.com/)
</br>

### Installing / Getting started

1. For angular you need to add node modules. Run this command in your terminal.

```
npm install --save-dev @angular-devkit/build-angular
```

2. For running the API, u have to add an user secret file or update ur appsettings.

- Adding user secret:

![](/gifs/user_secret_adding.gif)

- Or update ur appsettings and remove user secret reference from TwitterAPI.csproj:

```
{
  "ConnectionStrings": {
    "ConStr": "YOUR_CONNECTION_STRING",
    "DbType": "YOUR_DB_TYPE"
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

3. For Cloudinary you can create a free account to store your images. [To sign up for free.](https://cloudinary.com/users/register/free)

4. Database creation:
   - Open package manager console in Visual Studio.
   - Select 'TwitterDB' as default project in package manager console.
   - And then run this command: `update-database`

### Views / Actions

- ##### Sign up:
![](gifs/sign_up.gif)
</br>

- ##### Log in & First Tweet:
![](gifs/login_and_first_tweet.gif)
</br>

- ##### Post & Delete:
![](gifs/add_and_delete_tweet.gif)
</br>

- ##### Search & Follow:
![](gifs/search_profiles_and_follow.gif)
</br>

- ##### Unfollow:
![](gifs/unfollow.gif)
</br>

- ##### Set Up Profile:
![](gifs/set_up_profile.gif)
</br>

- ##### Like & Reply:
![](gifs/like_and_reply.gif)
</br>

- ##### Follow List & Log Out:
![](gifs/follow_list_and_logout.gif)
</br>