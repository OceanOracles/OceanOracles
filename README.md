# OceanOracle

> Curated bites for self-starters – 5 steps to lerning

## Table of Contents

1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
1. [Deployment](#deployment)
1. [Documentation](#documentation)
1. [Roadmap](#roadmap)
1. [Team](#team)
1. [Contributing](#contributing)

## Requirements

- Node 0.10.x
- npm 2.x.x
- MongoDB 2.6.x
- Sass 3.4.x

To install Node (bundled with npm) & MongoDB with [Homebrew](http://brew.sh/)

```sh
brew install node mongodb
```

To install Sass you will need [Ruby](https://www.ruby-lang.org/en/)

```sh
gem install sass
```


## Development

### Installing Dependencies

Bower

```sh
npm install -g bower
```

Project dependencies

```sh
npm install
bower install
```

Development server

```sh
gulp
```

## Deployment

Deploying to Heroku requires a Heroku account and the Heroku toolbelt installed - [instructions here](https://devcenter.heroku.com/articles/getting-started-with-nodejs#set-up).

Log in to your account via the Heroku CLI

```sh
heroku login
```

Create a new Heroku app in the root folder of your project, optionally specifying a name for your app.

```sh
heroku create app-name
```

Set up your Heroku app to use [this buildpack](https://github.com/OceanOracles/heroku-buildpack-nodejs-gulp-bower-sass) and the correct Node environment

```sh
heroku config:set BUILDPACK_URL=https://github.com/evenemento/heroku-buildpack-nodejs-gulp-bower-sass.git NODE_ENV=production
```

Add the MongoLab addon (this step will require a credit card on file)

```sh
heroku addons:add mongolab
```

Check your config to make sure it has a BUILDPACK_URL, NODE_ENV, and MONGOLAB_URI

```sh
heroku config
```

Push up to master to deploy

```sh
git push heroku master
```

## Documentation

API docs can be found [here](http://oceanoracles.github.io/lernhow-docs/)

## Roadmap

View the project roadmap [here](https://github.com/OceanOracles/OceanOracles/issues)

## Team

  - __Product Owner__: Raghuvir Kasturi
  - __Scrum Master__: Eric Kennedy
  - __Development Team Members__: Clark Feusier

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.