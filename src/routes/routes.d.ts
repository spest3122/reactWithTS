import React from 'react'

export interface ROUTE {
    path: string
    component: React.FC
    routes?: Array<ROUTE>
    needAuth?: boolean
    exact?: boolean
    name?: string
    icon?: React.FC
    redirect?: boolean
    hidden?: boolean
}
