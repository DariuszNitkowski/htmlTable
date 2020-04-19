let table, newTable=[]
let columnClicked=""
let url="https://recruitment.hal.skygate.io/companies"
let searchFor={id:"", name:"", city:""}
let incomes=[]
let searchButton=document.getElementById("searchButton")


const fetchingData = new Promise(resolve=>{
        console.log("jestem w pierwszej bazie")
        fetch(url)
        .then(data=>data.json())
        .then(data=>{
            table=data
            resolve(data)})
    })

async function fetchingIncomeData(item) {
    fetch(`https://recruitment.hal.skygate.io/incomes/${item.id}`)
    .then(data=>data.json())
    .then(data=>incomes.push(data))
    console.log("jestem w income pobieraniu");
}

function incomeLoading(item){
    return new Promise(resolve=>{
        console.log("w trele")
        fetch(`https://recruitment.hal.skygate.io/incomes/${item.id}`)
        .then(data=>data.json())
        .then(data=>resolve(data))
    })
}


async function loopingIncomeData(array) {
    console.log("w lupie")
    for (item of array) {
    await incomeLoading(item).then(res=>incomes.push(res))}
}

 


fetchingData.then(result=>loopingIncomeData(result))
.then(()=>console.log(incomes, table,"koniec"))
   


function load(table){
    const tableBody=document.getElementById("tableData")
    let codeHtml=""
    for(let row of table){
        codeHtml+=`<tr><td>${row.id}</td><td>${row.name}</td><td>${row.city}</td><td>${row.total}</td></tr>`
    }
    tableBody.innerHTML=codeHtml
}

function sortColumn(columnName){
    let dataType=typeof(table[0][columnName])
    
    if (columnClicked===columnName){
        ascending=!ascending}
    else{ascending=true}
    switch(dataType){
        case "number":
            sortNumber(columnName, ascending)
            break
        case "string":
            sortString(columnName, ascending)
            break
    }
    load(table)
    columnClicked=columnName
}
function sortNumber(columnName, ascending){
    table.sort((a,b)=>{
        return ascending? a[columnName]-b[columnName] : 
        b[columnName]-a[columnName]
    })}

function sortString(columnName, ascending){
    table.sort((a, b)=>{
            return ascending? a[columnName].toLowerCase().localeCompare(b[columnName].toLowerCase())
            :b[columnName].toLowerCase().localeCompare(a[columnName].toLowerCase());
        })}



function inputHandle(column){
    let fieldHandle=document.getElementById(column)
    searchFor[column]=fieldHandle.value
    if (searchFor.id=="" && searchFor.city=="" && searchFor.name=="" && newTable!==table){
        searchButton.innerHTML="Realod table"    
    }
    else searchButton.innerHTML="Search"
}

function search(){
    
    newTable=table
    if (searchFor.city.length>0){
    newTable=newTable.filter(element=>element.city.toLowerCase().includes(searchFor.city.toLowerCase()))}
    if (searchFor.name.length>0){
    newTable=newTable.filter(element=>element.name.toLowerCase().includes(searchFor.name.toLowerCase()))}
    if (searchFor.id.length>0){
    newTable=newTable.filter(element=>element.id==searchFor.id)}
    
    console.log(incomes[1],table[1])

    document.getElementById("id").value=""
    document.getElementById("city").value=""
    document.getElementById("name").value=""
    searchFor={id:"", name:"", city:""}
    if (newTable!==table)searchButton.innerHTML="Realod table"
    else searchButton.innerHTML="Search"

}