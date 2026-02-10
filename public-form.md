Hours
=====
1 - Friday night
1 - Saturday at lib
1 - Saturday at art class

# Subform design

## Data

- data[]: Record<string, string>[] -> the list of items that is contained within the subform
- editIndex: number -> the index of the item that is being editted, is -1 if there nothing is being editted
- dataBuffer: {} -> a buffer for the data for one of the items to make it easy to cancel changes

## Components

- goa-subform-list
- goa-form-page

## Subform responsibities

- Needs to have it's own _continue handler where the validation will be executed
	- how will the subform be able to access the form level validations
		- one easy way to allow for the above would be to pass a top-level form reference to the
		subform when the app is first loaded...this isn't ideal, but it might be ok. A message
		could be sent to the elements when the form first performs the query on the `data-pf-item`
		, the components, all except for the subform don't have to listen for the message. This messge would
		contain a refence to the form, then 
	
- Needs to intercept all _change events and store the data in the dataBuffer

- the list will need to contain buttons that use the `action` attribute with only specific values allowed ex. edit, delete
- the `edit` action would be handled and the edit index would need to be set...that means the action-arg would also need to be set,
the same would be true for the `delete` action

- the biggest  issue is that the validation functions need to be passed into subform to allow the validation to be performed


## Solution
Maybe the subform delegates all valiation to the root form, including saving data to to the dataBuffer. if this
is the case there would have to be some indication of whether the data that is to be saved in the root
form's `data` attribute is an array or string, to allow the root form to save it properly.

This would also mean that the subform does not hold the state, so all delete/edit events would be handled
by the root form.
  - on edit the form would then move the indexed data into the dataBuffer which would auto bind to the form.
  - on a delete the r oot form would simply delete the item matching the index

## Mon 22 Dec 2025 09:16:49 AM MST

One place that needs some additional logic is when selecting an item from the subform that needs to be
editted. In this case the data at the selected index needs to be re-bound to the form, which is something
that normally only happens when the form is first loaded.

So the root form needs to handle an additional event ex. `_select` that will copy the item's data into the
dataBuffer, which then needs to rebind the `state` var with the input elements (this part is already done, just
needs to be done again)
  
