# Ski Resort Map Backend

## Description

This repository contains the backend code for the Ski Resort Map application. It provides instructions for setting up the project locally and accessing the deployed backend.

## Installation

To install the required dependencies, navigate to the `Backend` directory and run:


```bash
cd Backend
yarn
```


## Usage

### Development Mode

To run the application in development mode using nodemon for automatic server restarts, use:

```bash
yarn dev
```


### Production Mode

For production deployment, first compile the TypeScript code with:

```bash
yarn compile
```



Then start the server with:

```bash
yarn start:node
```


### Prisma Types Generation

If changes are made to the Prisma schema, generate the corresponding TypeScript types with:

```bash
yarn prisma:generate
```


## Deployment

Alternatively, you can access the deployed backend at [https://ski-resort-map.onrender.com/map](https://ski-resort-map.onrender.com/map).


## Basic Technologies Used

- **TypeScript:** Utilized for better limiting and type validation.
- **Prisma:** Used as an ORM with MongoDB as the database, deployed on Atlas.
- **Environment Variables:** Environment variables are not included, but you can reference the `.example.env` file for setting them up.
- **Zod:** Employed for schema validation with static type inference.
- **Faker:** Used for generating dummy test data.
- **Future Plans:** The application plans to incorporate Passport and JWT web token for authentication.

## API Testing

You can use the provided Postman collection `MUN 6905.postman_collection.json` for testing the API.

## Contact

For any questions or issues, feel free to contact us.
