import React  from 'react';

/* @ts-ignore */
import { MultiSelect, MultiSelectOption } from '@dhis2-ui/select'

interface Props {
  handleFilterClick: (selected: {selected: string[]}) => void
  currentItemFilters: string[]
}

const AppHeader: React.FC<Props> = props => {

  const { handleFilterClick, currentItemFilters } = props

  /* The radio buttons and the selected property in the MultiSelect didn't work well, 
  and I didn't have time to go too much into that, so I improvised this */
  const generateTextForFilterPlaceholder = () => {
    if(!currentItemFilters.length) {
      return "Filter Items: All Types"
    }
    else return `Filter Items: ${currentItemFilters.join(", ")}`
  }

  return (
    <>
      <div className="dashboards-header">
        <h4>Dashboards</h4>
        <MultiSelect
          placeholder={generateTextForFilterPlaceholder()} 
          onChange={(selected: {selected: string[]}) => handleFilterClick(selected)}
          >
          {["Visualization", "Map", "Text"].map((type, i) => (
            <MultiSelectOption value={type.toLowerCase()} label={type} key={i} />
          ))}
        </MultiSelect>
      </div>
      <hr></hr>
    </>
  )
}

export default AppHeader