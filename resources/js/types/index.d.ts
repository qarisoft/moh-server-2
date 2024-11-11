export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
};


export type Project = {
    id: number
    name: string
    is_active: boolean
    description: string
    created_at: string
    updated_at: string
}


type Paginate<T> = {
    data: T[]
}
// type  A = {
//     id: number
//     floor: number
//
//     apartments: number
// }
type PFormType = {
    name: string
    description: string
    items: A[]
}

type F = {
    id: number
    number: number
    apartments: Ap[]
}
type Ap = {

    id: number,
    floor_id: number,
    is_booked: number,
    is_soled: number,
    info: string,
    number: number,
    rooms: number,
    rent_price: number,
    sell_price: number,
    created_at: string,
    updated_at: string,
    laravel_through_key: number

}
type P = Project & {

    floors: F[]

    media: Media[]
}

type Customer = {
    id: number,
    name: string,
    address: string,
    phone: string,
    created_at: string,
    updated_at: string
}
type Media = {
    id: number
    preview_url: string
    original_url: string
}

type  A = {
    id: number
    floor: number
    apartments: number
}

