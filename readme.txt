Script App.js starts with chain of asynchronus function to get data from given API. First function of chain is fetchingData and is created to 
receive data of companies. It changes divs in main.html to inform user that data is loading. If any error appears message will change. 
Data is fetching as promise and waiting to be resolved until moves further. The outcome is passed to to async loopingIncomeData function 
where inside of awaiting for incomeLoading. Function incomeLoading is singe lap of the loop and resolve the promise to be able to push the data
and work on it further on array. When the the whole chain is finished script runs adjustingData.
This function is merging two separate arrays by company’s id counting incomes for each. Inside of function reduce function is used to keep code clean and efficient. 
displayData is the last function in chain and takes argument of prepared array of companies and incomes. The data is being devided for pagination. 
According to type of data (number or array) specific action is taken. Array can be passed as argument in 3 cases: loading at start, when sorting is aplied or by searching. 
Number only if user click the link to change the page of table. If argument is an array then html code is being created to print links and functions to switch on webpage
for pagination. For number as argument function pass specific slice of previously devided data. At the end of displayData function starts function load with 
array as argument. Function load converts array to html code to print on webpage and message about loading changes to none.

Two last two action inside code are sorting and searching. For sorting is sortColumn function called on tables head click. Argument passed inside the function 
is name of column to check if column has been clicked for the first time in row and set ascending/descending mode. Function check the type of data in chosen 
column to  use the right method. As strings sorting in javascript is case sensitive the diffrent method is used for numbers and strings. Both arguments are passed 
to specific function - column name and ascending boolean. When sorting is done dispalyData function is being launched with argument of newly sorted data and 
whole process with pagination and converting data starts again. The last function inputHandle starts on key up in input field of webpage. Name of column is being 
passed to determine where user wants to search. Inside function the value of specific input is being saved in obejct. If inputs are empty (user didnt type anything) 
and current table is filtred already then button search will change to reload data. Function search starts when user press search button and check if there is any string 
in inputs. If so then it will search in specific columns matching data for id, name and/or city. If user types in inputs for incomes then if its number every data lower 
and equal will be displayed. New array is being created and displayData starts again. After that function erases all inputs and searchFor object. 