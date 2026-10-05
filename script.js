// ======================================================
// EXPENSE TRACKER
// ======================================================


// ======================================================
// LOAD DATA
// ======================================================

let expenses =
    JSON.parse(localStorage.getItem("expenses")) || [];

let incomes =
    JSON.parse(localStorage.getItem("incomes")) || [];

let editingExpenseIndex = -1;

let editingIncomeIndex = -1;


// ======================================================
// SAVE EXPENSES
// ======================================================

function saveExpenses() {

    localStorage.setItem(
        "expenses",
        JSON.stringify(expenses)
    );
}


// ======================================================
// SAVE INCOMES
// ======================================================

function saveIncomes() {

    localStorage.setItem(
        "incomes",
        JSON.stringify(incomes)
    );
}


// ======================================================
// ADD EXPENSE
// ======================================================

function addExpense() {

    const description =
        document.getElementById("description")
            .value
            .trim();

    const amount =
        Number(
            document.getElementById("amount").value
        );

    const category =
        document.getElementById("category").value;

    const date =
        document.getElementById("date").value;


    if (
        description === "" ||
        amount <= 0 ||
        category === "" ||
        date === ""
    ) {

        alert("Please fill all expense fields!");

        return;
    }


    expenses.push({

        description: description,

        amount: amount,

        category: category,

        date: date

    });


    saveExpenses();


    document.getElementById(
        "description"
    ).value = "";

    document.getElementById(
        "amount"
    ).value = "";

    document.getElementById(
        "category"
    ).value = "";

    document.getElementById(
        "date"
    ).value = "";


    refreshAll();
}


// ======================================================
// DISPLAY EXPENSES
// ======================================================

function displayExpenses() {

    const expenseList =
        document.getElementById(
            "expenseList"
        );


    if (!expenseList) {
        return;
    }


    expenseList.innerHTML = "";


    const searchInput =
        document.getElementById(
            "searchInput"
        );


    const filterCategory =
        document.getElementById(
            "filterCategory"
        );


    const searchText =
        searchInput
            ? searchInput.value
                .toLowerCase()
                .trim()
            : "";


    const selectedCategory =
        filterCategory
            ? filterCategory.value
            : "";


    expenses.forEach(
        function(expense, index) {

            const description =
                String(
                    expense.description || ""
                );


            const category =
                String(
                    expense.category || ""
                );


            const matchesSearch =
                description
                    .toLowerCase()
                    .includes(searchText);


            const matchesCategory =
                selectedCategory === "" ||
                category === selectedCategory;


            if (
                !matchesSearch ||
                !matchesCategory
            ) {

                return;
            }


            const li =
                document.createElement("li");


            li.innerHTML = `

                <strong>
                    ${escapeHTML(description)}
                </strong>

                - ₹${Number(
                    expense.amount || 0
                ).toFixed(2)}

                - ${escapeHTML(category)}

                - ${escapeHTML(
                    expense.date || ""
                )}

                <br>

                <button
                    onclick="editExpense(${index})"
                >
                    ✏️ Edit
                </button>

                <button
                    onclick="deleteExpense(${index})"
                >
                    🗑️ Delete
                </button>

            `;


            expenseList.appendChild(li);
        }
    );


    updateExpenseDashboard();
}


// ======================================================
// EXPENSE DASHBOARD
// ======================================================

function updateExpenseDashboard() {

    const totalAmount =
        document.getElementById(
            "totalAmount"
        );


    const expenseCount =
        document.getElementById(
            "expenseCount"
        );


    const averageAmount =
        document.getElementById(
            "averageAmount"
        );


    const total =
        expenses.reduce(
            function(sum, expense) {

                return sum +
                    Number(
                        expense.amount || 0
                    );

            },
            0
        );


    const count =
        expenses.length;


    const average =
        count > 0
            ? total / count
            : 0;


    if (totalAmount) {

        totalAmount.textContent =
            total.toFixed(2);
    }


    if (expenseCount) {

        expenseCount.textContent =
            count;
    }


    if (averageAmount) {

        averageAmount.textContent =
            average.toFixed(2);
    }
}


// ======================================================
// EDIT EXPENSE
// ======================================================

