# DataGrid

https://www.figma.com/design/pMvlCYzvrNw63lD5D6JpKA/Component---Data-Card-and-Data-Table?node-id=2613-131795

## Requirements

- get data from child datagrid items
- get data from dynamically added datagrid items
- relay messages from children to parent
  - ex. delete message
- send messages to 
- receive relayed messages in parent datagrid component
- be able to select rows via checkboxes
- perform actions per row

## Notes
- may need to use the `shadow: none` option and `display:content` to get things to work

## Design

- children components exist to allow

```html
<goa-data-grid>
  <goa-data-grid-row selectable>
    <goa-data-grid-item name="first-name" value="Bob" />
    <goa-data-grid-item name="last-name" value="Smith" />
    
    <goa-data-grid-action action="delete" action-arg={id} label="Delete"></goa-data-grid-action>
    <goa-data-grid-action action="edit" action-arg={id} label="Edit"></goa-data-grid-action>
  </goa-data-grid-row>
</goa-data-grid>
````
