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
<data-grid>
  <data-grid-item>
    <data-grid-value name="first-name" value="Bob" />
    <data-grid-value name="last-name" value="Smith" />
    <data-grid-actions>
      <goa-button action="delete">Delete</goa-button>
      <goa-button action="edit">Edit</goa-button>
    </data-grid-actions>

  </data-grid-item>
</data-grid>
````
