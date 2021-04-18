# Overcloud - Cloud Cost Optimization Platform

To start the application, first install all required dependencies, and then choose to start the whole application, or
each individual component.

## Install Dependencies

To start the application, first install all `npm` dependencies.

```bash
npm run install-all
```

## Start Application

### Option 1 (Start server + client)

You can start the whole application (server + client) with the following command:

```bash
npm run dev
```

### Option 2 (Start each component)

Start the server

```bash
npm run server

# Or:
cd server && npm start
```

Start the client

```bash
npm run client

# Or:
cd client && npm start
```