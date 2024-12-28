// JavaScript to handle form validations or dynamic interactions can be added here
document.querySelector('form').addEventListener('submit', function(e) {
    let donationAmount = document.querySelector('input[name="amount"]:checked');
    if (!donationAmount) {
        alert("Please select a donation amount.");
        e.preventDefault(); // Prevent form submission if no amount is selected
    }
});
