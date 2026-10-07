document.querySelectorAll('.auth-form').forEach((form) => {
    const mode = form.dataset.authMode;
    const message = form.querySelector('.auth-message');

    if (mode === 'register') {
        const password = form.querySelector('#register-password');
        const confirmPassword = form.querySelector('#confirm-password');

        const validatePasswordMatch = () => {
            const passwordsMatch = password.value === confirmPassword.value;
            confirmPassword.setCustomValidity(passwordsMatch ? '' : 'Passwords must match.');
        };

        password.addEventListener('input', validatePasswordMatch);
        confirmPassword.addEventListener('input', validatePasswordMatch);
    }

    form.addEventListener('input', () => {
        message.textContent = '';
    });

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        message.textContent = mode === 'register'
            ? 'Details are valid. Account creation is not connected yet.'
            : 'Details are valid. Login is not connected yet.';
    });
});
