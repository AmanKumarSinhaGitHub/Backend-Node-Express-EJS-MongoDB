# Authentication and Authorization 

Authentication means confirming your identity (e.g., username and password), while authorization determines what you're allowed to do once your identity is confirmed.

Node.js makes it simple to add authentication and authorization to your web app. It uses these key npm packages:

- **[passport](https://www.npmjs.com/package/passport)**: Passport provides authentication strategies, like username and password, OAuth, and more.

- **[passport-local](https://www.npmjs.com/package/passport-local)**: Passport-Local lets you authenticate users with their usernames and passwords.

- **[passport-local-mongoose](https://www.npmjs.com/package/passport-local-mongoose)**: This package eases the integration of Passport-Local with MongoDB through Mongoose, making user authentication a breeze.

- **[mongoose](https://www.npmjs.com/package/mongoose)**: Use Mongoose to connect to your MongoDB database and securely store user profiles and other app data.

- **[express-session](https://www.npmjs.com/package/express-session)**: Manage user sessions and session data to track authentication status and handle user-specific info.


## Installation

To get started with this authentication and authorization system, follow these steps:

1. **Initialize your project:**

   ```bash
   express --view=ejs yourAppName
   ```


2. **Install the packages:**

   You can install the packages one by one using `npm install`:

   ```
   npm install passport
   ```
   
   ```
   npm install passport-local
   ```

   ```
   npm install passport-local-mongoose
   ```

   ```
   npm install mongoose
   ```

   ```
   npm install express-session
   ```

   - You can install all the required packages in one go using the following shorthand command:
   ```
   npm install passport passport-local passport-local-mongoose mongoose express-session
   ```

## Setup 

Write ```app.js``` code in app.js file and write it after view engine and before looger code.

Note: In app.js file, don't forget to require passport.
```js
const passport = require('passport');
```

Also setup ```users.js``` file

![1](https://github.com/AmanKumarSinhaGitHub/Backend-Node-Express-EJS-MongoDB/assets/65329366/88d92d42-d4ed-410a-9561-39413fe1273d)


In ```index.js``` write register code first and then other code as well.

![2](https://github.com/AmanKumarSinhaGitHub/Backend-Node-Express-EJS-MongoDB/assets/65329366/dfb66b16-ffed-41db-919d-449096d3f56e)


Note: Instead of ```app.get()```, write ```router.get()```

![3](https://github.com/AmanKumarSinhaGitHub/Backend-Node-Express-EJS-MongoDB/assets/65329366/cf163e1b-50bc-4122-bd7b-feab999bbf5a)


Note: In index.ejs, you must add ```name```. this help to get data in backend. In our example, ```name="username"```

```html
<input name="username" type="text" class="form-control" id="username">
```

```action``` and ```method``` is must for form submission.

```html
 <form action="/register" method="post">
   
 </form>
```
Why method post and action "/register"
```js
router.post("/register", function(req, res){
   // register code here
}
```

