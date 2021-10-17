export interface PAGECONFIG {
    total: number
    page: number
    size: number
    pageList: Array<number>
    scrollStop: number
    mode: number
}

export interface PAGE {
    imgLink: string
    name: string
    password: string
    role: string
    username: string
    __v: number
    _id: string
}
