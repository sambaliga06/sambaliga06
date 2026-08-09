stack 
fronternd  --> React 
Backend --> Node.js ,Express
Database --> MongoDB , Mongoose

so basically work is in progress

first i did 

npm create vite@5 expense-tracker

then to start react I have done 

cd expense-tracker
npm install
npm run dev


TERMINAL 1 — MongoDB

    `cd "D:\all code apps\mongodb\Server\bin"
    .\mongod.exe --dbpath "D:\all code apps\mongodb\MongoDBdata\db"


TERMINAL 2 — Backend

    cd "D:\html\expense tracker\expense-tracker\server"
    node server.js


TERMINAL 3 — Frontend

    cd "D:\html\expense tracker\expense-tracker"
    npm run dev


project structure below 
expense-tracker/
│
├── src/
│   │
│   ├── components/
│   │   ├── ExpenseForm.jsx
│   │   └── ExpenseList.jsx
│   │
│   ├── hooks/
│   │   └── useExpenses.js
│   │
│   ├── services/
│   │   └── expenseService.js
│   │
│   ├── App.jsx
│   └── ...
│
├── server/
│   ├── models/
│   │   └── Expense.js
│   │
│   ├── server.js
│   └── package.json
│
├── package.json
└── ...


