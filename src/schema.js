const structuredMenu = require('../data/menu');

// Use structuredMenu in your GraphQL schema

const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLList,
  GraphQLString,
  GraphQLFloat,
  GraphQLNonNull,
  GraphQLID,
} = require('graphql');



// Define GraphQL types and queries
const MenuItemType = new GraphQLObjectType({
  name: 'MenuItem',
  fields: {
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    price: { type: GraphQLFloat },
    category: { type: GraphQLString },
  },
});

const CustomQueryResultType = new GraphQLObjectType({
  name: 'CustomQueryResult',
  fields: {
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    price: { type: GraphQLFloat },
    category: { type: GraphQLString },
  },
});


const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    getMenuItemsByCategory: {
      type: new GraphQLList(MenuItemType),
      args: {
        category: { type: GraphQLString },
      },
      resolve(parent, args) {
        const category = args.category;
        const menuItems = structuredMenu[category] || [];
        return menuItems.map(item => ({
          name: item.name,
          description: item.description,
          price: item.price,
        }));
      },
    },
    getAllMenuItems: {
      type: new GraphQLList(MenuItemType),
      resolve() {
        // Fetch all menu items from menuItems and include category
        const allMenuItems = [];
        for (const category in structuredMenu) {
          if (Array.isArray(structuredMenu[category])) {
            structuredMenu[category].forEach((menuItem) => {
              allMenuItems.push({ ...menuItem, category });
            });
          }
        }
        return allMenuItems;
      },
    },
    customQuery: {
      type: new GraphQLList(CustomQueryResultType), // Use a list type since multiple items may match the query
      args: {
        // Define input arguments for the custom query
        search: { type: new GraphQLNonNull(GraphQLString) }, // Requires a non-null string input
      },
      resolve: (parent, args) => {
        // Implement your custom query logic here
        const searchQuery = args.search.toLowerCase(); // Convert the search query to lowercase for case-insensitive matching
        const matchingItems = [];

        // Iterate through menu items and filter by name or description
        for (const category in structuredMenu) {
          if (Array.isArray(structuredMenu[category])) {
            structuredMenu[category].forEach((menuItem) => {
              if (
                menuItem.name.toLowerCase().includes(searchQuery) ||
                menuItem.description.toLowerCase().includes(searchQuery)
              ) {
                matchingItems.push({ ...menuItem, category });
              }
            });
          }
        }

        return matchingItems;
      },
    }
      
  },
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    dummyMutation: {
      type: GraphQLString,
      resolve: () => 'This is a placeholder mutation.',
    },
  },
});


const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});

module.exports = schema;
