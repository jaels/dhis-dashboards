
import { DashboardListItem, FullItemInfo} from '../types/apiData'

const baseUrl = process.env.REACT_APP_BASE_URL

export const getDashboardList = async(): Promise<DashboardListItem[]> => {
    const result = await fetch(`${baseUrl}/dashboards.json`)
    const data = await result.json()
    return data.dashboards
}

export const getDashboardItemDetails = async(id: string): Promise<FullItemInfo> => {
    const result = await fetch(`${baseUrl}/${id}.json`)
    const data = await result.json()
    return data
}