function editExpense(index) {

    if (
        index < 0 ||
        index >= expenses.length
    ) {

        alert("Expense not found!");

        return;
    }


    const expense =
        expenses[index];


    editingExpenseIndex =
        index;


    document.getElementById(
        "editExpenseDescription"
    ).value =
        expense.description;


    document.getElementById(
        "editExpenseAmount"
    ).value =
        expense.amount;


    document.getElementById(
        "editExpenseCategory"
    ).value =
        expense.category;


    document.getElementById(
        "editExpenseDate"
    ).value =
        expense.date;


    document.getElementById(
        "expenseEditForm"
    ).style.display =
        "block";


    // Scroll to edit form

    document.getElementById(
        "expenseEditForm"
    ).scrollIntoView({
        behavior: "smooth"
    });
}


// ======================================================
// SAVE EXPENSE EDIT
// ======================================================

function saveExpenseEdit() {

    if (
        editingExpenseIndex === -1
    ) {

        return;
    }


    const description =
        document.getElementById(
            "editExpenseDescription"
        ).value.trim();


    const amount =
        Number(
            document.getElementById(
                "editExpenseAmount"
            ).value
        );


    const category =
        document.getElementById(
            "editExpenseCategory"
        ).value;


    const date =
        document.getElementById(
            "editExpenseDate"
        ).value;


    if (
        description === "" ||
        amount <= 0 ||
        category === "" ||
        date === ""
    ) {

        alert(
            "Please fill all expense fields correctly!"
        );

        return;
    }


    expenses[
        editingExpenseIndex
    ] = {

        description: description,

        amount: amount,

        category: category,

        date: date

    };


    saveExpenses();


    editingExpenseIndex = -1;


    document.getElementById(
        "expenseEditForm"
    ).style.display =
        "none";


    refreshAll();
}


// ======================================================
// CANCEL EXPENSE EDIT
// ======================================================

function cancelExpenseEdit() {

    editingExpenseIndex = -1;


    document.getElementById(
        "expenseEditForm"
    ).style.display =
        "none";
}


// ======================================================
// DELETE EXPENSE
// ======================================================

function deleteExpense(index) {

    if (
        index < 0 ||
        index >= expenses.length
    ) {

        return;
    }


    if (
        !confirm(
            "Are you sure you want to delete this expense?"
        )
    ) {

        return;
    }


    expenses.splice(
        index,
        1
    );


    saveExpenses();


    refreshAll();
}


// ======================================================
// ADD INCOME
// ======================================================

function addIncome() {

    const description =
        document.getElementById(
            "incomeDescription"
        ).value.trim();


    const amount =
        Number(
            document.getElementById(
                "incomeAmount"
            ).value
        );


    const date =
        document.getElementById(
            "incomeDate"
        ).value;


    if (
        description === "" ||
        amount <= 0 ||
        date === ""
    ) {

        alert(
            "Please fill all income fields!"
        );

        return;
    }


    incomes.push({

        description: description,

        amount: amount,

        date: date

    });


    saveIncomes();


    document.getElementById(
        "incomeDescription"
    ).value = "";


    document.getElementById(
        "incomeAmount"
    ).value = "";


    document.getElementById(
        "incomeDate"
    ).value = "";


    refreshAll();
}


// ======================================================
// DISPLAY INCOMES
// ======================================================

function displayIncomes() {

    const incomeList =
        document.getElementById(
            "incomeList"
        );


    if (!incomeList) {
        return;
    }


    incomeList.innerHTML = "";


    incomes.forEach(
        function(income, index) {

            const li =
                document.createElement("li");


            li.innerHTML = `

                <strong>
                    ${escapeHTML(
                        income.description || ""
                    )}
                </strong>

                - ₹${Number(
                    income.amount || 0
                ).toFixed(2)}

                - ${escapeHTML(
                    income.date || ""
                )}

                <br>

                <button
                    onclick="editIncome(${index})"
                >
                    ✏️ Edit
                </button>

                <button
                    onclick="deleteIncome(${index})"
                >
                    🗑️ Delete
                </button>

            `;


            incomeList.appendChild(li);
        }
    );
}


// ======================================================
// EDIT INCOME
// ======================================================

function editIncome(index) {

    if (
        index < 0 ||
        index >= incomes.length
    ) {

        alert("Income not found!");

        return;
    }


    const income =
        incomes[index];


    editingIncomeIndex =
        index;


    document.getElementById(
        "editIncomeDescription"
    ).value =
        income.description;


    document.getElementById(
        "editIncomeAmount"
    ).value =
        income.amount;


    document.getElementById(
        "editIncomeDate"
    ).value =
        income.date;


    document.getElementById(
        "incomeEditForm"
    ).style.display =
        "block";


    document.getElementById(
        "incomeEditForm"
    ).scrollIntoView({
        behavior: "smooth"
    });
}


