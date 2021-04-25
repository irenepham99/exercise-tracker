# Exercise Tracker

This application allows users to create exercises and group them into routines, log exercise performance, and visualize progress over time. 

## Visuals  

Users can create exercises:  

![Create Exercise Image](./static/create_exercise.png)
![All Exercise Image](./static/all_exercises.png)

Then, these exercises can be grouped together into routines. 

![Create Routine Image](./static/create_routine.png)

After logging information about performance on an exercise, users can visualize their progress: 

![Exercise Progression Image](./static/progression.png)

## Installation 

### Server 

First install required libraries by running: 

`pip install -r requirements.txt`

An empty database needs to be created. First enter the python command line. Then run: 

`from app import db`
`db.create_all()`

Exit the python command line then run 
`python3 app.py`

to start the server locally on localhost:127.0.0.1

### Client 

Enter the client folder and run: 

`npm install`

then 

`npm start`. 

The application should open on localhost:3000


