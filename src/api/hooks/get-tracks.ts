import * as Types from '../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetTracksQueryVariables = Types.Exact<{
  query: Types.GetTrackListInput;
}>;


export type GetTracksQuery = { __typename?: 'Query', getTracks: { __typename?: 'TracksOutput', count: number, tracks: Array<{ __typename?: 'Track', id?: string | null, realId: string, name: string, artist?: string | null, imageUrl?: string | null, audioUrl: string, available: boolean }> } };


export const GetTracksDocument = gql`
    query GetTracks($query: GetTrackListInput!) {
  getTracks(query: $query) {
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
 * __useGetTracksQuery__
 *
 * To run a query within a React component, call `useGetTracksQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTracksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTracksQuery({
 *   variables: {
 *      query: // value for 'query'
 *   },
 * });
 */
export function useGetTracksQuery(baseOptions: Apollo.QueryHookOptions<GetTracksQuery, GetTracksQueryVariables> & ({ variables: GetTracksQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTracksQuery, GetTracksQueryVariables>(GetTracksDocument, options);
      }
export function useGetTracksLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTracksQuery, GetTracksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTracksQuery, GetTracksQueryVariables>(GetTracksDocument, options);
        }
export function useGetTracksSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetTracksQuery, GetTracksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetTracksQuery, GetTracksQueryVariables>(GetTracksDocument, options);
        }
export type GetTracksQueryHookResult = ReturnType<typeof useGetTracksQuery>;
export type GetTracksLazyQueryHookResult = ReturnType<typeof useGetTracksLazyQuery>;
export type GetTracksSuspenseQueryHookResult = ReturnType<typeof useGetTracksSuspenseQuery>;
export type GetTracksQueryResult = Apollo.QueryResult<GetTracksQuery, GetTracksQueryVariables>;