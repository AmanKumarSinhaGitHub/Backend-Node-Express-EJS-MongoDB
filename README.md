# Create a BackEnd 

Steps to setup a backend for any project.

## Express JS Setup

- Use the npm init command to create a package.json file for your application
    ```
    npm init 
    ```

- Now install Express
    ```
    npm install express
    ```


### Hello World Code in ```app.js``` file

- Visit to [npmjs.com](https://www.npmjs.com/package/express) or [expressjs.com](https://expressjs.com/en/starter/hello-world.html) and Copy the boiler plate (hello world) code

    ```js
    const express = require('express')
    const app = express()
    const port = 3000

    app.get('/', (req, res) => {
        res.send('Hello World!')
    })

    app.listen(port, () => {
        console.log(`App listening on port ${port}`)
    })
    ```

## EJS setup

- Install [EJS](https://ejs.co/) 
    ```
    npm install ejs
    ```

- Set view engine
    ```js
    app.set("view engine", "ejs") 
    ```

    Now your code look like this

    ```js
    const express = require('express') 
    const app = express()
    const port = 3000

    app.set("view engine", "ejs")  

    app.get('/', (req, res) => {
        res.send('Hello World!')
    })

    app.listen(port, () => {
        console.log(`App listening on port ${port}`)
    })
    ```
- Create ```views``` Folder
- Create ```ejs``` files inside ```views``` folder
    - Example - ```index.ejs```
    - Inside ```index.ejs```, Paste normal html boilder plate code

        ```html
        <!DOCTYPE html>
        <html lang="en">

        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Index.Js File</title>
        </head>

        <body>
            <h1>Welcome to Index.Js file (Home Route)</h1>
        </body>

        </html>
        ```


### Render ```index.ejs``` file inside route

```js
app.get('/', (req, res) => {
    res.render('index')
})
```

Now your code (```app.js```) look like this.
```js
const express = require('express') 
const app = express()
const port = 3000

app.set("view engine", "ejs") 

app.get('/', (req, res) => {
    res.render('index')
})

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})
```

### Start the Server
 
Run this command
```
node app.js
```

But, there is a problem in this way. Whenever you made some changes in your file, you have to restart the server again and again to reflect the changes.

So the better approach is to start the server using nodemon

**Install [Nodemon](https://www.npmjs.com/package/nodemon)**

```
npm install nodemon
```

Now to start server, Just type the command given below

```
nodemon app.js
```

### Express static files setup

- Create ```public``` Folder
- Create ```images```, ```stylesheets``` and ```javascripts``` folder inside public folder. 
- You can create files inside these folders. For e.g. ```style.css``` in ```stylesheets``` folder.

Now write this in ```app.js``` file to [serve](https://expressjs.com/en/starter/static-files.html) static files

```js
app.use(express.static('./public'))
```

Now your code (```app.js```) look like this
```js
const express = require('express') 
const app = express()
const port = 3000

app.set("view engine", "ejs") 
app.use(express.static('./public'))

app.get('/', (req, res) => {
    res.render('index')
})

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})
```
Adding Stylesheet
```html
<link rel="stylesheet" href="/stylesheets/style.css">
```

Now your ```index.ejs``` file looks like

``` html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Index.Js File</title>

    <!-- Linking stylesheet -->
    <link rel="stylesheet" href="/stylesheets/style.css">
    
</head>

<body>
    <h1>Welcome to Index.Js file (Home Route)</h1>
</body>

</html>
```

And your directory/folder structure looks like this
```
.
├── app.js
├── package.json
├── public
│   ├── images
│   ├── javascripts
│   └── stylesheets
│       └── style.css
└── views
    ├── index.ejs

```


<br>

# [EXPRESS GENERATOR](https://expressjs.com/en/starter/generator.html)

You can easily do all the above task by just using express generator and save your time to setting up backend again and again.

#### Install the application generator as a global npm package

```
npm install express-generator -g
```

## Steps to setup

Open cmd/terminal and type the command below to create an app. 
```
express yourAppName --view==ejs
```

Now change directory:
```
cd yourAppName
```


Install dependencies:
```
npm install
```

Now open it on vs code
```
code .
``` 

Your app is created and opened in VS code.