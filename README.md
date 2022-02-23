# Proexe Test

You can check the demo project [here](https://condescending-feynman-50f6e5.netlify.app/).

## Introduction

To install the project, run the following command:

```bash
yarn install
```

Before starting the server, make sure to have a local database configured and running.
Just launch the database with the following command:

```bash
yarn json-server --watch db.json --port 3004
```

After that, you can start the server with the following command:

```bash
yarn start
```

## Running Tests

To run tests, run the following command:

```bash
yarn test
```

You can find the tests at `src/components/__tests__` and `src/store/slices/__tests__`.

## Features

- [x] Add User
- [x] Update User
- [x] Delete User
- [x] List Users
- [x] Feedback pop-ups on each actions
- [x] Filtering by name

## What can be done to better the project?

Here are some ideas:

- [ ] Add more fields
- [ ] UI enhancement
- [ ] Introduce SWR for better fetching requests and caching
- [ ] Filtering by ID and City
- [ ] Use env vars for better environment managements
