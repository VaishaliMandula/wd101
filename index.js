<script>
document.addEventListener('DOMContentLoaded', function () {
            loadEntries();
           
        });
        function submitForm() {
            
            var name = document.getElementById("name").value;
            var email = document.getElementById("email").value;
            var password = document.getElementById("password").value;
            var dob = document.getElementById("dob").value;
            var terms = document.getElementById("terms").checked;

            
            if (!validateEmail(email)) {
                alert("Invalid email address");
                return;
            }

            var age = calculateAge(dob);
            if (age < 18 || age > 55) {
                alert("Age must be between 18 and 55");
                return;
            }

            
            var table = document.getElementById("userTable").getElementsByTagName('tbody')[0];
            var row = table.insertRow(0);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            var cell3 = row.insertCell(2);
            var cell4 = row.insertCell(3);
            var cell5 = row.insertCell(4);

            cell1.innerHTML = name;
            cell2.innerHTML = email;
            cell3.innerHTML = password;
            cell4.innerHTML = dob;
            cell5.innerHTML = terms ? 'Yes' : 'No';

            // Clear the form
            document.getElementById("registrationForm").reset();
        }


        function validateEmail(email) {
            // Simple email validation
            var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        }

        function calculateAge(dob) {
            // Calculate age based on the date of birth
            var dobDate = new Date(dob);
            var currentDate = new Date();
            var age = currentDate.getFullYear() - dobDate.getFullYear();
            var monthDiff = currentDate.getMonth() - dobDate.getMonth();

            if (monthDiff < 0 || (monthDiff === 0 && currentDate.getDate() < dobDate.getDate())) {
                age--;
            }

            return age;
        }
        function saveEntries() {
            // Save entries to localStorage
            var entries = getEntriesFromTable();
            localStorage.setItem('userEntries', JSON.stringify(entries));
        }
        function loadEntries() {
            // Load entries from localStorage and populate the table
            var storedEntries = localStorage.getItem('userEntries');

            if (storedEntries) {
                var entries = JSON.parse(storedEntries);
                populateTable(entries);
            }
        }
        function getEntriesFromTable() {
            // Extract entries from the table
            var table = document.getElementById("userTable").getElementsByTagName('tbody')[0];
            var entries = [];

            for (var i = 0; i < table.rows.length; i++) {
                var entry = {
                    name: table.rows[i].cells[0].innerHTML,
                    email: table.rows[i].cells[1].innerHTML,
                    password: table.rows[i].cells[2].innerHTML,
                    dob: table.rows[i].cells[3].innerHTML,
                    terms: table.rows[i].cells[4].innerHTML === 'Yes' ? true : false
                };
                entries.push(entry);
            }

            return entries;
        }

        function populateTable(entries) {
            // Populate the table with entries
            var table = document.getElementById("userTable").getElementsByTagName('tbody')[0];
            table.innerHTML = "";

            for (var i = 0; i < entries.length; i++) {
                var row = table.insertRow(0);
                var cell1 = row.insertCell(0);
                var cell2 = row.insertCell(1);
                var cell3 = row.insertCell(2);
                var cell4 = row.insertCell(3);
                var cell5 = row.insertCell(4);

                cell1.innerHTML = entries[i].name;
                cell2.innerHTML = entries[i].email;
                cell3.innerHTML = entries[i].password;
                cell4.innerHTML = entries[i].dob;
                cell5.innerHTML = entries[i].terms ? 'Yes' : 'No';
            }
        }
    </script>
