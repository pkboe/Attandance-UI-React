# User management with React Hooks
## What are hooks?

>Hooks are a new addition in React 16.8. They let you use state and other React features without writing a class.
 
If you want to learn about hooks, go to this site: [https://reactjs.org/docs/hooks-intro.html](https://reactjs.org/docs/hooks-intro.html)

## Setup
This is written for a backend setup for JWT token authentication. Maybe, if there's enough people asking for it, I'll make another post for that. If you are, mail me at thomas@codious.io

To start a new front-end project, we're going to use `create-react app`.

```
npx create-react-app use-user-demo
```
> Executes <command> either from a local node_modules/.bin, or from a central cache, installing any packages needed in order for <command> to run.

Using `npx` means you don't have to install `create-react-app` globally and ensures you always have the latest version.

### Optional
Then, what I do, is going into the src folder and change the `app.js` file to `app.jsx`. I just like it better that way. Ideally, I'd like to change `index.js` too, but then I'd have to eject, which is something I also dislike.

## Structure
In the `src` folder, create the following directories: `Components`, `Views` and `Hooks`.

You don't HAVE to do this, but it will be easier to follow that way. If you don't like this structure, by all means use your own structure.

In the `Views` folder, create a file called `Home.jsx`.
In the `Components` folder, create a file called `AppBar.jsx`.
In the `Hooks`folder, create a file called `UseUser.jsx`.

Your `src` folder will now look something like this:

```
src
 | Components
   | AppBar.jsx
 | Hooks
   | UseUser.jsx
 | Views
   | Home.jsx
 | App.css
 | App.jsx
 | App.test.js
 | index.css
 | index.js
 | logo.svg
 | serviceWorker.js
```

We're not going to use all of this, but you might want to later, so we'll leve everyting in place.

## Hello, World!
First, we'll create our `Home` view:

```javascript
// Views/Home.jsx

import React from 'react';

export default function Home() {
  return (
    <div>
      Hello, World!
    </div>
  );
}
```

Nothing Special here, except maybe that it's a functional component and not a class.

Let's import it in our app.

```javascript
// App.jsx

import React from 'react';
import Home from './Views/Home';

function App() {
  return (
    <div>
      <Home/>
    </div>
  );
}

export default App;
```

In your terminal folder, go to your application folder and hit `yarn start`.

Success!

## AppBar
Next, We're going to create an appBar. I don't really want to do that myself, so...

### Material-ui
...we'll be using `material-ui`for this. Why? because it's easy and makes your website look professional without a lot of effort.

```bash
yarn add @material-ui/core @material-ui/icons
```

In the `head` of `public/index.html` paste the following:

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500">
```

### Continuing
I copied the appBar code from the Material-ui examples and edited it a little.

```javascript
// Components/AppBar.jsx

import { AppBar as MuiAppBar, Button, IconButton, Toolbar, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import React from 'react';

const styles = {
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

function ButtonAppBar(props) {
  const { classes } = props;
  return (
    <MuiAppBar position="static">
      <Toolbar>
        <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" color="inherit" className={classes.grow}>
          News
        </Typography>
        <Button color="inherit">Login</Button>
      </Toolbar>
    </MuiAppBar>
  );
}

export default withStyles(styles)(ButtonAppBar);

```

Add it to the Home view.

```javascript
// Views/Home.jsx

import React from 'react';
import AppBar from '../Components/AppBar'; // New Line

export default function Home() {
  return (
    <div>
      <AppBar/> // New Line
      Hello, World!
    </div>
  );
}
```

Voilà!

### Login
We're going to add one more component. 
A simple login screen, copied from the material-ui examples.

```javascript
// Components/Login.jsx

import {
  Avatar,
  Button,
  FormControl,
  Input,
  InputLabel,
  Paper,
  Typography,
} from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import React from 'react';

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});

function Login(props) {
  const { classes } = props;

  return (
    <main className={classes.main}>
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form}>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="email">Email Address</InputLabel>
            <Input id="email" name="email" autoComplete="email" autoFocus />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input name="password" type="password" id="password" autoComplete="current-password" />
          </FormControl>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign in
          </Button>
        </form>
      </Paper>
    </main>
  );
}

export default withStyles(styles)(Login);
```

Let's add it to our `Home` view.

```javascript
import React from 'react';
import AppBar from '../Components/AppBar';
import Login from '../Components/Login';

export default function Home() {
  return (
    <div>
      <AppBar />
      <Login />
    </div>
  );
}
```

## UseUser
Finally, let's create the UseUser hook.

```javascript
// Hooks/UseUser.jsx

