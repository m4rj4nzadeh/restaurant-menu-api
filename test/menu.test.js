const request = require('supertest');
const express = require('express'); // Import Express
const { graphqlHTTP } = require('express-graphql');
const schema = require('../src/schema'); // Replace with the path to your GraphQL schema

const app = express();

// Set up your GraphQL route using express-graphql
app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    graphiql: false, // You can enable or disable GraphiQL based on your needs
  })
);

// Start the Express application on a port (e.g., 3000)
const server = app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
describe('GraphQL API Tests', () => {
  it('should return appetizers', async () => {
    const response = await request(app)
      .post('/graphql') // Use POST request
      .send({ query: `{
        getMenuItemsByCategory(category: "appetizers") {
          name
          description
          price
        }
      }`});

    expect(response.status).toEqual(200);
    expect(response.body.data.getMenuItemsByCategory).toHaveLength(5); // Adjust the length based on your structured menu data
    expect(response.body.data.getMenuItemsByCategory[0].name).toBe(
      "Iceberg Wedge Salad with House Cured Bacon"
    );
  });

  it('should return entrees', async () => {
    const response = await request(app)
      .post('/graphql') // Use POST request
      .send({ query: `{
        getMenuItemsByCategory(category: "entrees") {
            name
            description
            price
          }
      }` });

    expect(response.status).toEqual(200);
    expect(response.body.data.getMenuItemsByCategory).toHaveLength(4); // Adjust based on your menu data
    expect(response.body.data.getMenuItemsByCategory[0].name).toBe(
      'Farfalle Pasta with Braised Pork in Tomato Cream'
    );
  });

  it('should return sandwiches', async () => {
    const response = await request(app)
      .post('/graphql') // Use POST request
      .send({ query: `{
        getMenuItemsByCategory(category: "sandwiches-cold") {
            name
            description
            price
          }
      }` });

    expect(response.status).toEqual(200);
    expect(response.body.data.getMenuItemsByCategory).toHaveLength(4); // Adjust based on your menu data
    expect(response.body.data.getMenuItemsByCategory[0].name).toBe('Turkey & Avocado');
  });

  it('should return all menu items', async () => {
    const response = await request(app)
      .post('/graphql') // Use POST request
      .send({ query: '{ getAllMenuItems { name } }' });

    expect(response.status).toEqual(200);
    expect(response.body.data.getAllMenuItems).toHaveLength(41);
  });

  it('should test a custom query or mutation', async () => {
    // Example: Testing a custom query
    const response = await request(app)
      .post('/graphql') // Use POST request
      .send({ query: `{
        customQuery(search: "Chicken") {
          name
          description
          price
          category
        }
      }` });

    expect(response.status).toEqual(200);
  });
});
