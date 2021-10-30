This project is a CRUD app which has two parts:
- Server
- Client

## Server
This is a back-end with expressjs [https://expressjs.com/] and axios.
The package node-localstorage [https://www.npmjs.com/package/node-localstorage] is used to store data into file.

## Client
The front-side with reactjs, typescript, axios, etc...


## Run back-end:
- $ git clone https://github.com/coumarane/react-typescript-axios.git
- $ cd server
- $ npm install
- $ npm start
- open your favorite web browser and enter the following url http://localhost:5000/api in address bar



## Run front-end:
Open a new terminal and goto to the "react-typescript-axios" and follows the instructions below:
$ cd client
$ npm install
$ npm start

## Note:



**How to use ApolloProvider in Front-End :**
Create .env file in the same level as package.json and and this variable: 
REACT_APP_API_URI: http://localhost:5000/api
The port is 5000 because the server expressjs is launched on this port (see the .env file in server folder).
Add the following code in App.tsx.

```
import * as React from "react";
import { BrowserRouter, Router } from "react-router-dom";
import { Redirect, Route, Switch } from "react-router";

import { createBrowserHistory } from "history";



const history = createBrowserHistory();

class App extends React.Component<{}, {}> {
  render() {
    return (
      <>
        <BrowserRouter>
          <Router history={history}>
            <Switch>
              <Redirect exact={true} from={`/`} to={"/"} />
              <Route exact={true} path={"/home"} component={HomePage} />
            </Switch>
          </Router>
        </BrowserRouter>
      </>
    );
  }
}
```