// ======================================================
// SAVE INCOME EDIT
// ======================================================

function saveIncomeEdit() {

    if (
        editingIncomeIndex === -1
    ) {

        return;
    }


    const description =
        document.getElementById(
            "editIncomeDescription"
        ).value.trim();


    const amount =
        Number(
            document.getElementById(
                "editIncomeAmount"
            ).value
        );


    const date =
        document.getElementById(
            "editIncomeDate"
        ).value;


    if (
        description === "" ||
        amount <= 0 ||
        date === ""
    ) {

        alert(
            "Please fill all income fields correctly!"
        );

        return;
    }


    incomes[
        editingIncomeIndex
    ] = {

        description: description,

        amount: amount,

        date: date

    };


    saveIncomes();


    editingIncomeIndex = -1;


    document.getElementById(
        "incomeEditForm"
    ).style.display =
        "none";


    refreshAll();
}


// ======================================================
// CANCEL INCOME EDIT
// ======================================================

function cancelIncomeEdit() {

    editingIncomeIndex = -1;


    document.getElementById(
        "incomeEditForm"
    ).style.display =
        "none";
}


// ======================================================
// DELETE INCOME
// ======================================================

function deleteIncome(index) {

    if (
        index < 0 ||
        index >= incomes.length
    ) {

        return;
    }


    if (
        !confirm(
            "Are you sure you want to delete this income?"
        )
    ) {

        return;
    }


    incomes.splice(
        index,
        1
    );


    saveIncomes();


    refreshAll();
}


// ======================================================
// CATEGORY SUMMARY
// ======================================================

function updateCategorySummary() {

    const totals = {

        Food: 0,

        Travel: 0,

        Shopping: 0,

        Education: 0,

        Other: 0

    };


    expenses.forEach(
        function(expense) {

            if (
                Object.prototype.hasOwnProperty.call(
                    totals,
                    expense.category
                )
            ) {

                totals[
                    expense.category
                ] += Number(
                    expense.amount || 0
                );
            }
        }
    );


    const ids = {

        Food: "foodAmount",

        Travel: "travelAmount",

        Shopping: "shoppingAmount",

        Education: "educationAmount",

        Other: "otherAmount"

    };


    Object.keys(ids).forEach(
        function(category) {

            const element =
                document.getElementById(
                    ids[category]
                );


            if (element) {

                element.textContent =
                    totals[
                        category
                    ].toFixed(2);
            }
        }
    );
}


// ======================================================
// EXPENSE CHART
// ======================================================

function updateExpenseChart() {

    const canvas =
        document.getElementById(
            "expenseChart"
        );


    if (!canvas) {
        return;
    }


    const ctx =
        canvas.getContext("2d");


    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    const categories = [

        "Food",

        "Travel",

        "Shopping",

        "Education",

        "Other"

    ];


    const totals = {

        Food: 0,

        Travel: 0,

        Shopping: 0,

        Education: 0,

        Other: 0

    };


    expenses.forEach(
        function(expense) {

            if (
                Object.prototype.hasOwnProperty.call(
                    totals,
                    expense.category
                )
            ) {

                totals[
                    expense.category
                ] += Number(
                    expense.amount || 0
                );
            }
        }
    );


    const values = categories.map(
        function(category) {

            return totals[category];
        }
    );


    const maxValue =
        Math.max(
            ...values,
            100
        );


    const chartLeft = 70;

    const chartBottom = 330;

    const chartHeight = 250;

    const barWidth = 90;

    const gap = 45;


    // Y axis

    ctx.beginPath();

    ctx.moveTo(
        chartLeft,
        50
    );

    ctx.lineTo(
        chartLeft,
        chartBottom
    );

    ctx.stroke();


    // X axis

    ctx.beginPath();

    ctx.moveTo(
        chartLeft,
        chartBottom
    );

    ctx.lineTo(
        760,
        chartBottom
    );

    ctx.stroke();


    values.forEach(
        function(value, index) {

            const barHeight =
                (
                    value /
                    maxValue
                ) *
                chartHeight;


            const x =
                chartLeft +
                40 +
                index *
                (
                    barWidth +
                    gap
                );


            const y =
                chartBottom -
                barHeight;


            ctx.fillRect(
                x,
                y,
                barWidth,
                barHeight
            );


            ctx.font =
                "bold 16px Arial";


            ctx.fillText(
                "₹" +
                value.toFixed(0),
                x + 15,
                y - 10
            );


            ctx.font =
                "14px Arial";


            ctx.fillText(
                categories[index],
                x + 5,
                chartBottom + 25
            );
        }
    );
}


