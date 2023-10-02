# Restaurant Menu API

This GraphQL API provides data for a restaurant menu application.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [GraphQL Queries](#graphql-queries)
- [Testing](#testing)
- [Adding New Features](#adding-new-features)
- [Menu Data](#menu-data)

## Prerequisites

Before running the Restaurant Menu API, make sure you have the following prerequisites installed on your machine:

- [Node.js](https://nodejs.org/) (v14 or later)
- [npm](https://www.npmjs.com/) (v7 or later)

## Installation

1. Clone this repository to your local machine:

```sh
   git clone https://github.com/your-username/restaurant-menu-api.git
```

2. Navigate to the project directory:

```sh
   cd restaurant-menu-api
```

3. Install project dependencies using npm:

```sh
  npm install
```


## Running the Application

To start the Restaurant Menu API server, follow these steps:

1. Start the server by running the following command:

```sh
npm start

```

2. The server will now be running at http://localhost:3000/graphql.


## GraphQL Queries
This API uses GraphQL for querying menu data. Here are some example GraphQL queries you can use to retrieve menu data:


### Get all menu items in a category
To get all menu items in a specific category, use the getMenuItemsByCategory query:

```sh
{
  getMenuItemsByCategory(category: "appetizers") {
    name
    description
    price
  }
}
```

Replace "appetizers" with the desired category name ("entrees," "sandwiches," etc.).

### Get a all menu items
To get a all menu items, use the getAllMenuItems query:


```sh
 {
  getAllMenuItems { 
    id
    name
    description
    price, 
  }
```


### Get custom query
To get a specific menu item by specific keyword search, use the customQuery query:


```sh
{
  customQuery(search: "Chicken") {
    name
    description
    price
    category
  }
}
```



### Custom Queries and Mutations
You can add your own custom queries and mutations to the GraphQL schema as needed. Test them by sending a GraphQL query or mutation to the API.

## Testing
To run tests for the Restaurant Menu API, use the following command:

```sh
npm test
```

The test suite includes various test cases for GraphQL queries and mutations, ensuring the API functions correctly.


## Adding New Features

To expand the functionality of the API, follow these steps:

- Update the GraphQL schema in src/schema.js to include new types, queries, and mutations.

- Add test cases for your new features in the test/menu.test.js file.

- Implement the new features in your application code (e.g., add mutations for managing menu items).

- Test the new features using the npm test command.

- Update the documentation in this README file to explain the new functionality and any changes to queries or mutations.


## Menu Data
The menu data used in this API is defined in the data/menu.js file. You can modify this data to match the menu items for your restaurant.

Feel free to customize this API to meet your specific requirements and add more features as needed.