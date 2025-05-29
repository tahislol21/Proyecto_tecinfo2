document.addEventListener('DOMContentLoaded', () => {
    const questions = [
        {
            question: "¿Qué característica distingue a los anfibios de los reptiles?",
            options: {
                A: "Los anfibios tienen escamas y los reptiles no.",
                B: "Los anfibios pueden vivir tanto en agua como en tierra, y los reptiles son terrestres.",
                C: "Los anfibios son de sangre caliente y los reptiles de sangre fría."
            },
            correctAnswer: "B"
        },
        {
            question: "¿Cuál es el proceso de transformación que experimentan muchos anfibios, como las ranas, desde la fase larval hasta la adulta?",
            options: {
                A: "Fecundación",
                B: "Metamorfosis",
                C: "Hibernación"
            },
            correctAnswer: "B"
        },
        {
            question: "¿Qué tipo de piel suelen tener los anfibios?",
            options: {
                A: "Seca y escamosa",
                B: "Húmeda y permeable",
                C: "Con plumas"
            },
            correctAnswer: "B"
        },
        {
            question: "¿Qué grupo de anfibios es conocido por tener una cola durante toda su vida adulta?",
            options: {
                A: "Anuros (ranas y sapos)",
                B: "Ápodos (cecilias)",
                C: "Urodelos (salamandras y tritones)"
            },
            correctAnswer: "C"
        },
        {
            question: "¿Cuál es la principal forma en que los anfibios respiran cuando son adultos?",
            options: {
                A: "Solo por branquias",
                B: "Solo por pulmones",
                C: "Por pulmones y a través de su piel"
            },
            correctAnswer: "C"
        }
    ];

    let currentQuestionIndex = 0;
    let score = 0;
    const userAnswers = new Array(questions.length).fill(null); // Almacena las respuestas del usuario

    const questionText = document.getElementById('question-text');
    const optionsContainer = document.getElementById('options-container');
    const prevButton = document.getElementById('prev-button');
    const nextButton = document.getElementById('next-button');
    const submitButton = document.getElementById('submit-button');
    const questionCard = document.getElementById('question-card');
    const resultsCard = document.getElementById('results-card');
    const finalScoreSpan = document.getElementById('final-score');
    const totalQuestionsSpan = document.getElementById('total-questions');
    const restartButton = document.getElementById('restart-button');
    const scoreDetails = document.querySelector('.score-details');

    function loadQuestion() {
        const currentQuestion = questions[currentQuestionIndex];
        questionText.textContent = `${currentQuestionIndex + 1}. ${currentQuestion.question}`;
        optionsContainer.innerHTML = ''; // Limpia opciones anteriores

        // Crea los botones de opción
        Object.keys(currentQuestion.options).forEach(key => {
            const button = document.createElement('button');
            button.classList.add('option-button');
            button.textContent = `${key}) ${currentQuestion.options[key]}`;
            button.dataset.option = key;
            button.addEventListener('click', () => selectOption(button, key));
            optionsContainer.appendChild(button);

            // Si el usuario ya respondió esta pregunta, resalta su selección
            if (userAnswers[currentQuestionIndex] === key) {
                button.classList.add('selected');
            }
        });

        updateNavigationButtons();
    }

    function selectOption(selectedButton, option) {
        // Deselecciona cualquier opción previa para esta pregunta
        optionsContainer.querySelectorAll('.option-button').forEach(button => {
            button.classList.remove('selected');
        });

        // Selecciona la nueva opción
        selectedButton.classList.add('selected');
        userAnswers[currentQuestionIndex] = option; // Guarda la respuesta del usuario
    }

    function updateNavigationButtons() {
        prevButton.classList.toggle('hidden', currentQuestionIndex === 0);
        nextButton.classList.toggle('hidden', currentQuestionIndex === questions.length - 1);
        submitButton.classList.toggle('hidden', currentQuestionIndex !== questions.length - 1);

        // Deshabilitar el botón "Siguiente" si no se ha seleccionado una opción
        const selectedOption = userAnswers[currentQuestionIndex];
        nextButton.disabled = !selectedOption && currentQuestionIndex < questions.length -1;
    }

    function showResults() {
        score = 0;
        scoreDetails.innerHTML = ''; // Limpiar detalles de puntuación anteriores

        questions.forEach((question, index) => {
            const userAnswer = userAnswers[index];
            const isCorrect = userAnswer === question.correctAnswer;

            const resultParagraph = document.createElement('p');
            resultParagraph.classList.add('question-result');

            if (isCorrect) {
                score++;
                resultParagraph.innerHTML = `<strong>Pregunta ${index + 1}:</strong> ${question.question}<br>
                                             Tu respuesta: <span class="correct-answer">${userAnswer}) ${question.options[userAnswer]}</span> (Correcta)`;
            } else {
                resultParagraph.innerHTML = `<strong>Pregunta ${index + 1}:</strong> ${question.question}<br>
                                             Tu respuesta: <span class="incorrect-answer">${userAnswer ? `${userAnswer}) ${question.options[userAnswer]}` : 'Sin respuesta'}</span><br>
                                             Respuesta correcta: <span class="correct-answer">${question.correctAnswer}) ${question.options[question.correctAnswer]}</span>`;
            }
            scoreDetails.appendChild(resultParagraph);
        });

        finalScoreSpan.textContent = score;
        totalQuestionsSpan.textContent = questions.length;

        questionCard.classList.add('hidden');
        resultsCard.classList.remove('hidden');
    }

    function restartQuiz() {
        currentQuestionIndex = 0;
        score = 0;
        userAnswers.fill(null); // Reiniciar todas las respuestas
        resultsCard.classList.add('hidden');
        questionCard.classList.remove('hidden');
        loadQuestion(); // Cargar la primera pregunta nuevamente
    }

    // Event Listeners
    nextButton.addEventListener('click', () => {
        if (userAnswers[currentQuestionIndex]) { // Solo avanzar si hay una respuesta seleccionada
            if (currentQuestionIndex < questions.length - 1) {
                currentQuestionIndex++;
                loadQuestion();
            }
        } else {
            alert('Por favor, selecciona una opción antes de avanzar.');
        }
    });

    prevButton.addEventListener('click', () => {
        if (currentQuestionIndex > 0) {
            currentQuestionIndex--;
            loadQuestion();
        }
    });

    submitButton.addEventListener('click', () => {
        if (userAnswers[currentQuestionIndex]) { // Asegurarse de que la última pregunta tenga una respuesta
            showResults();
        } else {
            alert('Por favor, selecciona una opción antes de finalizar el quiz.');
        }
    });

    restartButton.addEventListener('click', restartQuiz);

    // Initial load
    loadQuestion();
});
