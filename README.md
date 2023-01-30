# `pm2-devmon`

PM2 development environment monitor running in independent mode.

With this tool you can run more than one project in development mode in different terminal sessions, so they do not share output and do not conflict (in opposed to standard `pm2-dev`).

## Installation

```sh
yarn add pm2 pm2-devmon
```

or

```sh
npm install pm2 pm2-devmon
```

## Usage

Run application script

```sh
pm2-devmon start app.js
```

or run config script

```sh
pm2-devmon start pm2.config.js --raw
```

or run process config file

```sh
pm2-devmon start process.json --raw --env dev
```

See [examples](./examples/) for more details.

## Options

```
Options:
  -r, --raw      Raw output                           [boolean] [default: false]
  -e, --env      Environment name from env_[name]         [string] [default: ""]
  -i, --ignore   Files list to ignore watching             [array] [default: []]
  -v, --version  Show version number                                   [boolean]
  -h, --help     Show help                                             [boolean]
```
