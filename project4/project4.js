document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registrationForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    
    const emailError = document.getElementById('email-error');
    const passwordError = document.getElementById('password-error');
    
    const successBox = document.getElementById('successBox');
    const jsonPayloadDisplay = document.getElementById('jsonPayload');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[#?!@$%^&*-]).{8,}$/;

    function validateEmail() {
        const value = emailInput.value.trim();

        if (value === '') {
            showError(emailInput, emailError, 'Email infrastructure error: Field cannot be empty.');
            return false;
        } else if (!emailRegex.test(value)) {
            showError(emailInput, emailError, 'Syntax violation: Please enter a valid email format (e.g., name@domain.com).');
            return false;
        } else {
            clearError(emailInput, emailError);
            return true;
        }
    }

    function validatePassword() {
        const value = passwordInput.value;

        if (value === '') {
            showError(passwordInput, passwordError, 'Security protocol error: Password cannot be empty.');
            return false;
        } else if (!passwordRegex.test(value)) {
            showError(passwordInput, passwordError, 'Policy failure: Must be >= 8 chars, with 1 Uppercase, 1 Lowercase, 1 Digit, and 1 Special symbol.');
            return false;
        } else {
            clearError(passwordInput, passwordError);
            return true;
        }
    }

    function showError(inputElement, errorSpan, message) {
        inputElement.classList.remove('valid-field');
        inputElement.classList.add('invalid-field');
        
        inputElement.setAttribute('aria-invalid', 'true');
        errorSpan.textContent = message;
    }

    function clearError(inputElement, errorSpan) {
        inputElement.classList.remove('invalid-field');
        inputElement.classList.add('valid-field');
        
        inputElement.setAttribute('aria-invalid', 'false');
        errorSpan.textContent = '';
    }

    emailInput.addEventListener('blur', validateEmail);
    passwordInput.addEventListener('blur', validatePassword);

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const isEmailValid = validateEmail();
        const isPasswordValid = validatePassword();

        if (isEmailValid && isPasswordValid) {
            const payload = {
                email: emailInput.value.trim(),
                password: passwordInput.value, 
                timestamp: new Date().toISOString()
            };

            jsonPayloadDisplay.textContent = JSON.stringify(payload, null, 4);
            successBox.style.display = 'block';
            
            console.log('Payload Approved & Dispatched:', payload);
        } else {
            successBox.style.display = 'none';
            console.warn('Submission Blocked: Payload contains structural failures.');
        }
    });
});