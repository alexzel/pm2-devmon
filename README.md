# `pm2-devmon`

PM2 development environment monitor using independent mode.

## Installation

```sh
yarn add pm2 pm2-devmon
```

or

```sh
npm install pm2 pm2-devmon
```

## Usage

Run server scripts

```sh
pm2-devmon start server.js
```

or run process config files

```sh
pm2-devmon --raw start process.json
```

## Options

```
Options:
  -v, --version                      output the current version
  --raw                              raw log output
  --ignore [files]                   files list to ignore watching
  --env [name]                       env_[name] env variables in process file
  -h, --help                         output usage information
```
