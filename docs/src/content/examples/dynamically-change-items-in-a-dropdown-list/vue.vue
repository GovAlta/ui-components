<template>
  <div style="padding: 40px">
    <goa-form-item version="2" label="Size" requirement="optional" helptext="Choose the size to change the list below">
      <goa-dropdown version="2" id="parent-dropdown" placeholder="Select a value" name="parent" @_change="onParentChange">
        <goa-dropdown-item value="All" label="All"></goa-dropdown-item>
        <goa-dropdown-item value="Big" label="Big"></goa-dropdown-item>
        <goa-dropdown-item value="Small" label="Small"></goa-dropdown-item>
      </goa-dropdown>
    </goa-form-item>
    <goa-form-item version="2" label="Items" requirement="optional" mt="xl">
      <goa-dropdown version="2" id="child-dropdown" placeholder="Select a value" name="children" @_change="onChildChange"></goa-dropdown>
    </goa-form-item>
  </div>
</template>

<script setup lang="ts">
const childrenAll = ["Bus", "Elephant", "Key", "Pen", "Watch", "Truck"];
const childrenBig = ["Elephant", "Truck", "Bus"];
const childrenSmall = ["Key", "Pen", "Watch"];

function updateChildren(items: string[]) {
  const childDropdown = document.getElementById("child-dropdown")!;
  childDropdown.innerHTML = "";
  items.forEach((item) => {
    const dropdownItem = document.createElement("goa-dropdown-item");
    dropdownItem.setAttribute("value", item);
    dropdownItem.setAttribute("label", item);
    dropdownItem.setAttribute("mount", "reset");
    childDropdown.appendChild(dropdownItem);
  });
}

function onParentChange(e: CustomEvent) {
  const value = e.detail.value;
  if (value === "All") updateChildren(childrenAll);
  else if (value === "Big") updateChildren(childrenBig);
  else updateChildren(childrenSmall);
}

function onChildChange() {
  console.log("Item selected");
}
</script>
