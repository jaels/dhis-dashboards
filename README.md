## General

I used Create React App, so you can run it with `npm start`, run tests with `npm test`.

## Should've been added/improved (but time constraints)

- Error handling to the api calls, with an alert bar.
- The filter - for some reason the selected property of the MultiSelect didn't work well when I placed there the current filters array: not visually - the radio buttons were not marked well, and it also created some error in the filters list. Also the active property in the Select option didn't help in marking the radio buttons, so I didnt use it as well. As a compromise I created the list of chosen filters in the placeholder of the select.
- An edge case that is not treated - the option to expand a card when there are no items below it due to filtering.
- Could've written some more tests, for example for the filter functionality.

  
## Assumptions and compromises

- I used localStorage for the starring, as there is no end point for updating the data.
- Generally speaking, instead of the constant filters list, it makes more sense to create a dynamic array of unique types from all the dashboard items, but as the treatment of each case could differ (text for example), I anyway need to know exactly what to expect. And also:
- There was one other dashboard item type that I saw - "messages", but there wasn't any info to display there, so I ignored it.

  
  

### Hope you like it, enjoy...