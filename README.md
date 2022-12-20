# TypeScript Assigment

![Generic badge](https://img.shields.io/badge/JS-ES5-yellow.svg)
![Generic badge](https://img.shields.io/badge/TS-v.4.9-blue.svg)
![Generic badge](https://img.shields.io/badge/React-v.18.2-navy.svg)

## Technologies

* React JS
* TypeScript
* JS
* React Bootstrap

### Task - Budget App

Simple Budget App was created. 

#### Functionality: 
* You can add Income and Expense transactions. 
* Each transaction have its own 
  * ID
  * Date 
  * Source
  * Amount
* All the transactions can be deleted, until the balance will stay positive.
* Money can be transferred from main balance to savings account
* Target can be set up for savings accounts, dynamic bar will show progress
* Dynamic filter by source, where you can find exact transaction you need
* Radio buttons filter to show only income/expanse transactions
* Pie Chart made with React D3 will show percentage of income,expense and savings based on your transactions.

## Project Structure

<details>
<summary>Open Project Structure</summary>

``` bash
├───public
│       favicon.ico
│       index.html
│
└───src
    │   index.css
    │   index.tsx
    │
    └───components
        │   types and interfaces.ts
        │
        ├───App
        │       App.css
        │       App.tsx
        │
        ├───BalanceComponent
        │       BalanceComponent.tsx
        │
        ├───Header
        │       header.css
        │       Header.tsx
        │
        ├───ModalWindow
        │       ModalWindow.tsx
        │
        ├───Pie-chart
        │       PieChart.tsx
        │
        ├───Savings-content
        │       savings-content.css
        │       SavingsContent.tsx
        │
        ├───Savings-modal
        │       SavingsModal.tsx
        │
        └───Transactions-content
                transactions-content.css
                TransactionsContent.tsx

```
</details>

## Getting Started

Website is deployed on Netlify and can [be viewed here](https://63a22eef3b696d29399fec24--whimsical-fox-89d771.netlify.app/) <br>
Clone the repository from GitHub with `git clone `. <br>
Check repository on `https://github.com/Rmk-kk/FS13-React-BudgetApp`

