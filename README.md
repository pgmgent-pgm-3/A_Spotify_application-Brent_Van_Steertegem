# Introduction
This web application was made as an assignment for the course 'Programming 3: Advanced'.
The application has been divided in two parts:
- The first part is an API
- The second part is a user interface to make interact with said API
Full specs of the application will be described below in the article 'Feature Overview'.

# Installation
To use this application simply open the root folder of this project in a terminal window and type `npm install` or `npm i` for short.  
To actually run the application, simply type `npm run start:dev` in the same terminal and click on the link in the terminal or manually go to 'http://localhost:PORT' where PORT is the port you specified.  
The database has already been seeded but if you wish to seed it again then you simply have to type `npm run seed` in the terminal.

# Feature Overview
By making use of the API you can:
- Register as a new user
- Log in to an existing account
- Get an array of all users**
- Get a specific user**
- Delete a specific user**
- Post a new artist**
- Get a list of all artists
- Update an artist*
- Delete an artist**
- Post a new song**
- Get a list of all songs
- Get a specific song
- Update a song*
- Delete a song**
- Post a new album**
- Get a list of all albums
- Get a specific album
- Update an album*
- Delete an album**

By making use of the user interface of the appliction you can:
- Register as a new user
- Log in to an existing account
- Get an array of all users**
- Get a list of all artists
- Get a list of all playlists
- Get all details, including all songs of the active playlist

\* marks you need to be either en editer or an admin to perform this action.  
\** marks you need to be an admin to perform an action.

By adding `/api-docs` to the base url of the application you can watch the documentation of all endpoints.

# Author
Created by Brent Van Steertegem.

# Sidenote
Due to unexpected circumstances, including a funeral, I've had trouble focussing on the task at hand which has lead to several days worth of backlog.  
This is not an explanation as to why this application isn't finished. It is however the reason why this is the case so I thought it was worth mentioning.
