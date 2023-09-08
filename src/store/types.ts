export interface IGroup {
    id: number
    name: string,
    description: string,
    cover: string | null,
    playlist: string | null,
}

type BaseTypes = { // то что есть у все сущностей
    id: number;
    'date_create': number;
    'date_modify': number;
}

type Status = 'moderation' | 'active' | 'reject';
export interface IComment extends BaseTypes {
    author: string,
    text: string,
    status: Status,
    'song_id': number,
    'vote_count': number,
}
export interface ISong extends BaseTypes {
    name: string,
    song: string,
    composer: string | null,
    author: string | null,
    singer: string | null,
    clip: string | null,
    'cover_small': string | null,
    cover: string | null,
    description: string,
    listeningCnt: number,
    originalId: string | null,
    'original_file_url': string | null,
    groups: IGroup[],
    comments: IComment[],
}

export interface IPlayer {
    activeSong: ISong | null,
    playbackSong: ISong | null,
    playbackIndex: number,
    isPlaying: boolean,
    muted: boolean,
    duration: number,
    timer: string,
    progress: string,
    volume: number,
}

export interface State extends IPlayer {
    songs: ISong[],
    groups: IGroup[],
    playList: ISong[],
    activeGroup: IGroup | null,
    isAdmin: boolean,
    userID: string,
    page: number | null,
    allPages: number | null,
    searchRequest: string | null,
    activeTag: string | null,
    scrollPosition: number,
}
