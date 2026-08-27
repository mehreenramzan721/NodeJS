import express from 'express'
import { ApolloServer } from "@apollo/server";

import { expressMiddleware } from '@as-integrations/express5';
async function init(){
//PORT = 8000
const PORT = Number(process.env.PORT) || 8000;

// Create graphql server 
const gqlserver = new ApolloServer({
    typeDefs: `
    type Mutations{
    createUser();
    }`,
    resolvers:{}
})
//start the gqlserver
await gqlserver.start();


const app = express();
app.use(express.json())
app.get('/', ( req, res)=>{
    res.json({message:"Server is up and running "})
})
app.use(
    "/graphql",
    expressMiddleware(gqlserver));

app.listen (PORT , ()=> console.log(`Server is running at port ${PORT}`))
}

init();