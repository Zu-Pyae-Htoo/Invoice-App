//Select
const app = document.querySelector("#app");
const recordForm = app.querySelector("#addRecordForm");
const productSelect = document.querySelector("#productSelect");
const quantityInput = document.querySelector("#quantityInput");
const recordGroup = document.querySelector("#recordGroup");
const recordTotal = document.querySelector("#recordTotal");
const printBtn = document.querySelector("#printBtn");

//Data

const products = [
  {
    id: 1,
    name: "Apple",
    price: 500,
  },
  {
    id: 2,
    name: "Mango",
    price: 1500,
  },
  {
    id: 3,
    name: "Banana",
    price: 300,
  },
  {
    id: 4,
    name: "Orange",
    price: 400,
  },
  {
    id: 5,
    name: "Lime",
    price: 600,
  },
];

//function

// 1
// const productOption = (id, name) => {
//   const option = document.createElement("option");
//   option.value = id;
//   option.innerText = name;
//   return option;
// };

//1 new way
// new Option() constructure သုံးပြီး option create

// 2
// Normal
// =======
// const productRender = () => {
//     products.forEach(product => {
//        productSelect.append(productOption(product.id,product.name))
//     })
// }

// const productRender = (items) => {
//     items.forEach(({ id, name }) => {
//     productSelect.append(productOption(id, name));
//     });
//   };

// 2  new way
//  Destructure
// ================

const productRender = (items) => {
  items.forEach(({ id, name }) => {
    productSelect.append(new Option(name, id));
  });
};

//4
const recordUI = (id, productName, price, quantity) => {
  const cost = price * quantity;
  const tr = document.createElement("tr");
  tr.setAttribute("product-id", id);

  tr.className =
    "odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 group relative ";
  tr.innerHTML = `
    <td class="px-6 py-4 text-left td-counter" ></td>
    <th
      scope="row"
      class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
    >
     ${productName}
    </th>

    <td class="px-6 py-4 record-price">${price}</td>
    <td class="px-6 py-4  text-sm">
      <button class="sub-q bg-blue-100 rounded-md p-1 pointer-events-none group-hover:pointer-events-auto -translate-x-2 group-hover:translate-x-0 duration-200 opacity-0 group-hover:opacity-100 active:scale-75">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 stroke-blue-600 pointer-events-none ">
        <path stroke-linecap="round" stroke-linejoin="round" d="M18 12H6" />
        </svg>
      </button>
      <span class=" w-5 inline-block text-center record-q">${quantity}</span>
      <button class="add-q bg-blue-100 rounded-md p-1 pointer-events-none group-hover:pointer-events-auto translate-x-2 group-hover:translate-x-0 duration-200 opacity-0 group-hover:opacity-100 active:scale-75">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 stroke-blue-600 pointer-events-none ">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m6-6H6" />
        </svg>     
      </button>

    </td>

    <td class="px-6 py-4  relative">
      <span class="record-cost">${cost}</span>
      <button class="record-del bg-gray-200 rounded-md absolute right-2 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 duration-200 p-1  active:scale-75 pointer-events-auto">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 stroke-1 stroke-red-800 pointer-events-none">
      <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
    </svg>
    
      </button>
    </td>
    `;
  return tr;
};

//5

const calRecordTotal = () => {
  // let total = 0;
  // const costs = app.querySelectorAll(".record-cost");
  // costs.forEach((el) => (total += parseFloat(el.innerText)));

  const total = [...document.querySelectorAll(".record-cost")].reduce(
    (pv, cv) => pv + parseFloat(cv.innerText),
    0
  );
  recordTotal.innerText = total;
  return total;
};

//Inintial Render

productRender(products);

//Handler
//3
const recordFormHandler = (event) => {
  event.preventDefault();
  // idကနေ => product(objအခန်း)ရှာ => price,name
  let currentProduct = products.find(
    (product) => product.id == productSelect.value
  );

  // console.log(productSelect.value);
  // console.log(currentProduct.name);
  // console.log(quantityInput.valueAsNumber);
  const isExistProduct = app.querySelector(
    `[product-id='${currentProduct.id}']`
  );

  if (isExistProduct) {
    const currentRow = event.target.closest("tr");
    const currentRowQ = isExistProduct.querySelector(".record-q");
    const currentRowCost = isExistProduct.querySelector(".record-cost");
    const currentRowPrice = isExistProduct.querySelector(".record-price");

    currentRowQ.innerText = parseInt(currentRowQ.innerText) + quantityInput.valueAsNumber;
    currentRowCost.innerText =
      currentRowPrice.innerText * currentRowQ.innerText;
    calRecordTotal();

      calRecordTotal();
  } else {
    recordGroup.append(
      recordUI(
        currentProduct.id,
        currentProduct.name,
        currentProduct.price,
        quantityInput.valueAsNumber
      )
    );
    calRecordTotal();
  }

  recordForm.reset();
};

