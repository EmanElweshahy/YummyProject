/// <reference types="../@types/jquery" />

// const menuBar=document.getElementById("Open-Close");
// const HiddenNav=document.getElementById("Hidden-nav");
// const SearchSection= document.getElementById("SearchSection");
// const CategoriesSection= document.getElementById("CategoriesSection");
// const AreaSection= document.getElementById("AreaSection");
// const IngredientsSection= document.getElementById("IngredientsSection");
// const ContactUsSection= document.getElementById("ContactUsSection");
const rowData=document.getElementById("rowData");

//------------------------------------------------------------
$(function (){
    mainData().then(function(){
        $('.loading').fadeOut(2000)

    })
})

//------------------------------------------------------------

// menuBar.addEventListener('click',function(e){
//     if(this.className == 'fa-solid fs-2 fa-bars'){
//         openFun();
//     }
//     else{
//         closeFun();
//     }
// })

$('#Open-Close').on('click',function(e){
    if(this.className == 'fa-solid fs-2 fa-bars'){
        openFun();
    }
    else
    {
        closeFun();
    }
})

function openFun(){
    // menuBar.classList.remove('fa-bars')
    $('#Open-Close').removeClass('fa-bars')

    // menuBar.classList.add('fa-x')
    $('#Open-Close').addClass('fa-x')

    // HiddenNav.classList.remove('d-none')
    $('#Hidden-nav').removeClass('d-none')


}
function closeFun(){
    // menuBar.classList.remove('fa-x')
    $('#Open-Close').removeClass('fa-x')

    // menuBar.classList.add('fa-bars')
    $('#Open-Close').addClass('fa-bars')

    // HiddenNav.classList.add('d-none')
    $('#Hidden-nav').addClass('d-none')
    // console.log("hiiClose")
}

//-------------------------DisplayData------------------------------------
async function mainData(){
    let https = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`)
    let response = await https.json();
    rowData.innerHTML=""
    let cartona="";
    for (let i = 0; i <response.meals.length; i++) {
        cartona+=`
        <div onclick=" getMealsDetails(${response.meals[i].idMeal})" class="meal col-md-3 position-relative overflow-hidden rounded-3 ">
        <div>
            <img class="w-100" src="${response.meals[i].strMealThumb}" >
        </div>
        <div class="MealLayer position-absolute d-flex justify-content-center align-items-center">
            <h3>${response.meals[i].strMeal}</h3>
        </div>
    </div>
        `
    }
    rowData.innerHTML = cartona;


}

function Display(x){
    let cartona=""
    rowData.innerHTML = ""
    for (let i = 0; i < x.meals.length; i++) {
        cartona+=`
        <div onclick=" getMealsDetails(${x.meals[i].idMeal})" class="meal col-md-3 position-relative overflow-hidden rounded-3 ">
                <div>
                    <img class="w-100" src="${x.meals[i].strMealThumb}" >
                </div>
                <div class="MealLayer position-absolute d-flex justify-content-center align-items-center">
                    <h3>${x.meals[i].strMeal}</h3>
                </div>
            </div>
        
        `
    }
    rowData.innerHTML=cartona
}
//-------------------------Categories------------------------------------
async function getCategories() {
    closeFun();
    let https = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
    let response = await https.json();
    let x = response.categories;
    // console.log(x)

    rowData.innerHTML=" ";
    let cartona="";
    for (let i = 0; i < x.length; i++) {
        cartona+=`
            <div onclick="getCategoryMeals('${x[i].strCategory}')" class="meal col-md-3 position-relative overflow-hidden rounded-3 ">
                <div>
                    <img class="w-100" src="${x[i].strCategoryThumb}" >
                </div>
                <div class="MealLayer position-absolute text-center p-3 ">
                    <h3>${x[i].strCategory}</h3>
                    <p>${x[i].strCategoryDescription.split(" ").slice(0,20).join(" ")}</p>
                </div>
            </div>

        `
    }
    rowData.innerHTML = cartona;

}

async function getCategoryMeals(Categ){

    let https = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${Categ}`);
    let response = await https.json();
    // console.log(response.meals)
    Display(response);

}
//-------------------------Details---------------------------------------
async function getMealsDetails(theID){
    let https = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${theID}`);
    let response = await https.json();
    // response.meals = array of one {}
    // console.log(response.meals[0].strTags)
    let tags=response.meals[0].strTags?.split(",");
    if (tags == null) {tags = []}
    let Tag='';
    for (let i = 0; i <tags.length; i++) {
        Tag+=`
            <li class="alert alert-danger m-2 p-1">${tags[i]} </li>
        `
    }
    // console.log(Tag)

    let ingredients = '';
    for (let i = 1 ; i <20; i++) {
        if(response.meals[0][`strIngredient${i}`]){
            ingredients+=`<li class="alert alert-info m-2 p-1">${response.meals[0][`strMeasure${i}`]} ${response.meals[0][`strIngredient${i}`]}</li>`
        }
    }

    let cartona=""
    rowData.innerHTML = ""
    for (let i = 0; i < response.meals.length; i++) {
        cartona+=`
            <div class="col-md-4 ">
                <div class="d-flex flex-column text-white">
                    <img class="w-100 rounded-3" src="${response.meals[i].strMealThumb}" >
                    <h3>${response.meals[i].strMeal}</h3>
                </div>
            </div>
            <div class="col-md-8">
                <div class=" text-white ">
                    <h3>Instructions</h3>
                    <p>${response.meals[i].strInstructions}</p>
                    <h3>Area : ${response.meals[i].strArea}</h3>
                    <h3>Category  : ${response.meals[i].strCategory}</h3>
                    <h3>Recipes  : </h3>
                    <ul class="list-unstyled d-flex g-3 flex-wrap">
                        ${ingredients}
                    </ul>
                    <h3>Tags :</h3>
                        <ul class="list-unstyled d-flex g-3 flex-wrap">
                            ${Tag}
                        </ul>
                    <a class="btn btn-danger" href="${response.meals[i].strYoutube}"> YouTube </a>
                    <a class="btn btn-success" href="${response.meals[i].strSource}">Source</a>
                </div>
    </div>
        `
    }
    rowData.innerHTML = cartona;

}
//-------------------------Area-----------------------------------------
async function getArea(){
    closeFun(); 
    let https = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
    let response=await https.json()
    // console.log(response)

    rowData.innerHTML=" ";
    let cartona= "";
    for (let i = 0; i < response.meals.length; i++) {
        cartona+=`
        <div class="col-md-3">
            <div onclick="getMealsByArea('${response.meals[i].strArea}')" class="meal rounded-2 text-center text-white" style= "font-size:50px">
                    <i class="fa-solid fa-house-laptop fs-1 "></i>
                    <h3>${response.meals[i].strArea}</h3>
            </div>
        </div>
        
        `
    }
    rowData.innerHTML = cartona

}

async function getMealsByArea(Area){
    let https = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${Area}`)
    let response = await https.json();
    Display(response);

}
//-------------------------Ingredients-----------------------------------
async function getIngredients(){
    closeFun();
    let https = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
    let response = await https.json()
    // console.log(response)

    rowData.innerHTML=" ";
    let cartona= "";
    for (let i = 0; i < 20; i++) {
        cartona+=`
        <div class="col-md-3">
            <div onclick="getMealsByIngredients('${response.meals[i].strIngredient}')" class="rounded-2 text-center text-white fs-6 meal">
                <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                <h3>${response.meals[i].strIngredient}</h3>
                <p>${response.meals[i].strDescription.split(" ").slice(0,20).join(" ")}</p>

            </div>
        </div>
        
        `
    }
    rowData.innerHTML = cartona

}

