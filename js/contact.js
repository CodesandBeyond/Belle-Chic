document.addEventListener('DOMContentLoaded', function() {
  const inputs = document.querySelectorAll(".input");
  const form = document.getElementById('contactForm');
  const popup = document.getElementById('successPopup');
  const closePopup = popup.querySelector('.close');

  function focusFunc() {
    let parent = this.parentNode;
    parent.classList.add("focus");
  }
  
  function blurFunc() {
    let parent = this.parentNode;
    if (this.value == "") {
      parent.classList.remove("focus");
    }
  }
  
  inputs.forEach((input) => {
    input.addEventListener("focus", focusFunc);
    input.addEventListener("blur", blurFunc);
  }); // Added closing bracket here
  
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Reset error messages
    document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
  
    // Validate form
    let isValid = true;
    form.querySelectorAll('input[required], textarea[required]').forEach(field => {
      if (!field.value.trim()) {
        isValid = false;
        field.nextElementSibling.nextElementSibling.nextElementSibling.textContent = 'This field is required';
      }
    });
  
    if (isValid) {
      // Show success popup
      popup.style.display = 'block';
      
      // Reset form
      form.reset();
    }
  });

  closePopup.addEventListener('click', function() {
    popup.style.display = 'none';
  });

  window.addEventListener('click', function(e) {
    if (e.target == popup) {
      popup.style.display = 'none';
    }
  });
});
