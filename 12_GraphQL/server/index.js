const express = require('express')
const {ApolloServer} = require('@apollo/server')
const { expressMiddleware } = require('@as-integrations/express5');
const bodyParser = require('body-parser')
const cors = require('cors')

const { default: axios } = require("axios");


async function startServer() {
    const app = express();
    const server = new ApolloServer({
        typeDefs: `
        type User{
        name: String!
        }
    type Todo {
        id: ID!
        title: String!
        completed: Boolean
        user: User
    }
    type Query {
        getTodos: [Todo]
        getAllUsers: [User]
        getUser(id: ID!): User


    }
`,
        resolvers: {
            Todo: {
        user: async (todo) => (await axios.get(`https://dummyjson.com/users/${todo.userId}`)).data,
      },
    Query: {
        // getTodos: () => [{ id: 1, title: "Something", completed: false }]
        getTodos: async () => (await axios.get(`https://dummyjson.com/todos`)).data.todos,
        getAllUsers: async () => (await axios.get(`https://dummyjson.com/users`)).data.users,
        getUser: async (_, { id }) => (await axios.get(`https://dummyjson.com/users/${id}`)).data
}
}
    })

    // middle wares
    app.use(bodyParser.json())
    app.use(cors())
    await server.start()

    app.use('/graphql',expressMiddleware(server))

    app.listen(8000, ()=> console.log("server is running at port 8000"))
}

startServer();