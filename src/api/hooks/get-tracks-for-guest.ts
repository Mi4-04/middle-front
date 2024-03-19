import * as Types from '../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetTracksForGuestQueryVariables = Types.Exact<{
  query: Types.GetTracksByPlaylistInput;
}>;


export type GetTracksForGuestQuery = { __typename?: 'Query', getTracksForGuest: { __typename?: 'TracksOutput', count: number, tracks: Array<{ __typename?: 'Track', id?: string | null, realId: string, name: string, artist?: string | null, imageUrl?: string | null, audioUrl: string, available: boolean }> } };


export const GetTracksForGuestDocument = gql`
    query GetTracksForGuest($query: GetTracksByPlaylistInput!) {
  getTracksForGuest(query: $query) {
    tracks {
      id
      realId
      name
      artist
      imageUrl
      audioUrl
      available
    }
    count
  }
}
    `;

/**
 * __useGetTracksForGuestQuery__
 *
 * To run a query within a React component, call `useGetTracksForGuestQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTracksForGuestQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTracksForGuestQuery({
 *   variables: {
 *      query: // value for 'query'
 *   },
 * });
 */
export function useGetTracksForGuestQuery(baseOptions: Apollo.QueryHookOptions<GetTracksForGuestQuery, GetTracksForGuestQueryVariables> & ({ variables: GetTracksForGuestQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTracksForGuestQuery, GetTracksForGuestQueryVariables>(GetTracksForGuestDocument, options);
      }
export function useGetTracksForGuestLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTracksForGuestQuery, GetTracksForGuestQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTracksForGuestQuery, GetTracksForGuestQueryVariables>(GetTracksForGuestDocument, options);
        }
export function useGetTracksForGuestSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetTracksForGuestQuery, GetTracksForGuestQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetTracksForGuestQuery, GetTracksForGuestQueryVariables>(GetTracksForGuestDocument, options);
        }
export type GetTracksForGuestQueryHookResult = ReturnType<typeof useGetTracksForGuestQuery>;
export type GetTracksForGuestLazyQueryHookResult = ReturnType<typeof useGetTracksForGuestLazyQuery>;
export type GetTracksForGuestSuspenseQueryHookResult = ReturnType<typeof useGetTracksForGuestSuspenseQuery>;
export type GetTracksForGuestQueryResult = Apollo.QueryResult<GetTracksForGuestQuery, GetTracksForGuestQueryVariables>;