

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

import logo from "./logo.svg";
import { gql, useQuery } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:8000/graphql", // or your URL

});
const query = gql`
  query GetTodosWithUser {
    getTodos {
      id
      title
      completed
      user {
        name
      }
    }
  }
`;

function App() {
  const { data, loading } = useQuery(query);

  if (loading) return <h1>Loading...</h1>;

  return (
    <div className="App">
      <table>
        <tbody>
          {data.getTodos.map((todo) => (
            <tr key={todo.id}>
              <td>{todo.title}</td>
              <td>{todo?.user?.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
