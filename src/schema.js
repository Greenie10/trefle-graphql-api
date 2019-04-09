import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLSchema,
} from 'graphql';

import fetch from 'node-fetch';

import {BASE_URL, TOKEN} from './constants';

const PlantType = new GraphQLObjectType({
  name: 'Plants',
  description: 'All about plants',
  fields: () => ({
    slug: {
      type: GraphQLString,
      description: 'Machine readable plant name',
      resolve: plants => plants.slug,
    },
    scientific_name: {
      type: GraphQLString,
      resolve: plants => plants.scientific_name,
    },
    link: {
      type: GraphQLString,
      resolve: plants => plants.link,
    },
    common_name: {
      type: GraphQLString,
      resolve: plants => plants.common_name,
    },
  }),
});

const QueryType = new GraphQLObjectType({
  name: 'Root_Query',
  description: 'Root query of all',
  fields: () => ({
    Plants: {
      type: new GraphQLList(PlantType),
      description: 'All plants',
      resolve: (root, args) =>
        fetch(`${BASE_URL}/plants/?token=${TOKEN}&page_size=100`)
          .then(response => response.json())
          .then(data => data),
    },
    Plant: {
      type: PlantType,
      description: 'One plant',
      args: {
        id: {type: GraphQLInt},
      },
      resolve: (root, args) =>
        fetch(`${BASE_URL}plants/${args.id}?token=${TOKEN}`)
          .then(response => response.json())
          .then(data => data),
    },
  }),
});

export default new GraphQLSchema({
  query: QueryType,
});
