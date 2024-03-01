function Sorting(e) {
  console.log(e.target.innerText);
  const ClickedCategory = e.target.innerText;
  console.log(e.target.closest("tbody"));
  const tableBody = e.target.closest("tbody");
  let categoryItemsArray = [];
  console.log(categoryItemsArray.sort());
  for (let i = 1; i < tableBody.children.length; i++) {
    let category;
    if (ClickedCategory === "Title") {
      category = 0;
    } else if (ClickedCategory === "Category") {
      category = 1;
    } else if (ClickedCategory === "Status") {
      category = 3;
    } else if (ClickedCategory === "Date") {
      category = 2;
    }
    categoryItemsArray.push(tableBody.children[i].children[category].innerText);
  }
  console.log(categoryItemsArray.sort().reverse());
  console.log(categoryItemsArray.sort());
}
export default Sorting;
