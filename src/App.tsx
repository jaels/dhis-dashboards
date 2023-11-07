import React, { useState, useEffect } from 'react';
import './App.css';

import { getDashboardList, getDashboardItemDetails } from "./api/getData"
import {  DashboardListItem, FullItemInfo } from './types/apiData'

import DashboardCard from "./components/DashboardCard"


const App: React.FC<{}> = () => {

  const [dashboardList, setDashboardList] = useState<DashboardListItem[] | null>(null)
  const [expandedCardId, setExpandedCardId] = useState<string | null>(null)
  const [expandedDetailsList, setExpandedDetailsList] = useState<FullItemInfo[]>([])


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
    console.log(expandedDetailsList)
  }, [expandedDetailsList])


  useEffect(() => {
    handleFetchList()
  }, [])

  useEffect(() => {
    if(dashboardList) {
      setExpandedCardId(dashboardList[0].id)
      handleFetchAllDetails()
    }
  }, [dashboardList])

  const handleExpandCardClick = (id: string) => {
    if (id !== expandedCardId) {
      setExpandedCardId(id)
    }
    else setExpandedCardId(null)
  }

  const findExpandedDetailsById = (id: string) => {
    return expandedDetailsList.find(obj => obj.id === id);
  }


  return (
    <div className="App">
      <div className="dashboards-header">
        <h4>Dashboards</h4>
      </div>
      <hr></hr>
      <div className="cards-area">
        {dashboardList && dashboardList.map(item => (
          <DashboardCard
            onExpandCardClick={(id) => handleExpandCardClick(id)} 
            itemInfo={item} 
            expanded={item.id === expandedCardId} 
            expandedDetails={findExpandedDetailsById(item.id)} 
            key={item.id}/>
        ))}
      </div>
    </div>
  );
}

export default App;
