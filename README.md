# Mapsonal


## Team Members
1. Steven Sbarbaro
2. Indro Born
3. Matan Davidi
4. Luca Bachmann

## Project Description 
Mobility involves more than just transitioning between two points. It also comes with some associated costs, like time, money, and emissions. Depending on the person and the situation, you might prefer to use different means of transport to reach your destination. However it has always been hard to decide which means of transport is rationally the best one, and how it compares to the others.

Our project, Mapsonal, wants to simplify and allow easy comparison between the various transport modes. We aim to allow to search, visualize, and compare the various options and let the user rationally decide which way of transport they prefer based on various factors: duration, cost, and CO2 emissions.

### Project goals
Given an origin and a destination name, we want to show a path for each of the following means of transport: car, bike, foot, and public transport. To optimize for different times of the day we also require the user to input the moment in which they want to travel. Using this information, we want to find the various paths that the user would use, and display the information found.  
Furthermore, we seek to easily visualize the different aspects of the route using each mean of transport, namely cost, duration, and emissions, and allow the user to quickly compare them without needing any further analysis.

Due to API restrictions our public transport routing only works inside of Switzerland and for dates in a limited timeframe. Additionally, we are limited to an average of the cost and CO2 emissions per means of transport in Switzerland, since giving more precise predictions would require additional data about the user and access to other APIs.

