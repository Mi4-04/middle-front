export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends Record<string, unknown>> = { [K in keyof T]: T[K] }
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> }
export type MakeEmpty<T extends Record<string, unknown>, K extends keyof T> = { [_ in K]?: never }
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string }
  String: { input: string; output: string }
  Boolean: { input: boolean; output: boolean }
  Int: { input: number; output: number }
  Float: { input: number; output: number }
}

export type AuthInput = {
  email: Scalars['String']['input']
  password: Scalars['String']['input']
}

export type AuthOutput = {
  __typename?: 'AuthOutput'
  token: Scalars['String']['output']
}

export type CreatePlaylistInput = {
  name: Scalars['String']['input']
}

export type GetTrackListInput = {
  pagination?: InputMaybe<PaginationModel>
  playlistId?: InputMaybe<Scalars['String']['input']>
  search?: InputMaybe<Scalars['String']['input']>
}

export type Mutation = {
  __typename?: 'Mutation'
  createPlaylist: PlaylistsOutput
  deletePlaylist: PlaylistsOutput
  signIn: AuthOutput
  signUp: AuthOutput
  updatePlaylist: StatusOutput
}

export type MutationCreatePlaylistArgs = {
  input: CreatePlaylistInput
}

export type MutationDeletePlaylistArgs = {
  id: Scalars['String']['input']
}

export type MutationSignInArgs = {
  input: AuthInput
}

export type MutationSignUpArgs = {
  input: AuthInput
}

export type MutationUpdatePlaylistArgs = {
  input: UpdatePlaylistInput
}

export type PaginationModel = {
  limit: Scalars['Int']['input']
  offset: Scalars['Int']['input']
}

export type Playlist = {
  __typename?: 'Playlist'
  id: Scalars['String']['output']
  imageUrl?: Maybe<Scalars['String']['output']>
  name: Scalars['String']['output']
}

export type PlaylistsOutput = {
  __typename?: 'PlaylistsOutput'
  playlists: Playlist[]
}

export type Query = {
  __typename?: 'Query'
  getDefaultPlaylists: PlaylistsOutput
  getPlaylists: PlaylistsOutput
  getTracks: TracksOutput
  getTracksForGuest: TracksOutput
}

export type QueryGetPlaylistsArgs = {
  realId?: InputMaybe<Scalars['String']['input']>
}

export type QueryGetTracksArgs = {
  query: GetTrackListInput
}

export type QueryGetTracksForGuestArgs = {
  query: GetTrackListInput
}

export type StatusOutput = {
  __typename?: 'StatusOutput'
  status: Scalars['String']['output']
}

export type Track = {
  __typename?: 'Track'
  artist?: Maybe<Scalars['String']['output']>
  audioUrl: Scalars['String']['output']
  available: Scalars['Boolean']['output']
  id?: Maybe<Scalars['String']['output']>
  imageUrl?: Maybe<Scalars['String']['output']>
  name: Scalars['String']['output']
  realId: Scalars['String']['output']
}

export type TrackInput = {
  artist?: InputMaybe<Scalars['String']['input']>
  audioUrl: Scalars['String']['input']
  imageUrl?: InputMaybe<Scalars['String']['input']>
  name: Scalars['String']['input']
  realId: Scalars['String']['input']
}

export type TracksOutput = {
  __typename?: 'TracksOutput'
  count: Scalars['Float']['output']
  tracks: Track[]
}

export type UpdatePlaylistInput = {
  playlistId: Scalars['String']['input']
  track?: InputMaybe<TrackInput>
  trackId?: InputMaybe<Scalars['String']['input']>
}
