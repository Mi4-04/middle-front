export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type AuthInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type CurrentUserOutput = {
  __typename?: 'CurrentUserOutput';
  currentUser?: Maybe<User>;
};

export type GetTracksByPlaylistInput = {
  pagination?: InputMaybe<PaginationModel>;
  playlistId?: InputMaybe<Scalars['String']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  deletePlaylist: PlaylistsOutput;
  signIn: CurrentUserOutput;
  signOut: CurrentUserOutput;
  signUp: CurrentUserOutput;
  updatePlaylist: StatusOutput;
};


export type MutationDeletePlaylistArgs = {
  id: Scalars['String']['input'];
};


export type MutationSignInArgs = {
  input: AuthInput;
};


export type MutationSignUpArgs = {
  input: AuthInput;
};


export type MutationUpdatePlaylistArgs = {
  input: UpdatePlaylistInput;
};

export type PaginationModel = {
  limit: Scalars['Int']['input'];
  offset: Scalars['Int']['input'];
};

export type Playlist = {
  __typename?: 'Playlist';
  id: Scalars['String']['output'];
  imageUrl?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
};

export type PlaylistsOutput = {
  __typename?: 'PlaylistsOutput';
  playlists: Array<Playlist>;
};

export type Query = {
  __typename?: 'Query';
  currentUser: User;
  getDefaultPlaylists: PlaylistsOutput;
  getPlaylists: PlaylistsOutput;
  getTracks: TracksOutput;
  getTracksForGuest: TracksOutput;
};


export type QueryGetPlaylistsArgs = {
  trackId?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetTracksArgs = {
  query: GetTracksByPlaylistInput;
};


export type QueryGetTracksForGuestArgs = {
  query: GetTracksByPlaylistInput;
};

export type StatusOutput = {
  __typename?: 'StatusOutput';
  status: Scalars['String']['output'];
};

export type Track = {
  __typename?: 'Track';
  artist?: Maybe<Scalars['String']['output']>;
  audioUrl: Scalars['String']['output'];
  available: Scalars['Boolean']['output'];
  id?: Maybe<Scalars['String']['output']>;
  imageUrl?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  realId: Scalars['String']['output'];
};

export type TrackInput = {
  artist?: InputMaybe<Scalars['String']['input']>;
  audioUrl: Scalars['String']['input'];
  imageUrl?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  realId: Scalars['String']['input'];
};

export type TracksOutput = {
  __typename?: 'TracksOutput';
  count: Scalars['Float']['output'];
  tracks: Array<Track>;
};

export type UpdatePlaylistInput = {
  playlistId: Scalars['String']['input'];
  track?: InputMaybe<TrackInput>;
  trackId?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  email: Scalars['String']['output'];
  id: Scalars['String']['output'];
};
