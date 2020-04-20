let table, newTable=[]
let columnClicked=""
let url="https://recruitment.hal.skygate.io/companies"
let searchFor={id:"", name:"", city:""}
let incomes=[]
let searchButton=document.getElementById("searchButton")


function fetchingData (){
    document.getElementById("data").style.display="none"
    document.getElementById("message").innerHTML="Data is loading, please wait..."
    return new Promise(resolve=>{
    fetch(url)
    .then(data=>data.json())
    .then(data=>{
        table=data
        resolve(data)})
    .catch(err=>{
        console.log(err)
        document.getElementById("data").style.display="none"
        document.getElementById("message").innerHTML="Couldnt load the page, please check connection and refresh the page"
        })
    })}


function incomeLoading(item){
    return new Promise(resolve=>{
        fetch(`https://recruitment.hal.skygate.io/incomes/${item.id}`)
        .then(data=>data.json())
        .then(data=>resolve(data))
        .catch(err=>{
            console.log(err)
            document.getElementById("data").style.display="none"
            document.getElementById("message").innerHTML="Couldnt load the page, please check connection and refresh the page"
        })
    })
}


async function loopingIncomeData(array) {
    for (item of array) {
    await incomeLoading(item).then(result=>incomes.push(result))}
}

function adjustingData(){
    for (let company of incomes){
        
        let size=company.incomes.length
        
        let total=company.incomes.reduce(function(acc,obj){return acc+Number(obj.value)},0)
        let objectTable=table.find(item => item.id === company.id)
        let dates=[]
        for (item of company.incomes){dates.push(item.date.slice(0,4)+item.date.slice(5,7))}

        let latestMonth=String(Math.max(...dates)).slice(0,4)+"-"+String(Math.max(...dates)).slice(4)
        
        let score=company.incomes.filter(item=>item.date.slice(0,7)==latestMonth)
        let lastMonthIncome=score.reduce(function(acc,obj){return acc+Number(obj.value)},0)
        objectTable["total"]=Math.round(total)
        objectTable["average"]=Number(Math.round(total/size))
        objectTable["last"]=Math.round(lastMonthIncome)
    }
}





function load(table, incomes){
    adjustingData()
    document.getElementById("data").style.display=""
    document.getElementById("message").innerHTML=""
    const tableBody=document.getElementById("tableData")
    let codeHtml=""
    for(let row of table){
        codeHtml+=`<tr><td>${row.id}</td><td>${row.name}</td><td>${row.city}</td><td>${row.last}</td>
        <td>${row.average}</td><td>${row.total}</td></tr>`
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
    
    document.getElementById("id").value=""
    document.getElementById("city").value=""
    document.getElementById("name").value=""
    searchFor={id:"", name:"", city:""}
    if (newTable!==table)searchButton.innerHTML="Realod table"
    else searchButton.innerHTML="Search"}


fetchingData()
.then(result=>loopingIncomeData(result))
.then(()=>load(table, incomes))