// ======================================================
// MONTHLY SPENDING
// ======================================================

function updateMonthlySpending() {

    const monthlyTotals = {};


    expenses.forEach(
        function(expense) {

            if (!expense.date) {
                return;
            }


            const month =
                expense.date.substring(
                    0,
                    7
                );


            if (
                !monthlyTotals[month]
            ) {

                monthlyTotals[month] =
                    0;
            }


            monthlyTotals[month] +=
                Number(
                    expense.amount || 0
                );
        }
    );


    const monthlySummary =
        document.getElementById(
            "monthlySummary"
        );


    if (!monthlySummary) {
        return;
    }


    monthlySummary.innerHTML = "";


    const months =
        Object.keys(
            monthlyTotals
        ).sort();


    if (
        months.length === 0
    ) {

        monthlySummary.innerHTML =
            "<p>No monthly expenses yet.</p>";

        return;
    }


    months.forEach(
        function(month) {

            const date =
                new Date(
                    month +
                    "-01T00:00:00"
                );


            const monthName =
                date.toLocaleString(
                    "en-US",
                    {
                        month: "long",
                        year: "numeric"
                    }
                );


            const div =
                document.createElement(
                    "div"
                );


            div.className =
                "month-item";


            div.innerHTML = `

                <span>
                    ${monthName}
                </span>

                <strong>
                    ₹${monthlyTotals[
                        month
                    ].toFixed(2)}
                </strong>

            `;


            monthlySummary.appendChild(
                div
            );
        }
    );
}


// ======================================================
// FINANCIAL SUMMARY
// ======================================================

function updateFinancialSummary() {

    const totalIncome =
        incomes.reduce(
            function(sum, income) {

                return sum +
                    Number(
                        income.amount || 0
                    );

            },
            0
        );


    const totalExpenses =
        expenses.reduce(
            function(sum, expense) {

                return sum +
                    Number(
                        expense.amount || 0
                    );

            },
            0
        );


    const balance =
        totalIncome -
        totalExpenses;


    const incomeElement =
        document.getElementById(
            "totalIncome"
        );


    const balanceElement =
        document.getElementById(
            "balance"
        );


    if (incomeElement) {

        incomeElement.textContent =
            totalIncome.toFixed(2);
    }


    if (balanceElement) {

        balanceElement.textContent =
            balance.toFixed(2);
    }
}


// ======================================================
// BUDGET
// ======================================================

function saveBudget() {

    const budgetInput =
        document.getElementById(
            "budgetInput"
        );


    if (!budgetInput) {
        return;
    }


    const budget =
        Number(
            budgetInput.value
        );


    if (
        !budget ||
        budget <= 0
    ) {

        alert(
            "Please enter a valid budget!"
        );

        return;
    }


    localStorage.setItem(
        "monthlyBudget",
        budget
    );


    updateBudget();


    budgetInput.value = "";
}


function updateBudget() {

    const budget =
        Number(
            localStorage.getItem(
                "monthlyBudget"
            )
        ) || 0;


    const totalExpenses =
        expenses.reduce(
            function(sum, expense) {

                return sum +
                    Number(
                        expense.amount || 0
                    );

            },
            0
        );


    const remaining =
        budget -
        totalExpenses;


    const element =
        document.getElementById(
            "remainingBudget"
        );


    if (element) {

        element.textContent =
            remaining.toFixed(2);
    }
}


// ======================================================
// CSV EXPORT
// ======================================================

