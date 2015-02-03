# Lernhow

**Lernhow** provides 5-step guides to knowledge, created by *lerners* for *lerners*.
No more searching sprawling wikis for what you need. Avoid all the useless information. Come [**Lernhow**](https://lernhow.herokuapp.com/).

---

## Table of Contents

1. [Requirements](#requirements)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Running the Server](#running-the-server)
1. [Deployment](#deployment)
1. [Documentation](#lernhow-api-documentation)
1. [Roadmap](#product-roadmap)
1. [Team](#lernhow-team)
1. [Contributing](#contributing)

---

## Development Requirements

- Node 0.10.x
- npm 2.x.x
- MongoDB 2.6.x
- Sass 3.4.x

### Installing Dependencies

Install Node (bundled with npm) with [Homebrew](http://brew.sh/)

```sh
brew install node
```

Install MongoDB with [Homebrew](http://brew.sh/)

```sh
brew install mongodb
```

Install Sass (you will need [Ruby](https://www.ruby-lang.org/en/))

```sh
gem install sass
```

Install Bower **Globally**

```sh
npm install -g bower
```

Install Project Dependencies

```sh
npm install
bower install
```

### Running the Server

Use **gulp** to start the development server

```sh
gulp
```

You should now be able to preview your development site at [http://localhost:8000](http://localhost:8000/)

---

## Deployment

Deploying to Heroku requires a Heroku account and the Heroku toolbelt installed &mdash; [instructions here](https://devcenter.heroku.com/articles/getting-started-with-nodejs#set-up). Once you have the Heroku toolbelt and an account, proceed with the instructions below.

Log in to your account via the Heroku CLI

```sh
heroku login
```

Create a new Heroku app in the root folder of your project, optionally specifying a name for your app.

```sh
heroku create app-name
```

Set up your Heroku app to use [this buildpack](https://github.com/OceanOracles/heroku-buildpack-nodejs-gulp-bower-sass) and the correct Node environment by running ***the following command***:

```sh
heroku config:set BUILDPACK_URL=https://github.com/OceanOracles/heroku-buildpack-nodejs-gulp-bower-sass.git NODE_ENV=production
```

Add the MongoLab addon (this step will require a credit card on file in your Heroku account)

```sh
heroku addons:add mongolab
```

Check your production environment configuration variables to make sure it has a BUILDPACK_URL, NODE_ENV, and MONGOLAB_URI

```sh
heroku config
```

If your configuration variables looked correct, push your branch onto the master branch of your **heroku** remote

```sh
git push heroku <BRANCH_NAME>:master
```

## ***Lernhow*** API Documentation

### API Authentication

**Lernhow** uses [JSON Web Tokens](http://jwt.io/) to authenticate requests to the API. When a client signs up or logs in, the client is given a web token, which is attached on every future request to the **Lernhow** API. The attached token allows the server to verify the authenticity of the client request. The token should be sent as an `'x-access-token'` header with the client request.

Here is an example **curl** request to a protected endpoint:

```sh
curl "https://lernhow.herokuapp.com/api/protected-endpoint"
  -H "x-access-token: someridiculouslylongstringthatyoushouldputhere"
```

### API Endpoints

The API currently serves three resources, mapped to URIs as follows:

- **User** -> `/api/users`
- **Guide** -> `/api/guides`
- **Step** -> `/api/steps`

### *Users*

Endpoint: `/api/users`

#### Signup a new user

HTTP request: `POST /api/users/signup`

HTTP response: a valid JSON web token and a unique *userId* of the following format:

```JSON
{
  "token": "boomshakalakausertokensupercraycrayencryption",
  "userId": "somestringthatisunique"
}
```

#### Login a user with a valid account

HTTP request: `POST /api/users/login`

***Note***: the request body must send a valid **username** and **password**

HTTP response (successful login): a valid JSON web token and a unique *userId* of the following format:

```JSON
{
  "token": "boomshakalakausertokensupercraycrayencryption",
  "userId": "somestringthatisunique"
}
```

HTTP response (error on login): a JSON error object of the following format:

```JSON
{
  "status": "404",
  "message": "Some login-related error message"
}
```

### *Guides*

Endpoint: `/api/guides`

#### Get all guides

HTTP request: `GET /api/guides/`

HTTP response: an array of JSON **Guide** objects of the following format:

```JSON
[
  {
    "_id": "sdafljk29askdjf20",
    "title": "Some Witty Title",
    "userId": "asdlfkjweraksjdfashkbf",
    "author": "SomeUsername",
    "createdAt": "Date of resource creation",
    "updatedAt": "Date of last resource update"
  },
  {
    "_id": "jklljkhkjasdfjlk18",
    "title": "Some Witty Title 2",
    "userId": "lkljkkljhkhjasdfasdf",
    "author": "SomeUsername2",
    "createdAt": "Date of resource creation",
    "updatedAt": "Date of last resource update"
  },
  "..."
]
```

#### Create a new guide

HTTP request: `POST /api/guides/`

***Note***: the request body must send a **title**, and the request header must contain a valid `'x-access-token'`.

HTTP response: a JSON representation of the newly created **Guide**:

```JSON
{
  "_id": "sdafljk29askdjf20",
  "title": "Some Witty Title",
  "userId": "asdlfkjweraksjdfashkbf",
  "author": "SomeUsername",
  "createdAt": "Date of resource creation",
  "updatedAt": "Date of last resource update"
}
```

#### Get a specific guide

HTTP request: `GET /api/guides/:guideId`

***Note***: the request header must contain a valid `'x-access-token'`.

HTTP response: a JSON representation of the requested **Guide**:

```JSON
{
  "_id": "guideIdFromRequestUri",
  "title": "Some Witty Title",
  "userId": "asdlfkjweraksjdfashkbf",
  "author": "SomeUsername",
  "createdAt": "Date of resource creation",
  "updatedAt": "Date of last resource update"
}
```

#### Edit a specific guide

HTTP request: `PUT /api/guides/:guideId`

***Note***: the request body should send the data with which to update the resource, and the request header must contain a valid `'x-access-token'` that matches the token of the resource **creator**.

HTTP response: a JSON representation of the recently edited **Guide**:

```JSON
{
  "_id": "guideIdFromRequestUri",
  "title": "Some Even Wittier Title",
  "userId": "asdlfkjweraksjdfashkbf",
  "author": "SomeUsername",
  "createdAt": "Date of resource creation",
  "updatedAt": "Date of last resource update"
}
```

#### Delete specific guide

HTTP request: `Delete /api/guides/:guideId`

***Note***: the request header must contain a valid `'x-access-token'` that matches the token of the resource **creator**.

HTTP response (if successful resource deletion): `204` status code

HTTP response (if unsuccessful resource deletion): `500` status code

#### Show a specific guide's 5 steps

HTTP request: `GET /api/guides/:guideId/steps`

***Note***: the request header must contain a valid `'x-access-token'`.

HTTP response: a JSON representation of the requested **Guide's** *5 steps*:

```JSON
[
  {
    "_id": "someStepId",
    "stepNum": "1",
    "content": "Some really smart step content",
    "userId": "asdlfkjweraksjdfashkbf",
    "guideId": "guideIdFromRequestUri",
    "createdAt": "Date of resource creation",
    "updatedAt": "Date of last resource update"
  },
  {
    "_id": "someStepId2",
    "stepNum": "2",
    "content": "Some really smart step content 2",
    "userId": "asdlfkjweraksjdfashkbf",
    "guideId": "guideIdFromRequestUri",
    "createdAt": "Date of resource creation",
    "updatedAt": "Date of last resource update"
  },
  "... 5 total steps"
]
```

### *Steps*

Endpoint: `/api/steps`

#### Create a new step

HTTP request: `POST /api/steps/`

***Note***: the request body must send **content**, and the request header must contain a valid `'x-access-token'`.

HTTP response: a JSON representation of the newly created **Step**:

```JSON
{
  "_id": "someStepId",
  "stepNum": "1",
  "content": "Some really smart step content",
  "userId": "asdlfkjweraksjdfashkbf",
  "guideId": "guideIdFromRequestUri",
  "createdAt": "Date of resource creation",
  "updatedAt": "Date of last resource update"
}
```

#### Get a specific step

HTTP request: `POST /api/steps/:stepId`

***Note***: the request header must contain a valid `'x-access-token'`.

HTTP response: a JSON representation of the requested **Step**:

```JSON
{
  "_id": "stepIdFromRequestUri",
  "title": "Some Witty Title",
  "userId": "asdlfkjweraksjdfashkbf",
  "author": "SomeUsername",
  "createdAt": "Date of resource creation",
  "updatedAt": "Date of last resource update"
}
```

#### Edit a specific step

HTTP request: `PUT /api/steps/:stepId`

***Note***: the request body should send the data with which to update the resource, and the request header must contain a valid `'x-access-token'` that matches the token of the resource **creator**.

HTTP response: a JSON representation of the recently edited **Step**:

```JSON
{
  "_id": "stepIdFromRequestUri",
  "title": "Some Witty Title Updated",
  "userId": "asdlfkjweraksjdfashkbf",
  "author": "SomeUsername",
  "createdAt": "Date of resource creation",
  "updatedAt": "Date of last resource update"
}
```

---

## Product Roadmap

The product roadmap is managed through this repository's **Issues** &mdash; [view the roadmap here](https://github.com/OceanOracles/OceanOracles/issues).

## *Lernhow* Team

  - __Product Owner__: Raghuvir Kasturi
  - __Scrum Master__: Eric Kennedy
  - __Development Team__: Clark Feusier

## Contributing

We welcome contributions, but please read our [contribution guidelines](CONTRIBUTING.md) before submitting your work.
