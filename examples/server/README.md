# Simple http server with pm2-devmon and pm2

The example implements simple http server to run on `http://127.0.0.1:8000` and respond with `NODE_ENV` value.

See [scripts](./package.json) section in package.json file and [config](./pm2.config.js) file for more details.

## Installation

```sh
yarn install
```

## Development

```sh
yarn dev
```

## Production

### Start

```sh
yarn start
```

### Stop

```sh
yarn stop
```

### Restart

```sh
yarn restart
```

### Status

```sh
yarn status
```

### Log

```sh
yarn log
```
