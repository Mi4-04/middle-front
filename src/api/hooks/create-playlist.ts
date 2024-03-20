import * as Types from '../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CreatePlaylistMutationVariables = Types.Exact<{
  input: Types.CreatePlaylistInput;
}>;


export type CreatePlaylistMutation = { __typename?: 'Mutation', createPlaylist: { __typename?: 'PlaylistsOutput', playlists: Array<{ __typename?: 'Playlist', id: string, name: string, imageUrl?: string | null }> } };


export const CreatePlaylistDocument = gql`
    mutation CreatePlaylist($input: CreatePlaylistInput!) {
  createPlaylist(input: $input) {
    playlists {
      id
      name
      imageUrl
    }
  }
}
    `;
export type CreatePlaylistMutationFn = Apollo.MutationFunction<CreatePlaylistMutation, CreatePlaylistMutationVariables>;

/**
 * __useCreatePlaylistMutation__
 *
 * To run a mutation, you first call `useCreatePlaylistMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePlaylistMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPlaylistMutation, { data, loading, error }] = useCreatePlaylistMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreatePlaylistMutation(baseOptions?: Apollo.MutationHookOptions<CreatePlaylistMutation, CreatePlaylistMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePlaylistMutation, CreatePlaylistMutationVariables>(CreatePlaylistDocument, options);
      }
export type CreatePlaylistMutationHookResult = ReturnType<typeof useCreatePlaylistMutation>;
export type CreatePlaylistMutationResult = Apollo.MutationResult<CreatePlaylistMutation>;
export type CreatePlaylistMutationOptions = Apollo.BaseMutationOptions<CreatePlaylistMutation, CreatePlaylistMutationVariables>;