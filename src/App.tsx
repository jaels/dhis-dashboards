import React, { useState, useEffect, useCallback } from 'react';
import './App.css';

import { getDashboardList, getDashboardItemDetails } from "./api/getData"
import {  DashboardListItem, FullItemInfo } from './types/apiData'

import DashboardCard from "./components/DashboardCard"

/* @ts-ignore */
import { MultiSelect, MultiSelectOption } from '@dhis2-ui/select'


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

  /* The radio buttons and the selected property in the MultiSelect didn't work well 
  and I didn't have time to go too much into that, so I improvised this, so it will be clear to work with the filter */
  const generateTextForFilterPlaceholder = () => {
    if(!currentItemFilters.length) {
      return "Filter Items: All Types"
    }
    else return `Filter Items: ${currentItemFilters.join(", ")}`
  }

  return (
    <div className="App">
      <div className="dashboards-header">
        <h4>Dashboards</h4>
        <MultiSelect
          placeholder={generateTextForFilterPlaceholder()} 
          onChange={(selected: {selected: string[]}) => handleFilterClick(selected)}
          >
          {["Visualization", "Map", "Text"].map((type, i) => (
            <MultiSelectOption value={type.toLowerCase()} label={type} key={i}/>
          ))}
        </MultiSelect>
      </div>
      <hr></hr>
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

export default React.memo(App);
