module.exports = {
  overwrite: true,
  schema: "./api/src/schema.gql",
  generates: {
    "./toc/features/utils/graphql/typeDefs/": {
      documents: "./toc/**/*.graphql",
      preset: "client",
      plugins: ["typescript", "typescript-resolvers"],
    },
  },
};
