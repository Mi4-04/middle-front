import * as Types from '../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetDefaultPlaylistsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetDefaultPlaylistsQuery = { __typename?: 'Query', getDefaultPlaylists: { __typename?: 'PlaylistsOutput', playlists: Array<{ __typename?: 'Playlist', id: string, name: string, imageUrl?: string | null }> } };


export const GetDefaultPlaylistsDocument = gql`
    query GetDefaultPlaylists {
  getDefaultPlaylists {
    playlists {
      id
      name
      imageUrl
    }
  }
}
    `;

/**
 * __useGetDefaultPlaylistsQuery__
 *
 * To run a query within a React component, call `useGetDefaultPlaylistsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDefaultPlaylistsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDefaultPlaylistsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetDefaultPlaylistsQuery(baseOptions?: Apollo.QueryHookOptions<GetDefaultPlaylistsQuery, GetDefaultPlaylistsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetDefaultPlaylistsQuery, GetDefaultPlaylistsQueryVariables>(GetDefaultPlaylistsDocument, options);
      }
export function useGetDefaultPlaylistsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetDefaultPlaylistsQuery, GetDefaultPlaylistsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetDefaultPlaylistsQuery, GetDefaultPlaylistsQueryVariables>(GetDefaultPlaylistsDocument, options);
        }
export function useGetDefaultPlaylistsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetDefaultPlaylistsQuery, GetDefaultPlaylistsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetDefaultPlaylistsQuery, GetDefaultPlaylistsQueryVariables>(GetDefaultPlaylistsDocument, options);
        }
export type GetDefaultPlaylistsQueryHookResult = ReturnType<typeof useGetDefaultPlaylistsQuery>;
export type GetDefaultPlaylistsLazyQueryHookResult = ReturnType<typeof useGetDefaultPlaylistsLazyQuery>;
export type GetDefaultPlaylistsSuspenseQueryHookResult = ReturnType<typeof useGetDefaultPlaylistsSuspenseQuery>;
export type GetDefaultPlaylistsQueryResult = Apollo.QueryResult<GetDefaultPlaylistsQuery, GetDefaultPlaylistsQueryVariables>;