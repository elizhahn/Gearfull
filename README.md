# Gearfull

This is a Mod 3 [Front-End Project](https://frontend.turing.edu/projects/module-3/niche-audience.html) by [Elizabeth Hahn](https://github.com/elizhahn)

### Deployed App: [Gearfull]()

## Outline

1. [Project Overview](#project-overview)
2. [App Overview](#app-overview)
3. [Learning Goals](#learning-goals)
4. [Tech Stack](#tech-stack)
5. [Features](#features)
6. [Instructions for Installation](#instructions-for-installation)
7. [Future Iterations](#future-iterations)
8. [Project Reflections](#project-reflections)


## Project Overview

The goal of this project was to confirm my skills using React, React-Router, Asynchronous Javascript, and Cypress to build an application that solves a problem for a small niche audience. Github project board was utilized to organzize user stories, personas, wireframes, and acceptance criteria.  


## App Overview

Gearfull is a backpacking gear and weight tracker. This application helps people track their backpack weights so they can attempt to lighten their load and become a more lightweight backpacker. Hikers can utilize the dashboard to add "shelves" which represent a category of gear they own. After adding a shelf, they can fill their shelves with gear items, the weight, and amount of that gear item. Their dashboard will also display the weight total of all their gear as they add/remove items. Additionally, the weights of each shelf is provided so hikers can see where most of the weight is accumulating. 


## Learning Goals
 
 - Establish my skills with React and build a more robust application that showcases my knowledge
 - Building an application that tracks multiple API calls 
 - Strategic component architecture that makes sense for the application
  
## Tech Stack

### Front-End:
- JavaScript ECMA6
  - React (create-react-app)
  - React Router
- HTML5
- CSS3
  - SASS / SCSS

### Testing:
- Cypress
  - Mocha
  - Chai

## Features

### Homepage

![](https://media.giphy.com/media/2tqt97Htn7HIf1Gjq3/giphy.gif)

### Dashboard

#### Adding a shelf

![](https://media.giphy.com/media/Rod8eyQ3UGnXLID11K/giphy.gif)

### Adding items to a shelf

![](https://media.giphy.com/media/NrrJSXX1ntt8n3VIIW/giphy.gif)

### Removing items from a shelf

![](https://media.giphy.com/media/qpvTEMdnNXPvwBzXdN/giphy.gif)

### Deleting a shelf

![](https://media.giphy.com/media/GbcERaVPJogWdsGAnY/giphy.gif)


### Responsive Design

![](https://media.giphy.com/media/KzOXOIruLdhqMBAHwt/giphy.gif)

### Accessibility

![](https://media.giphy.com/media/3CIRTpHPjFaQBlKVQY/giphy.gif)


## Instructions for Installation

  - To run this application on your local machine, clone down this repo, change into the root directory from the command line, and run `npm install`. 
    
  - Then run `npm   start` to open the application locally. If you aren't taken there, visit `http://localhost:3000/`
    
  - To run the test suite locally, you will also need to run the command `npm i -D cypress` from the command line.
    
  - Once it  has installed, run `npx cypress open`, then select the `app_spec.js` test file. 
    
  - Note: you will need to run the application locally (start the server with `npm start` from the root directory on the command line) in order to run the automated tests.

## Future Iterations

 - Add a data pie chart that represents Each shelf with a color. The color will correspond to the breakdown of weight per shelf list
 - Allow users to drag and drop their shelf in a different order
 - Allow users to save gear lists to cater a gear list for different types of backpacking trips
 - Have a user sign in that sets people up with their own database of information


## Project Reflections

### Challenges

  - Stubbing the API calls in the testing suite proved challenging, and took some time to figure out the correct timing and fixtures to load
  - Managing state with the multiple API calls that were being made throughout the app, and making sure that state matched up with the stored data

### Wins

  - Building an application that utilized 4 API calls allowing a user a multitude of actions to take
  - Problem solving how to "delete" an item, when the API did not allow for a direct item deletion
  - Creating a useable application applicable to my passions
