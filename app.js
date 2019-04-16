// Listen for form submit
document.querySelector('#loan-form').addEventListener('submit', calculateResults);
// Calculate Results
function calculateResults(e) {
    // UI Variables
    const amount = document.querySelector("#amount");
    const interest = document.querySelector("#interest");
    const years = document.querySelector("#years");

    // Output variables
    const monthlyPayment = document.querySelector("#monthly-payment");
    const totalPayment = document.querySelector("#total-payment");
    const totalInterest = document.querySelector("#total-interest");

    const principal = parseFloat(amount.value);
    const calculatedInterest = parseFloat(interest.value) / 100 / 12;
    const calculatedPayments = parseFloat(years.value) * 12;

    // Calculate Monthy Payment
    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (principal * x * calculatedInterest) / (x - 1);

    if (isFinite(monthly)) {
        // Show loading animation
        document.querySelector('#loading').style.display = 'block';
        // Hide Result
        document.querySelector('#results').style.display = 'none';
        // Hide animation after few seconds
        setTimeout(function () {
            document.querySelector('#loading').style.display = 'none';
            document.querySelector('#results').style.display = 'block';
        }, 2000);

        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly * calculatedPayments).toFixed(2);
        totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);
    } else {
        showError('Please check your numbers');
        // Hide Result
        document.querySelector('#results').style.display = 'none';
    }
    e.preventDefault();
}

function showError(error) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'alert alert-danger';

    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading')

    errorDiv.appendChild(document.createTextNode(error));
    // Insert error message before heading
    card.insertBefore(errorDiv, heading);

    // Clear alert after 3 seconds
    setTimeout(function () {
        document.querySelector('.alert').remove();
    }, 3000);
}