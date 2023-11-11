import { render, screen } from '@testing-library/react';
import App from '../App';
import AppHeader from '../components/AppHeader'



describe('App', () => {
    it("renders correctly", () => {
        const { asFragment } = render(<App />)
          expect(asFragment()).toMatchSnapshot()   
          expect (screen.getByText("Dashboards")).toBeVisible()
          expect (screen.getByText('Filter Items: All Types')).toBeVisible()
    })
});

describe('App header', () => {
    it("renders the 2 elements", () => {
        const props = {
            handleFilterClick: jest.fn(),
            currentItemFilters: []
          }

        render(<AppHeader {...props} />); 
        
        expect (screen.getByText("Dashboards")).toBeVisible()
        expect (screen.getByText('Filter Items: All Types')).toBeVisible()
    })
})

