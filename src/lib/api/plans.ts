import { ServerFetch } from "./server"

export const getPlanById = async(id: string | undefined) => {
    return ServerFetch(`/api/plans?plan_id=${id}`)
}