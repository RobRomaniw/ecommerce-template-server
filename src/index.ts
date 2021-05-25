import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./constants";
import microConfig from "./mikro-orm.config";
import express from 'express';
import { ApolloServer } from 'apollo-server-express'; 
import { buildSchema } from 'type-graphql';
import { HelloResolver } from "./resolvers/hello";

const __PORT__ = '4000';

const main = async () => {
  const orm = await MikroORM.init(microConfig);
  await orm.getMigrator().up();

  const app = express();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver],
      validate: false
    })
  })

  apolloServer.applyMiddleware({ app });
  
  app.listen(__PORT__, () => {
    console.log(`server started on localhost:${__PORT__}`)
  })
};

main().catch((err) => {
  console.error("[MAIN ERROR:] " + err.message);
});
