const allCategoryButton = document.getElementById("allCategoryButton")
const menButton = document.getElementById("menButton")
const womenButton = document.getElementById("womenButton")
const kidsButton = document.getElementById("kidsButton")

const section = document.querySelector('.items-list')

const imgContainerBackground = document.querySelector('.img-container')
const badgeText = document.querySelector('#badge_text')
const clothTitle = document.querySelector('#title-cloth')
const vendor = document.querySelector('#vendor')
const discountedPrice = document.querySelector('#discounted-price')
const originalPrice = document.querySelector('#original-price')

let data = null;
async function fetchDataFromAPI() {
    const response = await fetch('https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json');
    data = await response.json()
}

window.addEventListener('load', async () => {
    if (!data) {
        await fetchDataFromAPI()
    }
    section.innerHTML = ''
    for(let index = 0; index<data.categories.length; index++) {
        printCardData(index)
    }
})

async function printCardData(index) {
    if (!data) {
        await fetchDataFromAPI()
    }
    data.categories[index].category_products.forEach( (item) => {
        const compareAtPrice = Number(item.compare_at_price);
        const price = Number(item.price);
        const discount = Math.floor(((compareAtPrice - price) / compareAtPrice) * 100);
        const itemData = `
            <div class="img-container" style="  background-image: url('${item.image}');">
                ${ item.badge_text === null ? "" : '<div id="badge_text">' + item.badge_text + '</div>' }
            </div>

            <div class="information-container">
                <p>
                    <span id="title-cloth">${item.title}</span>
                    <span>&#x2022;</span>
                    <span id="vendor">${item.vendor}</span>
                </p>
                <p style="margin-top: -5px">
                    <span id="discounted-price">Rs. ${item.price}</span>
                    <span id="original-price">Rs. ${item.compare_at_price}</span>
                    <span id="discount">${discount}% Off</span>
                </p>
            </div>

            <div class="cart-container">
                <button>Add to Cart</button>
            </div>
        ` 
        const newItem = document.createElement('div')
        newItem.classList.add('item');
        newItem.innerHTML = itemData
        section.appendChild(newItem)
    })
}

const allButtons = [allCategoryButton, menButton, womenButton, kidsButton]
let index = 0;
allButtons.forEach( (button) => {
    button.addEventListener('click', async (event) => {
        if (!data) {
            await fetchDataFromAPI()
        }
        section.innerHTML = ''
        if (event.target.id === "allCategoryButton") {
            allCategoryButton.classList.add('active')
            menButton.classList.remove('active')
            womenButton.classList.remove('active')
            kidsButton.classList.remove('active')
            for(let index = 0; index<data.categories.length; index++) {
                printCardData(index)
            }
        } else if (event.target.id === "menButton") {
            index = 0
            allCategoryButton.classList.remove('active')
            menButton.classList.add('active')
            womenButton.classList.remove('active')
            kidsButton.classList.remove('active')
            printCardData(index)

        } else if (event.target.id === "womenButton") {
            index = 1
            allCategoryButton.classList.remove('active')
            menButton.classList.remove('active')
            womenButton.classList.add('active')
            kidsButton.classList.remove('active')
            printCardData(index)
        } else if (event.target.id === "kidsButton") {
            index = 2
            allCategoryButton.classList.remove('active')
            menButton.classList.remove('active')
            womenButton.classList.remove('active')
            kidsButton.classList.add('active')
            printCardData(index)
        }
    })
})

























// womenButton.addEventListener('click', async () => {
//     const res = await fetch('https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json');
//     const data = await res.json()
//     section.innerHTML = ''
//     womenButton.classList.add('active')
//     menButton.classList.remove('active')
//     kidsButton.classList.remove('active')
//     data.categories[1].category_products.forEach(item => {
//         const discount = Math.floor((Number(item.compare_at_price) - Number(item.price)) / Number(item.compare_at_price)) * 100
//         const itemData = `
//         <div class="img-container" style="  background-image: url('${item.image}');">
//             <div id="badge_text">
//                 ${item.badge_text}
//             </div>
//         </div>
//         <div class="information-container">
//             <p>
//                 <span id="title-cloth">${item.title}</span>
//                 <span>&#x2022;</span>
//                 <span id="vendor">${item.vendor}</span>
//             </p>
//             <p style="margin-top: -5px">
//                 <span id="discounted-price">Rs. ${item.price}</span>
//                 <span id="original-price">Rs. ${item.compare_at_price}</span>
//                 <span id="discount">${discount}% Off</span>
//             </p>
//         </div>
//         <div class="cart-container">
//             <button>Add to Cart</button>
//         </div>
//         ` 
//         const newItem = document.createElement('div')
//         newItem.classList.add('item');
//         newItem.innerHTML = itemData
//         section.appendChild(newItem)
//     })
// })


