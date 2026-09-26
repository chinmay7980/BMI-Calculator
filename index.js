```javascript
document.getElementById('bmi-form').addEventListener('submit', function(event) {
  event.preventDefault();
  const weight = parseFloat(document.getElementById('weight').value);
  const height = parseFloat(document.getElementById('height').value);
  const bmi = weight / (height * height);
  document.getElementById('result').innerText = `Your BMI is ${bmi.toFixed(2)}.`;
});
```