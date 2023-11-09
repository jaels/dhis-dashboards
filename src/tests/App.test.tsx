import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';



describe('App', () => {
    it("renders correctly", () => {
        const { asFragment } = render(<App />)
          expect(asFragment()).toMatchSnapshot()   
          expect (screen.getByText("Dashboards")).toBeVisible()
          expect (screen.getByText('Filter Items: All Types')).toBeVisible()
    })
});

