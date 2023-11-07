import React, { useState, useEffect } from 'react';
import './App.css';

import { DashboardListItem } from './types/apiData'
import { getDashboardList, getDashboardItemDetails } from './api/getData';

import DashboardCard from "./components/DashboardCard"


const App: React.FC<{}> = () => {

  const [dashboardList, setDashboardList] = useState<DashboardListItem[] | null>(null)

  const handleFetchList = async() => {
    const res = await getDashboardList()
    if(Array.isArray(res)) {
      setDashboardList(res)
    }
  }

  const handleFetchAllDetails = async() => {
    if (dashboardList) {
      const responses = await Promise.all(
        dashboardList.map(async item => {
        const res = await getDashboardItemDetails(item.id)
        /* @ts-ignore */
        setExpandedDetailsList(prevItems => [...prevItems, res]);
        })
      );
    }
  }

  useEffect(() => {
    handleFetchList()
  }, [])

  

  return (
    <div className="App">
      <div className="cards-area">
        {dashboardList && dashboardList.map(item => (
          <DashboardCard
            itemInfo={item} 
            key={item.id}/>
        ))}
      </div>
    </div>
  );
}

export default App;
