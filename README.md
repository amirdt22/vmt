# VMT React

## Setup for local Development
This project runs on two ports. The front-end react app runs on PORT 3000 and
the back-end node app runs on PORT 3001. Requests from the front-end are proxied
to the backend. [create-react-app](https://github.com/facebookincubator/create-react-app) makes this painless with a simple addition to the package.json in the client directory.
`"proxy": "http://localhost:3001",`

Because the project is essentially split in two, we need to run npm install
in both the root directory (to install the server dependencies) and in the client
directory (to install the react dependencies). Similarly, when booting up the project we need to run nodemon in the root and npm start in client.   
1. `$ git clone https://github.com/okputadora/mern-vmt`
1. `$ npm install`
1. `$ nodemon`
1. open a new console tab
1. `$ cd client && npm install`
1. `$ npm start`
1. At this point create-react-app will open a browser window for you and refresh it
every time a change is made.

## Deployment
This should be changed eventually, but it works for now.
```
$ git checkout heroku
$ git merge master
$ cd client && npm run build
$ cd ..
$ git add .
$ git commit -m 'built'
$ git push -f heroku HEAD:master
```

## Project structure
This project was bootstrapped with [this template](https://github.com/okputadora/MERN-template.git)
refer to its README for information regarding the directory structure.

### Dataflow
* As a user navigates around the application, we want the rendering to be fast.
This means we only want to request data at the moment we need to display it, and
we only want to request that data once. If two components share data they should
check if that data is already accessible before requesting it.
*
#### Redux
From the redux docs: "For maximum rendering performance in a React application, state should be stored in a normalized shape, many individual components should be connected to the store instead of just a few, and connected list components should pass item IDs to their connected child list items (allowing the list items to look up their own data by ID). This minimizes the overall amount of rendering to be done. Use of memoized selector functions is also an important performance consideration."
[source](https://redux.js.org/faq/performance)
## Geogebra
This application makes use of the Geogebra software. LICENSE

## TODO
### General
1. ~~Check the redux store before requesting data and see if we already have it,
we should only ever load rooms and courses once~~
1. ~~Loading screens for when the user should not be clicking around~~
1. Make ContentBox's content collapsible (to allow more room for workspace)
1. Make arrow for dropdown menu spin w/r/t state
### Chat
1. Make chat scroll to bottom by default
1. make message components & style it up
1. Dynamic styling for users own messages vs incoming
1. Disable chat funcitonality in replayMode
### New Course
1. When selecting rooms to add or remove from the course the UX ain't great.
We should have some sort of small animation to signify the click is registered
or at the very least change the color for selected so it doesnt match hover.
Its confusing when you click de-select but then nothing appears to happen because
you're still hovering over it
1. Transitions not working on dropdown (not a huge deal right now)
1. Filter for myCourses not working

### Course page
1. What do we want this to look like? functionality?
1. Current members, list of rooms, list of active rooms (I'm thinking the teacher
would want a list of all the room they're going to assign throughout the year,
and when they want students working in that room they can mark it as active with
a due date or something?)
1. ? Do we want to allow a teacher to select rooms when they're creating a course
or should that just happen after?
1. Students should have a similar course dashboard but should not have the ability
to create new rooms or add students or see student notifications

### Profile page/Dashboard page
1. Have breadcrumbs so user can easily navigate back and forth between resources  
### Rooms
1. ~~have the rooms order from newest to oldest, so when a new room is created
its right at the top of the list and visible to the user~~
    * this doesn't work for myRooms
1. ~~Filter is broken... myRooms seems to list every room i've ever entered including
duplicates~~
1. Room ContentBox should say if that room belongs to any courses
### Replayer
1. capture dragging events.
1. allow the user to click on or drag the progress bas to change the time  

## Bugs
1. ~~We need to disable all buttons related replaying and interacting with the room
until the ggbClient is loaded.~~
1. ~~Navigating around the room (i.e. from replayer to enter-room is buggy and bad UX)
 enter room should change to exit room upon entering --> upon replaying it should
 say~~
1. ~~When we enter a room with no data, make some events, and then click replayer
we get an error that there are no events (perhaps we need to make a new api call? not sure?)~~
1. ~~We need to store current room users in the room object so that new users joining can
see who is already in the room~~
1. ~~Every time a user enters a room it adds that room to "their rooms" (even it its already in their rooms)~~
1. When we click on a room we load up the events and then we click enter room we take the
last event and set the ggbBase64 with said event. If new events happen between time of clicking
on room and clicking on enter room we fall out of synch, perhaps it would be best to join
room immediately and just hide the geogebra workspace?  -- I think the best solution is to

1. ~~the geogebra addListener only fires the first time you go into room~~
1. ~~Now addListener won't fire after receiving event from another client~~

## Ideas for further Development
### General/Optimization
1. Rooms and Courses containers have the exact same structure, we probably should
have made a more general container that can handle both of these but c'est la vie
### Ideas for the replayer
1. have the time between each event = the actual time between events at creation
    * we could accomplish this with moment and taking a diff of the timestamps of each event
    * then in the event model we would have a field like timeToNextEvent
    * On the front end we initialize a new setTimeout every time we want to move to the next event
  and set its time to event.timeToNextEvent
    * If the distance is more than 15 seconds we can skip to the next event and
  let the user know how much time has elapsed
    * Perhaps we could also give the option to speed up
1. Have the user who performed the action highlighted (or something)
1. Replay the chat in unison?
1. Movie-player-like UI
1. When you draw a square, that should be four events (each point). but right now
when an event is fired when we add each point, but also when we make a line by
connecting two points, and also when we make a square by connecting the last point
--- this looks weird in the replayer
1. Perhaps we could make the playback look nice by utilizing geogebra's animation api
e.g., setAnimating, startAnimcation
1. Log how long students are in the room so teachers can see total time they spent working

### Ideas for rooms
1. Filtering
    * Allow filtering across multiple fields (active rooms with people in them etc.)
    * When someone leaves a room take a snapshot as png and display images of the rooms
  in the ContentBoxes that list them

### Ideas for analytics
1. What kind of statistics can/should we generate?

### Profile page
## References
1. [geogebra docs](https://wiki.geogebra.org/en/Reference:GeoGebra_Apps_API)
