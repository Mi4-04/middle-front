import * as Types from '../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetPlaylistsQueryVariables = Types.Exact<{
  trackId?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type GetPlaylistsQuery = { __typename?: 'Query', getPlaylists: { __typename?: 'PlaylistsOutput', playlists: Array<{ __typename?: 'Playlist', id: string, name: string, imageUrl?: string | null }> } };


export const GetPlaylistsDocument = gql`
    query GetPlaylists($trackId: String) {
  getPlaylists(trackId: $trackId) {
    playlists {
      id
      name
      imageUrl
    }
  }
}
    `;

/**
 * __useGetPlaylistsQuery__
 *
 * To run a query within a React component, call `useGetPlaylistsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPlaylistsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPlaylistsQuery({
 *   variables: {
 *      trackId: // value for 'trackId'
 *   },
 * });
 */
export function useGetPlaylistsQuery(baseOptions?: Apollo.QueryHookOptions<GetPlaylistsQuery, GetPlaylistsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPlaylistsQuery, GetPlaylistsQueryVariables>(GetPlaylistsDocument, options);
      }
export function useGetPlaylistsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPlaylistsQuery, GetPlaylistsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPlaylistsQuery, GetPlaylistsQueryVariables>(GetPlaylistsDocument, options);
        }
export function useGetPlaylistsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetPlaylistsQuery, GetPlaylistsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetPlaylistsQuery, GetPlaylistsQueryVariables>(GetPlaylistsDocument, options);
        }
export type GetPlaylistsQueryHookResult = ReturnType<typeof useGetPlaylistsQuery>;
export type GetPlaylistsLazyQueryHookResult = ReturnType<typeof useGetPlaylistsLazyQuery>;
export type GetPlaylistsSuspenseQueryHookResult = ReturnType<typeof useGetPlaylistsSuspenseQuery>;
export type GetPlaylistsQueryResult = Apollo.QueryResult<GetPlaylistsQuery, GetPlaylistsQueryVariables>;