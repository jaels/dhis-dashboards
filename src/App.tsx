import React, { useState, useEffect, useCallback } from 'react';
import './App.css';

import { getDashboardList, getDashboardItemDetails } from "./api/getData"
import {  DashboardListItem, FullItemInfo } from './types/apiData'

import DashboardCard from "./components/DashboardCard"
import AppHeader from "./components/AppHeader"


const App: React.FC<{}> = () => {
  const [dashboardList, setDashboardList] = useState<DashboardListItem[] | null>(null)
  const [expandedCardId, setExpandedCardId] = useState<string | null>(null)
  const [expandedDetailsList, setExpandedDetailsList] = useState<FullItemInfo[]>([])
  const [currentItemFilters, setCurrentItemFilters] = useState<string[]>([])

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
          setExpandedDetailsList(prevItems => [...prevItems, res]);
        })
      );
    }
  }

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

  const findExpandedDetailsById = useCallback((id: string) => {
    return expandedDetailsList.find(obj => obj.id === id);
  }, [expandedDetailsList])

  const handleFilterClick = (selected: {selected: string[]}) => {
    const itemIndex = currentItemFilters.indexOf(selected.selected[0])
    if(itemIndex > -1) {
      const newArr = currentItemFilters.filter(item => item !== selected.selected[0])
      setCurrentItemFilters(newArr)
    }
    else 
    setCurrentItemFilters(prevState => [...prevState, selected.selected[0]])
  }

  
  return (
    <div className="App">
     <AppHeader 
      handleFilterClick={(selected: {selected: string[]}) => handleFilterClick(selected)} 
      currentItemFilters={currentItemFilters}
    />
      <div className="cards-area">
        {dashboardList && dashboardList.map(item => (
          <DashboardCard
            onExpandCardClick={(id) => handleExpandCardClick(id)} 
            itemInfo={item} 
            expanded={item.id === expandedCardId} 
            expandedDetails={findExpandedDetailsById(item.id)} 
            currentFilters={currentItemFilters}
            key={item.id}/>
        ))}
      </div>
    </div>
  );
}

export default App;
