const express = require('express')
const {ApolloServer} = require('@apollo/server')
const { expressMiddleware } = require('@as-integrations/express5');
const bodyParser = require('body-parser')
const cors = require('cors')

async function startServer() {
    const app = express();
    const server = new ApolloServer({
        typeDefs: `
    type Todo {
        id: ID!
        title: String!
        completed: Boolean
    }
    type Query {
        getTodos: [Todo]
    }
`,
        resolvers:{}
    })

    // middle wares
    app.use(bodyParser.json())
    app.use(cors())
    await server.start()

    app.use('/graphql',expressMiddleware(server))

    app.listen(8000, ()=> console.log("server is running at port 8000"))
}

startServer();