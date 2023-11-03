# [Flash Messages](https://www.npmjs.com/package/connect-flash)

Flash messages, also known as "flash notifications" or "flash alerts," are a type of feedback mechanism in web applications. 

They are used to display short-lived messages to the user typically after a specific action, such as submitting a form, logging in, or registering on a website. 

Flash messages are designed to convey information about the success or failure of the user's action and provide immediate feedback.


In NodeJs, Flash message also means creating a data in a route and getting that data in another route.

Means you can't use data of any route in another route without flash message

```js
router.get('/', function(req, res) {
  res.render('index');
});

router.get('/login', function(req, res) {

  // Let suppose you are login in a website using login route and user enter wrong password and you want user to redirect in any other route like error route and there you want to show that error message that is generated in the process through login.
  
  // So here you need to get/transfer data/warning message to any other route and you can't do that without using flash-connect.

  // Flash message allow you to use data generated in one route in another route

});

```

### Flash Setup

- Install [connect-flash](https://www.npmjs.com/package/connect-flash)

```
npm i connect-flash
```

- Install Express Session and do setups

```
npm i express-session
```

```js
// Express session
const expressSession = require("express-session")

// express-session setup
app.use(expressSession({
  resave: false,
  saveUninitialized: false,
  secret: "hello this is secret"
}))

// File: app.js
```
- Make sure you put connect flash in app.use function

```js
const flash = require("connect-flash") 

// Write this line after express-session setup code
app.use(flash());
```

- Create a flash in any route and get data in another route
```js
// Flash
router.get('/age', function(req, res) {
  req.flash("age", 20);
  res.send('Age is 20');
});

router.get('/checkAge', function(req, res) {
  res.send("Check terminal/console to get age")
  console.log(req.flash("age"));
});
```
