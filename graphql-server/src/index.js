import { GraphQLServer } from 'graphql-yoga';

//Scalar types - String, Boolean, Int, Float, ID

//Demo user date

const users = [
  {
    id: '1',
    name: 'Javier',
    email: 'jmeza@mail.com',
    age: 25
  },
  {
    id: '2',
    name: 'Sarah',
    email: 'sarah@mail.com'
  },
  {
    id: '3',
    name: 'Dua',
    email: 'dua@mail.com'
  }
];
//Demo post date

const posts = [
  {
    id: '1',
    title: 'Javier',
    body: 'jmeza@mail.com',
    published: true
  },
  {
    id: '2',
    title: 'Sarah',
    body: 'sarah@mail.com',
    published: false
  },
  {
    id: '3',
    title: 'Dua',
    body: 'dua@mail.com',
    published: false
  }
];

// Type definitions(Schema)

const typeDefs = `
    type Query {
      users(query: String!):[User!]!
      posts(query: String!): [Post!]!
      me: User!
      post: Post!
    }

    type User {
      id: ID!
      name: String!
      email: String!
      age: Int
    }

    type Post {
      id: ID!
      title: String!
      body: String
      pubished: Boolean!
    }
`;

//Resolvers;
const resolvers = {
  Query: {
    posts(parent, args, ctx, info) {
      const { query } = args;
      if (!query) {
        return posts;
      }
      return posts.filter(post => {
        const isTitleMatch = post.title
          .toLowerCase()
          .includes(query.toLowerCase());

        const isBodyMatch = post.body
          .toLowerCase()
          .includes(query.toLowerCase());

        return isTitleMatch || isBodyMatch;
      });
    },
    users(paren, args, ctx, info) {
      const { query } = args;
      if (!query) {
        return users;
      }
      return users.filter(user => {
        return user.name.toLowerCase().includes(query.toLowerCase());
      });
    },
    me() {
      return { id: '1234', name: 'Javier', email: 'jmeza@mail.com', age: 12 };
    },
    post() {
      return {
        id: '9832123',
        title: 'Stranger Thinfs',
        body: '',
        pubished: true
      };
    }
  }
};

const server = new GraphQLServer({
  typeDefs,
  resolvers
});

server.start(() => {
  console.log('The server is up!');
});
