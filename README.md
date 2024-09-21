# COMP-6905

In this project, we design a ski web application for skiers. This repository contains the backend, frontend applications for our project.

We have deployed our project to an online server. Please go to the URL: https://ski-resort-map.vercel.app/.

- Since we are using free tier deployment services, **please note that the backend
takes approximately 50 seconds to run from a cold state**. Thank you very
much for being so understanding!


## Prerequisites

Make sure you have the following installed on your machine:

- Node.js
- Yarn


## Getting Started

### Backend Application

1. Navigate to the `Backend` directory:

    ```bash
    cd Backend
    ```

2. Install the required packages:

    ```bash
    yarn
    ```

3. Run the development server:

    If you have nodemon:

    ```bash
    yarn dev
    ```

    If you don't have nodemon:

    ```bash
    node ./bin/www
    ```

    This will start the backend server.
### Frontend Application

1. Open a new terminal window and navigate to the `Frontend` directory:

    ```bash
    cd ../Frontend
    ```

2. Install frontend dependencies:

    ```bash
    yarn
    ```

3. Run the frontend development server:

    ```bash
    yarn dev
    ```

    This will start the frontend development server.

Now you should have both the backend and frontend servers running.

## Additional Information

- This project uses Yarn as the package manager.
- Make sure to configure any environment variables if necessary.
