document.querySelector('.ride-form').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const fields = document.querySelectorAll('.input-field');
    let allFilled = true;
  
    fields.forEach((field) => {
      if (!field.value.trim()) {
        allFilled = false;
        field.style.borderColor = 'red';
      } else {
        field.style.borderColor = '#4facfe';
      }
    });
  
    if (allFilled) {
      alert('Searching for rides...');
    } else {
      alert('Please fill out all the fields.');
    }
  });  