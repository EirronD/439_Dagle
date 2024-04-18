document.addEventListener('DOMContentLoaded', function () {
    const flagImg = document.getElementById('flag-image');
    const guessInput = document.getElementById('country-input');
    const submitBtn = document.getElementById('submit-btn');
    const nextBtn = document.getElementById('next-btn');
    const resultMsg = document.getElementById('result');

    let flags = [];
    let currentQuestion = 0;

    function fetchRandomFlag() {
        fetch('https://restcountries.com/v3.1/all')
            .then(response => response.json())
            .then(data => {
                const randomIndex = Math.floor(Math.random() * data.length);
                const flagUrl = data[randomIndex].flags.png;
                const countryName = data[randomIndex].name.common;
                flagImg.src = flagUrl;
                flagImg.dataset.country = countryName;
                flags.push({ image: flagUrl, countryName: countryName.toLowerCase() });
            })
            .catch(error => console.log('Error fetching data: ', error));
    }

    function checkGuess() {
        const userGuess = guessInput.value.trim().toLowerCase();
        const correctAnswer = flagImg.dataset.country.toLowerCase();
        const ca = flagImg.dataset.country;

        if (userGuess === correctAnswer) {
            resultMsg.textContent = 'Correct!';
            resultMsg.style.color = 'green';
        } else {
            resultMsg.textContent = `Incorrect. The correct answer is ${ca}. Try again.`;
            resultMsg.style.color = 'red';
        }
    }

    function nextQuestion() {
        fetchRandomFlag();
        resultMsg.textContent = '';
        guessInput.value = '';
    }

    submitBtn.addEventListener('click', checkGuess);
    nextBtn.addEventListener('click', nextQuestion);

    fetchRandomFlag();
});
