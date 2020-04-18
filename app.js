let table, newTable=[]
let columnClicked=""
let url="https://recruitment.hal.skygate.io/companies"
let searchFor={id:"", name:"", city:""}

let searchButton=document.getElementById("searchButton")


fetch(url)
.then(response => {
    return response.json()
  })
.then(data => {
    table=data
    newTable=data
    load(table)})
.catch(err => {
    const message=document.getElementById("error")
    message.innerHTML="Couldnt load the table, please check internet contection and refresh page"
  })




function load(table){
    const tableBody=document.getElementById("tableData")
    let codeHtml=""
    for(let row of table){
        codeHtml+=`<tr><td>${row.id}</td><td>${row.name}</td><td>${row.city}</td></tr>`
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
    console.log(searchFor, newTable!==table)
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

    load(newTable)
    

    document.getElementById("id").value=""
    document.getElementById("city").value=""
    document.getElementById("name").value=""
    searchFor={id:"", name:"", city:""}
    if (newTable!==table)searchButton.innerHTML="Realod table"
    else searchButton.innerHTML="Search"

}