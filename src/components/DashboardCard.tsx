import React, { useState, Fragment } from 'react';

import { DashboardListItem } from '../types/apiData'

/* @ts-ignore */
import { Card } from '@dhis2-ui/card'
import classnames from "classnames"

interface Props {
  itemInfo: DashboardListItem;
}

const DashboardCard: React.FC<Props> = props => {
  const { itemInfo } = props;  

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
          >
            keyboard_arrow_down
          </span>
        </div>
      </div>
    </Card>
  )
}

export default DashboardCard