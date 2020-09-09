let button = document.getElementById('action');
button.addEventListener('click', function() {
    let birthYear = prompt("what year were you born...Good friend?");
    let ageInDays = (2020 - birthYear) * 365; 
    let h1 = document.createElement('h1');
    let textAnswer = document.createTextNode('You are '+ ageInDays + 'days old');
    h1.setAttribute('id', 'ageInDays');
    h1.appendChild(textAnswer);
    document.getElementById('flex-box-result').appendChild(h1);
    console.log(ageInDays);
});

const button2 = document.getElementById('Reset');
button2.addEventListener('click', function() {
  const result = document.getElementById('flex-box-result');
  const child = result.childNodes[0]
  if (child) result.removeChild(child);
})