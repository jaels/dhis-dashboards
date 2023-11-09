import DashboardCard from '../components/DashboardCard';
import { render, screen, fireEvent } from '@testing-library/react';
import { mockExpanded } from './mockData'

describe ('DashboardCard', () => {
  const props = {
    expanded: true,
    itemInfo: {
      "displayName": "Antenatal Care",
      "id": "nghVC4wtyzi",
      "starred": true
    },
    expandedDetails: mockExpanded,
    onExpandCardClick: jest.fn(),
    currentFilters: []
  }

  it("renders the innitial info correctly", () => {
     /* @ts-ignore */
     const { asFragment } = render(<DashboardCard {...props} />)
     expect(asFragment()).toMatchSnapshot()   
     expect (screen.getByText("Antenatal Care")).toBeVisible()
  })

  it("renders the dashboard items of the first card", () => {
     /* @ts-ignore */
    render(<DashboardCard {...props} />);
    expect (screen.getByText("first dashboard item text")).toBeVisible()
    expect (screen.getByText("second dashboard item text")).toBeVisible()
  })

  it("renders the expand arrow and evokes the click function", () => {
     /* @ts-ignore */
    render(<DashboardCard {...props} />);
    expect(screen.getAllByTestId('expand-arrow')).toBeTruthy();

    const expandButton = screen.getAllByTestId('expand-arrow')[0];
    fireEvent.click(expandButton)
    expect(props.onExpandCardClick).toHaveBeenCalledTimes(1)
  })
})

  