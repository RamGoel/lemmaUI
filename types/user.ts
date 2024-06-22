export interface User {
    name: string
    email: string
    password: string
    currTokens: number
    plan: 'free' | 'pro'
    extraInfo: any
}
