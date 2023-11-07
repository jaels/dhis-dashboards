import React, { useState, Fragment } from 'react';

import { DashboardListItem, FullItemInfo, DashboardItem } from '../types/apiData'


/* @ts-ignore */
import { Card } from '@dhis2-ui/card'
import classnames from "classnames"

interface Props {
  expanded: boolean;
  itemInfo: DashboardListItem;
  expandedDetails?: FullItemInfo | null | undefined;
  onExpandCardClick: (id: string) => void;
}

const DashboardCard: React.FC<Props> = props => {
  const { expanded, itemInfo, expandedDetails, onExpandCardClick } = props;
  
  const findItemsRelevantText = (item: DashboardItem) => {
    switch(item.type.toLowerCase()) {
      case "visualization":
        if(item.visualization)
        return item.visualization.name
        break;
      case "map":
        if(item.map)
        return item.map.name
        break;
      case "text":
        if(item.text)
        return item.text
        break;
      default: 
      return null
    }
  }
  
  const findItemsRelevantIcon = (item: DashboardItem) => {
    switch(item.type.toLowerCase()) {
      case "visualization":
        if(item.visualization)
        return "signal_cellular_alt"
        break;
      case "map":
        if(item.map)
        return "public"
        break;
      case "text":
        if(item.text)
        return "font_download"
        break;
      default: 
      return null
    }
  }

  
  return (
    <Card className="card-container">
      <div className="collapsed-card">
        <p>{itemInfo.displayName}</p>
        <div className="icons-area">
          <span 
            className={classnames("material-icons", "button-icons", "star-icon")} 
          >
            star_outline
          </span>
          <span 
            className={classnames("material-icons", "button-icons", "arrow-icon")} 
            onClick={() => onExpandCardClick(itemInfo.id)}
          >
            {expanded ? "keyboard_arrow_up" : "keyboard_arrow_down"}
          </span>
        </div>
      </div>
      {expanded && expandedDetails && (
        <div className="expanded-card">
          {expandedDetails.dashboardItems.map((item, i) => (
            <Fragment key={i}>
              {findItemsRelevantText(item) &&
              <>
              <div className="dashboard-item-info">
                <span className="material-icons">{findItemsRelevantIcon(item)}</span>
                <span className="dashboard-item-text">{findItemsRelevantText(item)}</span>
              </div>
                {i !== expandedDetails.dashboardItems.length - 1 && <hr></hr>}
                </>
              }
            </Fragment>
          ))}
        </div>
      )}
    </Card>
  )
}

export default DashboardCard