import React, { createContext, useContext, useEffect, useState } from 'react';

function getCurrentUser(accessToken) {
  if (accessToken  === 'awesomeAccessToken123456789') {
    return {
      name: 'Thomas',
    };
  }
}

const initialState = {
  user: {},
  accessToken: undefined,
};

const UserContext = createContext(initialState);

export function UserProvider({ children }) {
  const [accessToken, setAccessToken] = useState(localStorage.getItem('access_token'));
  const [user, setUser] = useState({});

  function handleAccessTokenChange() {
    if (!user.name && accessToken) {
      localStorage.setItem('access_token', accessToken);
      const user = getCurrentUser(accessToken);
      setUser(user);
    } else if (!accessToken) {
      // Log Out
      localStorage.removeItem('access_token');
      setUser({});
    }
  }

  useEffect(() => {
    handleAccessTokenChange();
  }, [accessToken]);

  return (
    <UserContext.Provider value={{ user, accessToken, setAccessToken }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);
```

What's happening here?

First, we created a context. This is to easily pass the user through without having to give it as a prop to all components that'll need it.

We keep the accessToken and user in the state of our wrapper. The `useEffect` hook replaces the `componentDidMount` and `componentDidUpdate` lifecycle methods. It will fire at mount and then every time the access token is changed. the handleAccessToken function then stores the access token in local storage as to keep the user logged in between sessions. When an accessToken has been set, we fetch the current user associated with that token. You'll want the `getCurrentUser` function to fetch the user from the server, but that would lead us to far for this tutorial.

If the accessToken is set to a falsely value like `null` or `undefined`, we remove the accessToken and set the user to an empty object, effectively logging him out.

In the end, we use the useContext hook. The result of this will be `{ user, accessToken, setAccessToken }`. That is what we'll get back from our hook.

Now, we need to wrap our app in the provider as such:

```javascript
// src/App.jsx

import React from 'react';
import { UserProvider } from './Hooks/UseUser';
import Home from './Views/Home';

function App() {
  return (
    <div>
      <UserProvider>
        <Home />
      </UserProvider>
    </div>
  );
}

export default App;
```

In the Home view, we'll now add a condition, so that we can greet our user if he is logged in. if not, we'll show the login form.

```javascript
// Views/Home.jsx

import React from 'react';
import AppBar from '../Components/AppBar';
import Login from '../Components/Login';
import { useUser } from '../Hooks/UseUser';

export default function Home() {
  const { user } = useUser();

  return (
    <div>
      <AppBar />
      {
        user.name? <h1>{`Hello, ${user.name}`}</h1> : <Login />
      }
    </div>
  );
}
```

Now, we'll have to be able to login, so we make our login form interactive (using hooks ofcourse), and add an onSubmit action to the form.

```javascript
// Components/Login.jsx

import {
  Avatar,
  Button,
  FormControl,
  Input,
  InputLabel,
  Paper,
  Typography,
} from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import React, { useState } from 'react';
import { useUser } from '../Hooks/UseUser';

/* styles */

function Login(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setAccessToken } = useUser();
  const { classes } = props;

  function handleEmailChange(event) {
    setEmail(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  function handleFormSubmit(event) {
    event.preventDefault();
    
    // Fetch the accessToken from the server
    setAccessToken('awesomeAccessToken123456789');
  }

  return (
    <main className={classes.main}>
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={handleFormSubmit}>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="email">Email Address</InputLabel>
            <Input
              id="email"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={handleEmailChange}
              value={email}
            />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input
              name="password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={handlePasswordChange}
              value={password}
            />
          </FormControl>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign in
          </Button>
        </form>
      </Paper>
    </main>
  );
}

export default withStyles(styles)(Login);
```

Now, we'll edit our appBar so we're able to log out to.

```javascript
// Components/AppBar.jsx

import { AppBar as MuiAppBar, Button, IconButton, Toolbar, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import React from 'react';
import { useUser } from '../Hooks/UseUser';

const styles = {
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

function ButtonAppBar(props) {
  const { user, setAccessToken } = useUser();
  const { classes } = props;

  function logout() {
    setAccessToken(null);
  }

  return (
    <MuiAppBar position="static">
      <Toolbar>
        <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" color="inherit" className={classes.grow}>
          {user.name ? user.name : 'Please, log in'}
        </Typography>
        {user.name && <Button color="inherit" onClick={logout}>Log Out</Button>}
      </Toolbar>
    </MuiAppBar>
  );
}

export default withStyles(styles)(ButtonAppBar);

```

That's It! You now have a custom hook to handle your user management throughout your application.

Log in with any email address and password 
