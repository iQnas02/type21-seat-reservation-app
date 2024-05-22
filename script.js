const loginButton=document.querySelector(".loginButton")
const movieList=document.querySelector("#movieList")

loginButton.addEventListener("click",()=>{
    movieList.classList.toggle("hidden")
})