import React from 'react'
import App from './App'
import { ApolloClient,
      InMemoryCache,
       createHttpLink,
        ApolloProvider } from '@apollo/client'

const httpLink = createHttpLink({
    uri: 'http://localhost:5000'
});
 const client = new ApolloClient({
    connectToDevTools: true,
     link: httpLink,
     cache: new InMemoryCache()
 });



 export default(
     <ApolloProvider client={client}>
        <React.StrictMode>
         <App />
        </React.StrictMode>
     </ApolloProvider>
 );