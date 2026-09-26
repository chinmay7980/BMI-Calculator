<script>
function login() {
  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;
  if (email === 'admin@example.com' && password === 'password123') {
    alert('Login successful!');
  } else {
    alert('Invalid credentials. Please try again.');
  }
}
</script>