### Data Sources
Mapping location name to geopositions:
[nominatim.org](https://nominatim.org/release-docs/develop/api/Overview/) 

Public transport routing (trip request) and location suggestion (location information request):
[opentransportdata.swiss](https://opentransportdata.swiss/en/cookbook/open-journey-planner-ojp/)

Foot/car/bike routing:
[graphhopper.com](https://www.graphhopper.com/)

Map:
[react-leaflet.js.org](https://react-leaflet.js.org/)

### Tasks
Given the start location name, destination name, and a datetime input, we want to find the routing information for public transport, car, foot, and bike journeys. We want to use this information to display the geographic path the various routes take, and duration, expenses, and carbon emissions comparison histograms. Additionally, we want to display the precise duration, distance, cost, and carbon emissions information for each means of transport.


## Requirements
- A working computing machine (e.g. a PC), with an operating system such as some Linux distribution (e.g. [Debian](https://www.debian.org/), [Mint](https://www.linuxmint.com/), [Ubuntu](https://www.linuxmint.com/), [Arch](https://archlinux.org/), [openSUSE](https://www.opensuse.org/), etc.), [Microsoft Windows](https://www.microsoft.com/windows/) or [macOS](https://support.apple.com/en-us/102662)
- A working internet connection (either via ethernet or WiFi)
- [`git`](https://git-scm.com/), [GitHub Desktop](https://desktop.github.com/), [SourceTree](https://www.sourcetreeapp.com/), or any similar GUI for the `git` terminal utility
- Access to GitLab repository [inborn_project_express](https://gitlab.inf.ethz.ch/course-fwe2023/students/project/express/inborn_project_express)
- Node Packet Manager ([`npm`](https://www.npmjs.com/))
## How to Run
To run Mapsonal you have to perform one of the following:
- If you installed `git` and don't require the use of a graphical user interface such as GitHub Desktop or Sourcetree:
  - Open a terminal instance or similar command prompt;
  - Navigate to a directory that you have to write and execute access to (let us call this directory `/home/<your_username>/dir/`, where `<your_username>` is the name of the user with which you are logged into the operating system). To get there, you will need to write a command similar to the following:
    ```
    cd /home/<your_username>/dir/
    ```
  - clone the repository using HTTPS:
    ```
    git clone https://gitlab.inf.ethz.ch/course-fwe2023/students/project/express/inborn_project_express.git
    ```
    or using SSH (remember to first setup your [SSH keys pair](https://docs.gitlab.com/ee/user/ssh.html)):
    ```
    git clone git@gitlab.inf.ethz.ch:course-fwe2023/students/project/express/inborn_project_express.git
    ```
  - Using the command `cd`, move to the folder where the project has been downloaded, as follows:
    ```
    cd inborn_project_express
    ```
- If you installed a graphical user interface for the `git` utility such as GitHub Desktop or Sourcetree:
  - Clone the repository as required by your chosen GUI software. For instance, what follows are the documentation pages to clone a repository for both [GitHub Desktop](https://docs.github.com/en/desktop/adding-and-cloning-repositories/cloning-and-forking-repositories-from-github-desktop) and [SourceTree](https://confluence.atlassian.com/sourcetreekb/clone-a-repository-into-sourcetree-780870050.html)

- Once you find yourself inside of the cloned git repository, run the following commands, one line at a time:
  ```
  npm i
  npm run dev
  ```
- Finally, the output of the command will look similar to the following:
  ```
  » npm run dev  

  > vite-react-typescript-starter@0.0.0 dev
  > nodemon src/server/main.ts -w src/server

  [nodemon] 3.0.1
  [nodemon] to restart at any time, enter `rs`
  [nodemon] watching path(s): src/server/**/*
  [nodemon] watching extensions: ts,json
  [nodemon] starting `ts-node src/server/main.ts`
  7:32:39 PM [vite-express] Running in development mode
  7:32:40 PM [vite-express] Using Vite to resolve the config file
  Server is listening on http://localhost:5173
  ```
  Open the URL `http://localhost:5173` with an internet browser such as [Mozilla Firefox](https://www.mozilla.org/firefox/), [Google Chrome](https://www.google.com/chrome/) or [Safari](https://www.apple.com/safari/).

### Local Development

Only change files inside the `src` directory.

**Client side**

All client-side files are located in the `src/client` directory.

**Server side**

All server-side files are located in the `src/server` directory.

### Local Testing

**Run container for local testing**

```bash
docker build -t my-webapp .

docker run -it --rm -p 5173:5173 my-webapp
```
Open a browser and connect to http://localhost:5173

**Run bash in interactive container**
```bash
docker build -t my-webapp src/.

docker run -it --rm -p 5173:5173 my-webapp bash
```


## Milestones
- [X] Milestone 1: Setting up the project and implementing basic functionalities
  - [X] Task 1.1: Set up the project structure
  - [X] Task 1.2: Design application using [Figma](https://www.figma.com/team_invite/redeem/DyjpSdlXWRdTHSLgeaIYNZ) 
  - [X] Task 1.3: Implement the user interface for inputting source and destination names
  - [X] Task 1.4: Implement the basic routing to the front-end React component for the backend
  - [X] Task 1.5: Implement the function for sending requests to the Nominatim API to translate names into geographical coordinates
  - [X] Task 1.6: Implement error handling for invalid inputs and unsuccessful API calls

- [X] Milestone 2: Implementing initial routing information retrieval
  - [X] Task 2.1: Implement the function for sending requests to the OJP API and the GraphHopper API to get routing information
  - [X] Task 2.2: Process the data returned from the APIs and store the path, distance, cost, and emissions in an appropriate data structure
  - [X] Task 2.3: Implement the function for returning all the routing information to the front-end
  - [X] Task 2.4: Continue error handling implementation for unsuccessful API calls and invalid data

- [X] Milestone 3: Implementing the map and routing information display
  - [X] Task 3.1: Implement the functions for displaying each route on the map in a different color
  - [X] Task 3.2: Implement the user interface for displaying the required time, distance, cost, and emissions of each route in a bar graph form
  - [X] Task 3.3: Implement the React component for displaying the specifics of the route when the user selects one
  - [X] Task 3.4: Implement the button for redirecting the user to Google Maps for real-time directions when necessary
- [X] Milestone 4: Finalizing the project and testing + Project presentation (2023-12-19)
  - [X] Task 4.1: Refine the user interface and make sure it follows good design principles, with a focus on accessibility
  - [X] Task 4.2: Conduct thorough testing of the entire application to ensure all functionalities are working as expected
  - [X] Task 4.3: Fix any bugs identified during testing
  - [X] Task 4.5: Prepare project presentation
  - [X] Task 4.5: Prepare the project for submission
## Weekly Summary 
### 2023-11-13 - 2023-11-19
- We created a [Figma mock design](https://www.figma.com/team_invite/redeem/DyjpSdlXWRdTHSLgeaIYNZ) for our application, to all be on the same page for the look and feel of the implementation
- A demo user interface was created for inputting source and destination names using React for the front end.
- Additionally, we implemented a demo for sending requests to the Nominatim API to translate names into geographical coordinates. 
- We also implemented some basic error handling for invalid inputs and unsuccessful API calls.
### 2023-11-20 - 2023-11-26
- This week we created a demo for sending requests to the Open Journey Planner API to translate names into geographical coordinates.
- Furthermore, we wrote some initial code for map rendering and played around with placing some markers on it
- We further developed our error handling code to be able to handle unsuccessful API calls and invalid data returned from them.
- We worked on the styling for the footer and the header components, and decided to opt for columns as our main mean of comparison between the different ways of transportation, which we deemed more user-friendly than our original matrix idea.
- Finally, we began merging all demos and pieces of code we had written so far into one big demo, which will soon become our final prototype
### 2023-11-27 - 2023-12-03
The third week was dedicated to implementing the map and routing information display: 
- We implemented a function for displaying each route on the map in a different color, based on the return values of the OJP and GraphHopper API
- We went on to begin the path's data visualization, including distance and duration
  - We could not complete it due to the `myclimate` API not yet replying to us to provide us access to their API to compute the emissions for each path
- We further improved our header by selecting a DateTimePicker that would not only show the chosen date, but the time of day as well.
- On top of that, we selected the icons for our four different means of transport and made sure that their buttons worked as intended.
- Finally, we wrote an initial implementation of the obtained data's bar graph visualization and comparison, although for now it only shows the bars without adapting them in relation to one another
### 2023-12-04 - 2023-12-10
- We could not complete emissions calculations due - We refined the user interface and ensured it followed good design principles, with a focus on accessibility (e.g. color-blindness-impaired people)to the `myclimate` API not yet replying to us
- We have adapted the height of the bars in the data's visualization such that one can easily compare durations and distances between means of transport by looking at which is higher.
- We further improved the design of our application by making it responsive to different screen sizes, and corrected inconsistencies in the code with regards to the positioning of our apps' components.
- Finally, we created an active and a passive CSS component with varying colour shades for the buttons with the intent to recognize which button has been clicked last.
### 2023-12-11 - 2023-12-17
- We could not complete emissions calculations due to the `myclimate` API not yet replying to us
- We also improved the trip's details view to make its design fit better with the rest of the web app
- We refined the user interface and ensured it followed good design principles, with a focus on accessibility (e.g. color-blindness-impaired people)
- Furthermore, we modified the color palette of the app to be more aesthetically pleasing and to better fit together
- Then, we added hints to the location search for the departure and arrival places, through a call to the OJP API. Now the user receives autocompletion hints as they are typing in the search boxes
- We modified the Polylines on the map by adding a button functionality to them, and improved their styling by making the active Polyline thicker than the passive ones.
### 2023-12-18 - 2023-12-20
- Due to a lack of response from `myclimate`, we looked for data sources for average emissions and cost for each means of transport
- We proceeded to complete the route's data visualization, including cost and emissions, based on the newfound constants
- Furthermore, we finalized the layout and color palette of the view containing the details of the trip by public transport
  - It was decided to redirect the user to Google Maps instead of showing the details of the trip by bike, car, or on foot, since the GraphHopper API returns a route's information with most street names as `null`, thus providing no actual information to a user that requests the route's details.
- We conducted thorough testing of the entire application to ensure all functionalities were working as expected. Any bugs identified during testing were fixed.
- We created the project's presentation using PowerPoint

## Versioning
