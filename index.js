function bmi() {
    const h =document.getElementById('height').value;
    const w =document.getElementById('weight').value;
    if(h=='' || w==''){
        document.getElementById('result').innerHTML =``;
        document.getElementById('error').innerHTML = `Please Enter Height and Weight`
    }else{
        document.getElementById('error').innerHTML =``
        const bmi =w/(h/100 *h/100);
        const total =bmi.toFixed(2);
        document.getElementById('result').innerHTML =`Your BMI is ${total}`
    }
    
}