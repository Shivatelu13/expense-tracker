let transactions = [];
let pieChart; // Pie chart instance

// Event listener for Add (+) button
document.getElementById('add-button').addEventListener('click', function () {
    const date = document.querySelector('.dateInput').value;
    const amount = parseFloat(document.querySelector('.amountInput').value);
    const type = document.querySelector('.transactionType').value;
    const category = document.querySelector('.categoryType').value;
    const person = document.querySelector('.personNameInput').value;

    if (date && !isNaN(amount) && type !== 'Transaction Type' && category !== 'Category' && person) {
        const transaction = { date, amount, type, category, person };
        transactions.push(transaction);

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${amount}</td>
            <td>${type}</td>
            <td>${category}</td>
            <td>${person}</td>
            <td>${date}</td>
            <td>
                <button class="edit-btn">Edit</button>
                <button class="delete-btn">Delete</button>
            </td>
        `;

        row.querySelector('.edit-btn').addEventListener('click', function () {
            const newAmount = prompt("Enter new amount", transaction.amount);
            if (newAmount !== null && !isNaN(newAmount)) {
                row.querySelector('td:first-child').textContent = newAmount;
                transaction.amount = parseFloat(newAmount);
                updateTotals();
                updatePieChart(); // 🟢 Update pie chart after edit
            }
        });

        row.querySelector('.delete-btn').addEventListener('click', function () {
            row.remove();
            const index = transactions.indexOf(transaction);
            if (index !== -1) {
                transactions.splice(index, 1);
            }
            updateTotals();
            updatePieChart(); // 🔴 Update pie chart after delete
        });

        document.querySelector('.transaction-table tbody').appendChild(row);
        updateTotals();
        updatePieChart(); // 🟡 Update pie chart after add
    } else {
        console.log('Invalid data, transaction not added');
    }
});

// Function to update total income and expenses
function updateTotals() {
    let totalIncome = 0;
    let totalExpense = 0;

    transactions.forEach(tx => {
        if (tx.type === 'income') {
            totalIncome += tx.amount;
        } else if (tx.type === 'expense') {
            totalExpense += tx.amount;
        }
    });

    document.getElementById('totalIncome').textContent = totalIncome.toFixed(2);
    document.getElementById('expense').textContent = totalExpense.toFixed(2);
    document.getElementById('balance').textContent = (totalIncome - totalExpense).toFixed(2);
}

// Function to update the pie chart
function updatePieChart() {
    const categoryTotals = {};

    transactions.forEach(tx => {
        if (tx.type === 'expense') {
            if (!categoryTotals[tx.category]) {
                categoryTotals[tx.category] = 0;
            }
            categoryTotals[tx.category] += tx.amount;
        }
    });

    const data = {
        labels: Object.keys(categoryTotals),
        datasets: [{
            data: Object.values(categoryTotals),
            backgroundColor: ['#f94144', '#f3722c', '#f9c74f', '#43aa8b', '#577590'], // Add more colors if needed
            borderWidth: 1
        }]
    };

    const ctx = document.getElementById('expensePieChart').getContext('2d');

    if (pieChart) {
        pieChart.data = data;
        pieChart.update();
    } else {
        pieChart = new Chart(ctx, {
            type: 'pie',
            data: data
        });
    }
}

// Initialize the pie chart with no data at first
window.onload = function() {
    updatePieChart();  // Empty pie chart until transactions are added
}









document.getElementById('logout-btn').addEventListener('click', () => {
    auth.signOut().then(() => {
        window.location.href = "/Home.html"; // Go back to Home after logout
    }).catch((error) => {
        console.log("Logout error:", error.message);
    });
});


const firebaseConfig = {
    apiKey: "AIzaSyAhbWgIXl7qw6zTUpRbN5sMgDxR8r4cPI0",
    authDomain: "expense-tracker-fbb25.firebaseapp.com",
    projectId: "expense-tracker-fbb25",
    storageBucket: "expense-tracker-fbb25.firebasestorage.app",
    messagingSenderId: "558243151439",
    appId: "1:558243151439:web:ce90d3c4f18b9a2bd0343a",
    measurementId: "G-6PY5Z6MCKJ"
  };

  // Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();


