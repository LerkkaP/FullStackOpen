export interface Diary {
    id: 1,
    date: string,
    weather: string,
    visibility: string
    comment: string
}

export type NewDiary = Omit<Diary, 'id'>
