/**
 *
 * Created by a on 4/10/16.
 */

import express from 'express';
import graphQLHTTP from 'express-graphql';
import {schema} from './data/schema';

const GRAPHQL_PORT = 8080;

// Expose a GraphQL endpoint
var graphQLServer = express();
graphQLServer.use('/', graphQLHTTP({schema, pretty: true}));
graphQLServer.listen(GRAPHQL_PORT, () => console.log(
`GraphQL Server is now running on http://localhost:${GRAPHQL_PORT}`
));