function exportCSV() {

    if (
        expenses.length === 0 &&
        incomes.length === 0
    ) {

        alert(
            "No data available to export!"
        );

        return;
    }


    let csv =
        "Type,Description,Amount,Category,Date\n";


    expenses.forEach(
        function(expense) {

            csv +=
                "Expense," +
                csvValue(
                    expense.description
                ) +
                "," +
                Number(
                    expense.amount || 0
                ) +
                "," +
                csvValue(
                    expense.category
                ) +
                "," +
                csvValue(
                    expense.date
                ) +
                "\n";
        }
    );


    incomes.forEach(
        function(income) {

            csv +=
                "Income," +
                csvValue(
                    income.description
                ) +
                "," +
                Number(
                    income.amount || 0
                ) +
                ",Income," +
                csvValue(
                    income.date
                ) +
                "\n";
        }
    );


    const blob =
        new Blob(
            [csv],
            {
                type:
                    "text/csv;charset=utf-8;"
            }
        );


    const url =
        URL.createObjectURL(
            blob
        );


    const link =
        document.createElement(
            "a"
        );


    link.href = url;

    link.download =
        "expense-tracker.csv";


    document.body.appendChild(
        link
    );


    link.click();


    document.body.removeChild(
        link
    );


    URL.revokeObjectURL(
        url
    );
}


function csvValue(value) {

    if (
        value === null ||
        value === undefined
    ) {

        return "";
    }


    return '"' +
        String(value)
            .replace(
                /"/g,
                '""'
            ) +
        '"';
}


// ======================================================
// PDF EXPORT
// ======================================================

function exportPDF() {

    if (
        typeof window.jspdf ===
        "undefined"
    ) {

        alert(
            "PDF library is not loaded."
        );

        return;
    }


    const {
        jsPDF
    } = window.jspdf;


    const doc =
        new jsPDF();


    doc.setFontSize(18);

    doc.text(
        "Expense Tracker Report",
        20,
        20
    );


    let y = 35;


    doc.setFontSize(11);


    expenses.forEach(
        function(expense) {

            const text =
                `${expense.date} | ` +
                `${expense.description} | ` +
                `₹${expense.amount} | ` +
                `${expense.category}`;


            doc.text(
                text,
                20,
                y
            );


            y += 8;


            if (y > 280) {

                doc.addPage();

                y = 20;
            }
        }
    );


    y += 10;


    doc.setFontSize(14);

    doc.text(
        "Income",
        20,
        y
    );


    y += 10;


    doc.setFontSize(11);


    incomes.forEach(
        function(income) {

            const text =
                `${income.date} | ` +
                `${income.description} | ` +
                `₹${income.amount}`;


            doc.text(
                text,
                20,
                y
            );


            y += 8;


            if (y > 280) {

                doc.addPage();

                y = 20;
            }
        }
    );


    doc.save(
        "expense-tracker.pdf"
    );
}


// ======================================================
// DARK MODE
// ======================================================

function toggleDarkMode() {

    document.body.classList.toggle(
        "dark-mode"
    );


    const isDark =
        document.body.classList.contains(
            "dark-mode"
        );


    localStorage.setItem(
        "darkMode",
        isDark
            ? "true"
            : "false"
    );


    updateDarkModeButton();
}


function updateDarkModeButton() {

    const button =
        document.getElementById(
            "darkModeButton"
        );


    if (!button) {
        return;
    }


    const isDark =
        document.body.classList.contains(
            "dark-mode"
        );


    button.textContent =
        isDark
            ? "☀️ Light Mode"
            : "🌙 Dark Mode";
}


function loadDarkMode() {

    const saved =
        localStorage.getItem(
            "darkMode"
        );


    if (
        saved === "true"
    ) {

        document.body.classList.add(
            "dark-mode"
        );
    }


    updateDarkModeButton();
}


// ======================================================
// REFRESH EVERYTHING
// ======================================================

function refreshAll() {

    displayExpenses();

    displayIncomes();

    updateCategorySummary();

    updateExpenseChart();

    updateMonthlySpending();

    updateFinancialSummary();

    updateBudget();
}


// ======================================================
// ESCAPE HTML
// ======================================================

function escapeHTML(value) {

    return String(value)
        .replace(
            /&/g,
            "&amp;"
        )
        .replace(
            /</g,
            "&lt;"
        )
        .replace(
            />/g,
            "&gt;"
        )
        .replace(
            /"/g,
            "&quot;"
        )
        .replace(
            /'/g,
            "&#039;"
        );
}


// ======================================================
// START APP
// ======================================================

document.addEventListener(
    "DOMContentLoaded",
    function() {

        // Reload data from localStorage

        expenses =
            JSON.parse(
                localStorage.getItem(
                    "expenses"
                )
            ) || [];


        incomes =
            JSON.parse(
                localStorage.getItem(
                    "incomes"
                )
            ) || [];


        loadDarkMode();

        refreshAll();

    }
);