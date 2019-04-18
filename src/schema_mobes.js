import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLFloat,
  GraphQLSchema,
  GraphQLBoolean,
} from 'graphql';

import fetch from 'node-fetch';

import {BASE_URL, TOKEN} from './constants';

const PlantType = new GraphQLObjectType({
  name: 'Plants',
  description: 'All about plants',
  fields: () => ({
    common_name: {
      type: GraphQLString,
      resolve: plants => plants.common_name,
    },
    complete_data: {
      type: GraphQLBoolean,
      resolve: plants => plants.complete_data,
    },
    family_common_name: {
      type: GraphQLString,
      resolve: plants => plants.family_common_name,
    },
    flower_color: {
      type: GraphQLString,
      resolve: plants => plants.flower_color,
    },
    id: {
      type: GraphQLInt,
      resolve: plants => plants.id,
    },
    link: {
      type: GraphQLString,
      resolve: plants => plants.link,
    },
    native_status: {
      type: GraphQLString,
      resolve: plants => plants.native_status,
    },
    propagated_by_bulbs: {
      type: GraphQLBoolean,
      resolve: plants => plants.propagated_by_bulbs,
    },
    seedling_vigor: {
      type: GraphQLString,
      resolve: plants => plants.seedling_vigor,
    },
    scientific_name: {
      type: GraphQLString,
      resolve: plants => plants.scientific_name,
    },
    slug: {
      type: GraphQLString,
      description: 'Machine readable plant name',
      resolve: plants => plants.slug,
    },
    temperature_minimum_deg_f: {
      type: GraphQLFloat,
      resolve: plants => plants.temperature_minimum_deg_f,
    },
    growth_form: {
      type: GraphQLString,
      resolve: plants => plants.growth_form,
    },
  }),
});

//new file
class Species {
  constructor(){
    // this.params = params;
    this.fetchUrl = 
  }

  fetchUrl(params){
    return `${BASE_URL}species/${params}?token=${TOKEN}`
  }

  async getList(){
    return await fetch(this.fetchUrl()).then(response => response.json()) // list of plants
  }

  getOne(id){
return fetch(this.fetchUrl(id)).then(response => response.json())
  }
}
// end new file

const QueryType = new GraphQLObjectType({


  name: 'Root_Query',
  description: 'Root query of all',
  fields: () => ({
    Plants: {
      type: new GraphQLList(PlantType),
      description: 'All plants',
      resolve: (root, args) =>
        console.log(
          'Plants',
          `${BASE_URL}/species/?token=${TOKEN}&page_size=10`,
        ) ||
        new Species().getList()
        fetch(`${BASE_URL}/species/?token=${TOKEN}&page_size=5`)
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
        console.log('Plant', `${BASE_URL}species/${args.id}?token=${TOKEN}`) ||
        new Species().getOne(args.id)
        fetch(`${BASE_URL}species/${args.id}?token=${TOKEN}`)
          .then(response => response.json())
          .then(data => data),
    },
  }),
});

export default new GraphQLSchema({
  query: QueryType,
});
