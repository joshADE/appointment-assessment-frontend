# appointment-assessment-frontend 
> The frontend source code for the an interview assessment. The backend code can be seen [here](https://github.com/joshADE/Appointment-Assessment-Backend).


# Technologies used
* [React JS](https://reactjs.org/) (Javascript Library)
* [Redux](https://redux.js.org/) (State Container)
* [Redux Toolkit](https://redux-toolkit.js.org/) (Package to help in Redux development)
* [RTK Query](https://redux-toolkit.js.org/rtk-query/overview) (Data fetching and caching tool built on top of Redux Toolkit)
* [TypeScript](https://www.typescriptlang.org/) (Static typed superset of JavaScript)
* [Material UI](https://mui.com/) (UI Library for React JS)
* [Vite](https://vitejs.dev/) (Module bundler)

# Requirements

* NPM (version 7.x and above) (Download latest node.js to install npm [here](https://nodejs.org/en/))
* GIT (version 2.x and above) (Download latest [here](https://git-scm.com/))

# Getting Started

## Get the Server running

Follow the instructions in the README.md file of the backend source code which can be seen [here](https://github.com/joshADE/Appointment-Assessment-Backend).

## Clone Repository

Clone the repository to your computer.

```
git clone https://github.com/joshADE/appointment-assessment-frontend.git
```

## Installation

1. cd to the project directory.
2. run `npm install` to install dependencies.

```
npm install
```

## Setup the connection to the server
Inside the src/services/api folder, edit api.ts and change the baseURL variable to the url of the running backend server. Make sure that '/api' is added at the end of the url.

```
baseQuery: fetchBaseQuery({ baseUrl: 'https://localhost:44365/api/' }),
```

The link to the backend source can be seen above. You will need to get it running in your local environment.

## Available Scripts

In the project directory, you can run:

### `npm run dev`

Runs the app in the development mode.<br />
Open [http://localhost[:specified-port]] to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.