const pressEnter = (event) => {
  if (event.key == "Enter") {
    recordFormHandler();
  }
};

//6  => ပြန်ကြည့်ရန်
// event deligation closet တနီးဆုံးparent ရှာ
const recordGroupHandler = (event) => {
  // console.log(event.target);
  // const x = event.target.classListcontains("record-del");
  //   console.log(x);
  if (event.target.classList.contains("record-del")) {
    console.log(event.target.closest("tr").remove());
    calRecordTotal();
  } else if (event.target.classList.contains("add-q")) {
    // console.log(event.target);
    const currentRow = event.target.closest("tr");
    const currentRowQ = currentRow.querySelector(".record-q");
    const currentRowCost = currentRow.querySelector(".record-cost");
    const currentRowPrice = currentRow.querySelector(".record-price");

    currentRowQ.innerText = parseInt(currentRowQ.innerText) + 1;
    currentRowCost.innerText =
      currentRowPrice.innerText * currentRowQ.innerText;
    calRecordTotal();
  } else if (event.target.classList.contains("sub-q")) {
    // console.log(event.target);
    const currentRow = event.target.closest("tr");
    const currentRowQ = currentRow.querySelector(".record-q");
    const currentRowCost = currentRow.querySelector(".record-cost");
    const currentRowPrice = currentRow.querySelector(".record-price");

    if (currentRowQ.innerText > 0) {
      currentRowQ.innerText = parseInt(currentRowQ.innerText) - 1;
      currentRowCost.innerText =
        currentRowPrice.innerText * currentRowQ.innerText;
      calRecordTotal();
    }
  }
};

//7
const printBtnHandler = () => {
  print();
};

//Listener

recordForm.addEventListener("submit", recordFormHandler);
recordGroup.addEventListener("click", recordGroupHandler);
printBtn.addEventListener("click", printBtnHandler);

// =================================================================

// // selector
// const recordForm = document.querySelector("#addRecordForm");
// const productSelect = document.querySelector("#productSelect");
// const quantityInput = document.querySelector("#quantityInput");
// const recordGroup = document.querySelector("#recordGroup");
// // data

// const products = [
//   {
//     id: 1,
//     name: "Apple",
//     price: 500,
//   },
//   {
//     id: 2,
//     name: "orange",
//     price: 500,
//   },
//   {
//     id: 3,
//     name: "banana",
//     price: 500,
//   },
//   {
//     id: 4,
//     name: "mango",
//     price: 500,
//   },
//   {
//     id: 5,
//     name: "lime",
//     price: 500,
//   },
// ];

// // function
// // const productOption = (id,name) => {
// //     const option = document.createElement("option");
// //     option.value = id;
// //     option.innerText = name;
// //     return option;
// // }

// const productRender = (items) => {
//   items.forEach(({ id, name }) => {
//     productSelect.append(new Option(name, id));
//   });
// };

// const createRecord = (productName,price,quantity) => {
//     const cost = price*quantity;
//   const tr = document.createElement("tr");
//   tr.classList.add("record");
//   tr.innerHTML = `
//     <td class="px-6 py-4 text-left">1</td>
//      <th
//            scope="row"
//            class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
//          >
//           ${productName}
//      </th>
//      <td class="px-6 py-4 text-end">${price}</td>
//      <td class="px-6 py-4 text-end">${quantity}</td>
//      <td class="px-6 py-4 text-end">${cost}</td>
//     `;
// };

// // initial render
// productRender(products);

// //handler

// const recordFormHandler = (event) => {
//   event.preventDefault();
//   const currentProduct = products.find(
//     (product) => product.id == productSelect.value
//   );
//   // console.log(productSelect.value);
//   // console.log(currentProduct);
//   // console.log(quantityInput.valueAsNumber);
// };
// //listenr

// recordForm.addEventListener("submit", recordFormHandler);
