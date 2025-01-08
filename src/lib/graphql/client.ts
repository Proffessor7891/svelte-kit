import { cacheExchange, createClient, fetchExchange } from '@urql/svelte';

export const client = createClient({
    url: 'https://rickandmortyapi.com/graphql',
    fetchOptions: {
        headers: {
            'Content-Type': 'application/json',
        },
    },
    exchanges: [cacheExchange, fetchExchange]
});
