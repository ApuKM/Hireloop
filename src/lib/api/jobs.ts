export const getCompanyjobs = async(companyId: string | number, status = "active") => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/jobs?companyId=${companyId}&status=${status}`)
    return await res.json()
}