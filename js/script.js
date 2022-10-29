function closeNav(){
   

   $(".nav1").animate({left:'0px'},500)
   $(".nav2").animate({left:'-200px'},500)
   


}
function openNav(){
    if($(".nav1").css('left')=='200px'){
        closeNav()
    }else{
        

        $(".nav1").animate({left:'200px' },500)
        $(".nav2").animate({left:'0px'},500)

        
    }
    
}
var row=document.getElementById("items")
var navLinks=document.getElementsByClassName("nav-category")
function displayMeals(arr){

    let meals = ""
    console.log(arr)
    for (let i = 0; i < arr.length; i++) {
        meals += `
        
        <div class="col-md-6 col-lg-3 my-3">
        <div class="meal"">
                <img src=${arr[i].strMealThumb} alt="" class="img-fluid rounded-2">
                <div class="shadow">
                    <span>${arr[i].strMeal}</span>
                </div>
            
        </div>
          
       
        </div>

                    `
                    
    }
    row.innerHTML = meals
    let m=document.getElementsByClassName("meal")
    for(let i=0 ;i<m.length ;i++){
        m[i].addEventListener('click',showMeal)
    }

   
    
}
async function showMeal(e){

    if(e.target.childNodes.length==1){
        val=e.target.innerText
    }else{
        
        val=e.target.children[0].innerText
    }
    // console.log(e.target.children[0].innerText)
    let data= await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${val}`)
    let mealarr= await data.json()
    meal=mealarr.meals[0]
    let recipes = ""
    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            recipes += `<li class="my-3 mx-1 p-1 bg-success rounded">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`
        }
    }

    let tags = meal.strTags?.split(",") 
    let tagsStr = "" 
    for (let i = 0; i < tags?.length; i++) { 
        tagsStr += `<li class="my-3 mx-1 p-1 bg-danger rounded">${tags[i]}</li>`
    }
   let item= `
    <div class="col-md-4  text-white">
					<img class="w-100" src="${meal.strMealThumb}" alt="" ><br>
					<h1>${meal.strMeal}</h1>
				</div>
    <div class="col-md-8  text-white text-left">
        <h2>Instructions</h2>
        <p>${meal.strInstructions}</p>
        <p><b class="fw-bolder">Area :</b>${meal.strArea}</p>
        <p><b class="fw-bolder">Category :</b>${meal.strCategory}</p>
        <h3>Recipes :</h3>
        
        <ul class="d-flex " id="recipes"></ul>
        <h3 class="my-2 mx-1 p-1">Tags :</h3>
        <ul class="d-flex " id="tags"></ul>

        
        <a class="btn btn-success text-white" target="_blank" href="${meal.strSource}">Source</a>
        <a class="btn youtube text-white" target="_blank" href="${meal.strYoutube}">Youtube</a>
    </div>`
    row.innerHTML=item
    document.getElementById("recipes").innerHTML=recipes
    document.getElementById("tags").innerHTML=tagsStr
   
}
function displayCateogries(arr){

    let meals = ""
    console.log(arr)
    for (let i = 0; i < arr.length; i++) {
        meals += `
        
        <div class="col-md-6 col-lg-3 my-3 cat">
        <div class="meal " >
                <img src=${arr[i].strCategoryThumb} alt="" class="img-fluid rounded-2">
                <div class="shadow text-center ">
                    <h2>${arr[i].strCategory}</h2>
                    <p>${arr[i].strCategoryDescription.slice(0,135)}
                </div>
            
        </div>
          
       
        </div>

                    `
                    
    }
    
    row.innerHTML = meals
    let m=document.getElementsByClassName("cat")
    for(let i=0 ;i<m.length ;i++){
        m[i].addEventListener('click',showCategoryMeals)
    }
    closeNav()
    
}
async function showCategoryMeals(e){
    
    if(e.target.childNodes.length==1){
        val=e.target.innerText.split(' ')[0]
    }else{
        
        val=e.target.children[0].innerText
    }
    console.log(val)
    let data= await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${val}`)
    let mealarr= await data.json()
    displayMeals(mealarr.meals)
}
async function showAreaMeals(e){
    
    if(e.target.childNodes.length==1){
        val=e.target.innerText.split(' ')[0]
    }else{
        
        val=e.target.children[0].innerText
    }
    console.log(val)
    let data= await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${val}`)
    let mealarr= await data.json()
    displayMeals(mealarr.meals)
}
async function showIngredientMeals(e){
    
    if(e.target.childNodes.length==1){
        val=e.target.innerText.split(' ')[0]
    }else{
        
        val=e.target.children[0].innerText
    }
    console.log(val)
    let data= await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${val}`)
    let mealarr= await data.json()
    displayMeals(mealarr.meals)
}
function displayAreas(arr){

    let meals = ""
    // console.log(arr)
    for (let i = 0; i < arr.length-7; i++) {
        meals += `
        
        <div class="col-md-6 col-lg-3 my-3 ar">
        <div class="meal  text-center" onclick="getMeal()">

            <i class="fa-solid fa-city fa-3x text-danger"></i>
            <h2 class="text-white text-center">${arr[i].strArea}</h2>
            
        </div>
          
       
        </div>

                    `
                    
    }
    
    row.innerHTML = meals
    let m=document.getElementsByClassName("ar")
    for(let i=0 ;i<m.length ;i++){
        m[i].addEventListener('click',showAreaMeals)
    }
    closeNav()
    
}
function displayIngredients(arr){

    let meals = ""
    // console.log(arr)
    for (let i = 0; i < arr.length-550; i++) {
        meals += `
        
        <div class="col-md-6 col-lg-3 my-3 ing">
        <div class="meal  text-center" ">

            <i class="fa-solid fa-bowl-food fa-3x"></i>
            <h2 class="text-white text-center">${arr[i].strIngredient}</h2>
            <p class="text-white">${arr[i].strDescription.slice(0,140)}</p>
            
        </div>
          
       
        </div>

                    `
                    
    }
    
    row.innerHTML = meals
    let m=document.getElementsByClassName("ing")
    for(let i=0 ;i<m.length ;i++){
        m[i].addEventListener('click',showIngredientMeals)
    }
    closeNav()
    
}
async function getMeals(){
    let data= await fetch("https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood")
    let dataJson= await data.json()
    displayMeals(dataJson.meals)
}

