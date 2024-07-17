document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const messageDiv = document.getElementById('message');

    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = new FormData(loginForm);
        const username = formData.get('username');
        const password = formData.get('password');

        try {
            const response = await fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });

            if (response.ok) {
                const result = await response.json();
                messageDiv.textContent = 'Login successful!';
                // 로그인 성공 시, 메인 페이지로 리다이렉트
                window.location.href = '/';
            } else {
                const error = await response.json();
                messageDiv.textContent = `Error: ${error.message}`;
            }
        } catch (error) {
            messageDiv.textContent = `Error: ${error.message}`;
        }
    });
});