// kidsButton.addEventListener('click', async () => {
//     const res = await fetch('https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json');
//     const data = await res.json()
//     section.innerHTML = ''
//     kidsButton.classList.add('active')
//     menButton.classList.remove('active')
//     womenButton.classList.remove('active')
//     data.categories[2].category_products.forEach(item => {
//         const discount = Math.floor((Number(item.compare_at_price) - Number(item.price)) / Number(item.compare_at_price)) * 100
//         const itemData = `
//         <div class="img-container" style="  background-image: url('${item.image}');">
//             <div id="badge_text">
//                 ${item.badge_text}
//             </div>
//         </div>
//         <div class="information-container">
//             <p>
//                 <span id="title-cloth">${item.title}</span>
//                 <span>&#x2022;</span>
//                 <span id="vendor">${item.vendor}</span>
//             </p>
//             <p style="margin-top: -5px">
//                 <span id="discounted-price">Rs. ${item.price}</span>
//                 <span id="original-price">Rs. ${item.compare_at_price}</span>
//                 <span id="discount">${discount}% Off</span>
//             </p>
//         </div>
//         <div class="cart-container">
//             <button>Add to Cart</button>
//         </div>
//         ` 
//         const newItem = document.createElement('div')
//         newItem.classList.add('item');
//         newItem.innerHTML = itemData
//         section.appendChild(newItem)
//     })
// })

// menButton.addEventListener('click', async () => {
//     const res = await fetch('https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json');
//     const data = await res.json()
//     section.innerHTML = ''
//     kidsButton.classList.remove('active')
//     menButton.classList.add('active')
//     womenButton.classList.remove('active')
//     data.categories[0].category_products.forEach(item => {
//         const discount = Math.floor((Number(item.compare_at_price) - Number(item.price)) / Number(item.compare_at_price)) * 100
//         const itemData = `
//         <div class="img-container" style="  background-image: url('${item.image}');">
//             <div id="badge_text">
//                 ${item.badge_text}
//             </div>
//         </div>
//         <div class="information-container">
//             <p>
//                 <span id="title-cloth">${item.title}</span>
//                 <span>&#x2022;</span>
//                 <span id="vendor">${item.vendor}</span>
//             </p>
//             <p style="margin-top: -5px">
//                 <span id="discounted-price">Rs. ${item.price}</span>
//                 <span id="original-price">Rs. ${item.compare_at_price}</span>
//                 <span id="discount">${discount}% Off</span>
//             </p>
//         </div>
//         <div class="cart-container">
//             <button>Add to Cart</button>
//         </div>
//         ` 
//         const newItem = document.createElement('div')
//         newItem.classList.add('item');
//         newItem.innerHTML = itemData
//         section.appendChild(newItem)
//     })
// })


// // const allButtons = document.querySelectorAll('button')
// const allButtons = [menButton, womenButton, kidsButton]
// allButtons.forEach(button => {
//     console.log(button)
//     button.addEventListener('click', (e) => {
//         if (e.target.id === "menButton") {
//             console.log("men clicked")
//             womenSection.style.display = "none";
//             kidsSection.style.display = "none";
//             menSection.style.display = "block";
//         } else if (e.target.id === "womenButton") {
//             console.log("wpmen clicked")
//             menSection.style.display = "none";
//             kidsSection.style.display = "none";
//             womenSection.style.display = "block";
//         } else if (e.target.id === "kidsButton") {
//             console.log("kid clicked")

//             menSection.style.display = "none";
//             womenSection.style.display = "none";
//             kidsSection.style.display = "block";
//         }

//     })
// })