async function getMealsByIngredients(Ingredient){
    let https = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${Ingredient}`)
    let response = await https.json();
    
    Display(response);
}
//--------------------------Validation-----------------------------------
function formInputs(){
    closeFun();
    rowData.innerHTML= `
        <div class=" w-50 m-auto text-center">
            <div class="row g-4 py-5">
                <div class="col-12">
                    <input id="nameInput" class="form-control" type="text" placeholder="Enter Your Name" >
                    <div id="nameRoles" class="w-100 py-2 my-2 alert alert-danger d-none"></div>
                </div>
                <div class="col-12">
                    <input id="mailInput" class="form-control" type="text" placeholder="Enter Your Mail" >
                    <div id="mailRoles" class="w-100 py-2 my-2 alert alert-danger d-none"></div>
                </div>
                <div class="col-12">
                    <input id="phoneInput" class="form-control" type="text" placeholder="Enter Your Phone" >
                    <div id="phoneRoles" class="w-100 py-2 my-2 alert alert-danger d-none"></div>
                </div>
                <div class="col-12">
                    <input id="ageInput" class="form-control" type="text" placeholder="Enter Your Age" >
                    <div id="ageRoles" class="w-100 py-2 my-2 alert alert-danger d-none"></div>
                </div>
                <div class="col-12">
                    <input id="passInput" class="form-control" type="password" placeholder="Enter Your Password" >
                    <div id="passRoles" class="w-100 py-2 my-2 alert alert-danger d-none"></div>

                </div>
                <div class="col-12">
                    <input id="repassInput" class="form-control" type="password" placeholder="Repassword" >
                    <div id="repassRoles" class="w-100 py-2 my-2 alert alert-danger d-none"></div>

                </div>
            </div>
            <button id="submitBtn" class="btn btn-outline-danger px-2 mt-3">Submit</button>
        </div>
    
    `
    document.getElementById("nameInput").addEventListener('blur',function(){
        nameValidation();
    })
    document.getElementById("mailInput").addEventListener('blur',function(){
        mailValidation();
    })
    document.getElementById("phoneInput").addEventListener('blur',function(){
        phoneValidation();
    })
    document.getElementById("ageInput").addEventListener('blur',function(){
        ageValidation();
    })
    document.getElementById("passInput").addEventListener('blur',function(){
        passValidation();
    })
    document.getElementById("repassInput").addEventListener('blur',function(){
        repasswordValidation();
    })

    // ValidationFunc();
}
// function ValidationFunc(){
//     if(nameValidation() && mailValidation() && phoneValidation() && ageValidation() && passValidation() && repasswordValidation()){
//         submitBtn.removeAttribute("disabled");
//         return false
//     }
//     else{
//         submitBtn.setAttribute("disabled", true);
//         return true
//     }
// }

function nameValidation(){
    let Name = document.getElementById("nameInput").value;
    let Roles = document.getElementById("nameRoles");
    let RegxName = /^[a-zA-Z ]+$/;
    if (Name == "") {
        Roles.classList.remove("d-none")
        Roles.innerHTML = "* Please add your Name";
        return false;
    }
    else if(Name.length < 3){
        Roles.classList.remove("d-none")
        Roles.innerHTML = "* Please add your Name more than  chars";
        return false;
    }
    else if(!RegxName.test(Name)){
        Roles.classList.remove("d-none")
        Roles.innerHTML = "* Please add Valid Name ";
        return false;
    }
    else{
        Roles.classList.add("d-none")
        return true
    }
}
function mailValidation(){
    let Mail = document.getElementById("mailInput").value;
    let Roles = document.getElementById("mailRoles");
    let RegxMail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (Mail == "") {
        Roles.classList.remove("d-none")
        Roles.innerHTML = "* Please add your mail";
        return false;
    }
    else if(!RegxMail.test(Mail)){
        Roles.classList.remove("d-none")
        Roles.innerHTML = "* Please add Valid mail ";
        return false;
    }
    else{
        Roles.classList.add("d-none")
        return true
    }
}
function phoneValidation(){
    let Phone = document.getElementById("phoneInput").value;
    let Roles = document.getElementById("phoneRoles");
    let RegxPhone = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    if (Phone == "") {
        Roles.classList.remove("d-none")
        Roles.innerHTML = "* Please add your phone";
        return false;
    }
    else if(!RegxPhone.test(Phone)){
        Roles.classList.remove("d-none")
        Roles.innerHTML = "* Please add Valid phone Number ";
        return false;
    }
    else{
        Roles.classList.add("d-none")
        return true
    }
}
function ageValidation(){
    let Age = document.getElementById("ageInput").value;
    let Roles = document.getElementById("ageRoles");
    let RegxAge =/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/;
    if (Age == "") {
        Roles.classList.remove("d-none")
        Roles.innerHTML = "* Please add you Age";
        return false;
    }
    else if(!RegxAge.test(Age)){
        Roles.classList.remove("d-none")
        Roles.innerHTML = "* Please add Valid Number ";
        return false;
    }
    else{
        Roles.classList.add("d-none")
        return true
    }
}
function passValidation(){
    let Password = document.getElementById("passInput").value;
    let Roles = document.getElementById("passRoles");
    let RegxPass =/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/;
    if (Password == "") {
        Roles.classList.remove("d-none")
        Roles.innerHTML = "* Please add you password";
        return false;
    }
    else if(!RegxPass.test(Password)){
        Roles.classList.remove("d-none")
        Roles.innerHTML = "* Please add Valid Password ";
        return false;
    }
    else{
        Roles.classList.add("d-none")
        return true
    }

}
function repasswordValidation(){
    let pass=document.getElementById("passInput").value;
    let repass = document.getElementById("repassInput").value;
    let Roles =document.getElementById("repassRoles");

    if(  repass == "" | pass != repass){
        Roles.classList.remove("d-none");
        Roles.innerHTML = "Please add the same password"
        return false;
    }
    else{
        return true;
    }
}
//--------------------------Search-----------------------------------
const searchContainer=document.getElementById("searchContainer")

function searchInputs() {
    closeFun();
    rowData.innerHTML=""
    searchContainer.innerHTML=`
    <div class="row py-4 w-75 m-auto">
        <div class="col-md-6 ">
            <input onkeyup="searchByName(this.value)" class="form-control bg-transparent text-white" type="text" placeholder="Search By Name">
        </div>
        <div class="col-md-6">
            <input onkeyup="searchByFName(this.value)" class="form-control bg-transparent text-white" maxlength="1" type="text" placeholder="Search By First Letter">
        </div>
    </div>

    `
}
async function searchByName(id){
    closeFun()
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${id}`)
    response = await response.json()
    console.log(response.meals)
    Display(response)
}
async function searchByFName(FLetter){
    closeFun()
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${FLetter}`)
    response = await response.json()
    console.log(response.meals)
    Display(response)
}


//-------------------------------------------------------------


$('#SearchSection').on('click',function(){searchInputs();});

// SearchSection.addEventListener('click', function(){console.log("HI Search")})

$('#CategoriesSection').on('click',function(){getCategories();})
// CategoriesSection.addEventListener('click', function(){
//     closeFun();
//     getCategories();
// })

$('#AreaSection').on('click',function(){ getArea();})
// AreaSection.addEventListener('click', function(){
//     closeFun(); 
//     getArea();
// })

$('#IngredientsSection').on('click',function(){  getIngredients();})
// IngredientsSection.addEventListener('click', function(){
//     closeFun();
//     getIngredients();
// })

$('#ContactUsSection').on('click',function(){formInputs()});
// ContactUsSection.addEventListener('click', function(){console.log("HI ContactUs")})
