let productName = document.getElementById( "productName" );
let categoryName = document.getElementById( "categoryName" );
let descriptionName = document.getElementById( "descriptionName" );
let productPrice = document.getElementById( "productPrice" );
let searchNameInput = document.getElementById( "searchName" );
let searchCategoryInput = document.getElementById( "searchCategory" );
let addBtn = document.getElementById( "btnAdd" );
let updateBtn = document.getElementById( "btnUpdate" );
let productsArray = [];



if (JSON.parse( localStorage.getItem( "productsArray" ) ) != null)
{
  productsArray = JSON.parse( localStorage.getItem( "productsArray" ) );
    displayProducts( productsArray );
    showBtnDelete ()
  }else
{
  alert( `
    No Storage Data in LocalStorage
    Please Enter Data ...
  `)
}


function addProduct ()
{
  let product = {
    name: productName.value.toLowerCase(),
    cate: categoryName.value.toLowerCase(),
    desc: descriptionName.value,
    price: productPrice.value
  }
  productsArray.unshift( product );
  localStorage.setItem( "productsArray", JSON.stringify( productsArray ) );
  displayProducts( productsArray );
  clearInput()
  showBtnDelete()
}


function displayProducts (array)
{
  let cartona = ``;
  for ( let i = 0; i < array.length; i++)
  {
    cartona += `
    <tr>
      <td>${i + 1}</td>
      <td>${array[i].name}</td>
      <td>${array[i].cate}</td>
      <td>${array[i].desc}</td>
      <td>${array[i].price}</td>
      <td>
        <button onclick= " deleteProduct (${i}) " id="delete" class="btn btn-outline-danger">Delete</button>
        <button onclick= " showBtnUpdate (${i}) " id="update" class="btn btn-outline-info">Update</button>
      </td>
    </tr>
    `
  }

  document.getElementById( "tableBody" ).innerHTML = cartona
  
}


function deleteProduct(index)
{
  productsArray.splice( index, 1 );
  localStorage.setItem( "productsArray", JSON.stringify( productsArray ) );
  displayProducts( productsArray );
  showBtnDelete ()
}


function clearInput ()
{
  productName.value = "";
  categoryName.value = "";
  descriptionName.value = "";
  productPrice.value = "";
}



function showBtnDelete ()
{
  let deleteAllProduct = `<button onclick="deleteAll( )"class="btn btn-danger w-100 my-2" id="btnUpdate">Delete All</button>`;
  if (productsArray.length > 0)
  {
    document.getElementById( "deleteAll" ).innerHTML = deleteAllProduct
    
  } else 
  {
    document.getElementById("deleteAll").innerHTML = "deleteAllProduct"
  }

}



function deleteAll ()
{
  localStorage.removeItem( "productsArray", JSON.stringify( productsArray ) );
  productsArray = [];
  showBtnDelete()
  displayProducts( productsArray );
}



function showBtnUpdate (index)
{
  productName.value = productsArray[ index ].name;
  categoryName.value = productsArray[ index ].cate;
  descriptionName.value = productsArray[ index ].desc;
  productPrice.value = productsArray[ index ].price;
  addBtn.classList.replace( "d-block"  , "d-none" );
  updateBtn.classList.replace( "d-none", "d-block" );
  productsArray.splice(index , 1)
}



function updateProduct () 
{
  let product = {
    name: productName.value,
    cate: categoryName.value,
    desc: descriptionName.value,
    price: productPrice.value
  }
  productsArray.unshift( product );
  localStorage.setItem( "productsArray", JSON.stringify( productsArray ) );
  displayProducts( productsArray );
  addBtn.classList.replace( "d-none"  , "d-block" );
  updateBtn.classList.replace( "d-block", "d-none" );
}



function searchName(search)
{
  let newArray = [];
  for ( let i = 0; i < productsArray.length; i++)
  {
    if (productsArray[i].name.toLowerCase().includes(search.toLowerCase()))
    {
      newArray.push( productsArray[ i ] )
    }
  }
  let cartona2 = ``;
  for ( let i = 0; i < newArray.length; i++)
  {
    cartona2 += `
    <tr>
      <td>${i + 1}</td>
      <td>${newArray[i].name.replace (search.toLowerCase()  , `<span>${search.toLowerCase()}</span>`)}</td>
      <td>${newArray[i].cate}</td>
      <td>${newArray[i].desc}</td>
      <td>${newArray[i].price}</td>
      <td>
        <button onclick= " deleteProduct (${i}) " id="delete" class="btn btn-outline-danger">Delete</button>
        <button onclick= " showBtnUpdate (${i}) " id="update" class="btn btn-outline-info">Update</button>
      </td>
    </tr>
    `
  }

  document.getElementById( "tableBody" ).innerHTML = cartona2
}



function searchCategory(search)
{
  let newArray = [];
  for ( let i = 0; i < productsArray.length; i++)
  {
    if (productsArray[i].cate.toLowerCase().includes(search.toLowerCase()))
    {
      newArray.push( productsArray[ i ] )
    }
  }

  let cartona2 = ``;
  for ( let i = 0; i < newArray.length; i++)
  {
    cartona2 += `
    <tr>
      <td>${i + 1}</td>
      <td>${newArray[i].name}</td>
      <td>${newArray[i].cate.replace (search , `<span>${search}</span>`)}</td>
      <td>${newArray[i].desc}</td>
      <td>${newArray[i].price}</td>
      <td>
        <button onclick= " deleteProduct (${i}) " id="delete" class="btn btn-outline-danger">Delete</button>
        <button onclick= " showBtnUpdate (${i}) " id="update" class="btn btn-outline-info">Update</button>
      </td>
    </tr>
    `
  }

  document.getElementById( "tableBody" ).innerHTML = cartona2
}




// let x = "ahmed";

// document.getElementById( "demo" ).innerHTML = x.replace( "A", `<span>a</span>` );
// لو الحرف كابيتال والبداية بتاع الكلمة اسمول مش بيظلل الاسمول بيظلل الكابيتال بس

