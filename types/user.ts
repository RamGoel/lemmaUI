export interface User {
    name: string
    email: string
    password: string
    currTokens: number
    plan: 'free' | 'proYearly' | 'proMonthly'
    extraInfo: any
}
