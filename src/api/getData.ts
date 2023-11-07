
import { DashboardListItem, FullItemInfo} from '../types/apiData'

const baseUrl = process.env.REACT_APP_BASE_URL

export const getDashboardList = async(): Promise<DashboardListItem[] | string> => {
  try {
    const result = await fetch(`${baseUrl}/dashboards.json`)
    const data = await result.json()
    // console.log(data)
    return data.dashboards
  } 
  catch(err) {
    console.log(err)
    return 'error'
  }
}

export const getDashboardItemDetails = async(id: string): Promise<FullItemInfo | string> => {
  try {
    const result = await fetch(`${baseUrl}/${id}.json`)
    const data = await result.json()
    // console.log({data})
    return data
  } 
  catch(err) {
    console.log(err)
    return 'error'
  }
}