function searchMeals(){
    $(".searchInputs").css("display","block");
    closeNav()
    row.innerHTML=""
}
async function searchByName(){
    let val=document.getElementById("searchInput").value
    let data= await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${val}`)
    let dataJson= await data.json()
    displayMeals(dataJson.meals)
}
async function searchByLetter(){
    let val=document.getElementById("letter").value
    let data= await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${val}`)
    let dataJson= await data.json()
    displayMeals(dataJson.meals)
}
async function getCategories(){
    let data= await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    let dataJson= await data.json()
    console.log(dataJson)
    displayCateogries(dataJson.categories)
}
async function getAreas(){
    let data= await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    let dataJson= await data.json()
    console.log(dataJson)
    displayAreas(dataJson.meals)
}
async function getIngredients(){
    let data= await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    let dataJson= await data.json()
    console.log(dataJson)
    displayIngredients(dataJson.meals)
}
getCategories()
function contact(){
    row.innerHTML=`  <section id="contact" class="container myM w-75 mx-auto mb-5 ">
    <div class="p-2">
        <h2 class="text-light mb-5">ContacUs...</h2>
        <div class="row">
            <div class="col-md-6">
                <div class="form-group">
                    <input class="form-control shadow " onkeyup="validation()" id="name" placeholder="Enter Your Name">
                    <div class="alert mt-1 alert-danger d-none" id="namealert" role="alert">
                        Special Characters and Numbers not allowed
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="form-group">
                    <input onkeyup="validation()" class="form-control" id="email" placeholder="Enter Email">
                    <div class="alert mt-1 alert-danger d-none" id="emailalert" role="alert">
                        Enter valid email. *Ex: xxx@yyy.zzz
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="form-group">
                    <input onkeyup="validation()" class="form-control" id="phone" placeholder="Enter phone">
                    <div class="alert mt-1 alert-danger  d-none" id="phonealert" role="alert">
                        Enter valid Phone Number
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="form-group">
                    <input onkeyup="validation()" class="form-control" id="age" placeholder="Enter Age">
                    <div class="alert mt-1 alert-danger  d-none" id="agealert" role="alert">
                        Enter valid Age
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="form-group">
                    <input onkeyup="validation()" class="form-control" type="password" id="password" placeholder="Enter Password">
                    <div class="alert mt-1 alert-danger  d-none" id="passwordalert" role="alert">
                        Enter valid password *Minimum eight characters, at least one letter and one number:*
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="form-group">
                    <input onkeyup="validation()" class="form-control" type="password" id="rePassword" placeholder="Enter RePassword">
                    <div class="alert mt-1 alert-danger  d-none" id="repasswordalert" role="alert">
                        Enter valid Repassword
                    </div>
                </div>
            </div>


        </div>

        <button type="submit" disabled="" id="submitBtn" class="btn btn-outline-danger">Submit</button>
    </div>

</section>`
}