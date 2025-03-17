import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
    //schema: process.env.NEXT_PUBLIC_GRAPHQL_API_URL,
    schema: "http://host.docker.internal:12000/graphql",
    documents: ["pages/**/*.tsx", "pages/**/*.tsx"],
    generates: {
        "./__generated__/": {
            preset: "client"
        }
    }
}

export default config;