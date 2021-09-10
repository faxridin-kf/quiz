document.addEventListener("DOMContentLoaded", function () {
  const btnOpenModal = document.querySelector("#btnOpenModal");
  const modalBlock = document.querySelector("#modalBlock");
  const closeModal = document.querySelector("#closeModal");
  const questionTitle = document.querySelector("#question");
  const formAnswers = document.querySelector("#formAnswers");
  const prevBtn = document.querySelector("#prev");
  const nextBtn = document.querySelector("#next");
  const sendBtn = document.querySelector("#send");
  const questions = [
    {
      question: "Какого цвета бургер?",
      answers: [
        {
          title: "Стандарт",
          url: "./image/burger.png",
        },
        {
          title: "Черный",
          url: "./image/burgerBlack.png",
        },
      ],
      type: "radio",
    },
    {
      question: "Из какого мяса котлета?",
      answers: [
        {
          title: "Курица",
          url: "./image/chickenMeat.png",
        },
        {
          title: "Говядина",
          url: "./image/beefMeat.png",
        },
        {
          title: "Свинина",
          url: "./image/porkMeat.png",
        },
      ],
      type: "radio",
    },
    {
      question: "Дополнительные ингредиенты?",
      answers: [
        {
          title: "Помидор",
          url: "./image/tomato.png",
        },
        {
          title: "Огурец",
          url: "./image/cucumber.png",
        },
        {
          title: "Салат",
          url: "./image/salad.png",
        },
        {
          title: "Лук",
          url: "./image/onion.png",
        },
      ],
      type: "checkbox",
    },
    {
      question: "Добавить соус?",
      answers: [
        {
          title: "Чесночный",
          url: "./image/sauce1.png",
        },
        {
          title: "Томатный",
          url: "./image/sauce2.png",
        },
        {
          title: "Горчичный",
          url: "./image/sauce3.png",
        },
      ],
      type: "radio",
    },
  ];

  btnOpenModal.addEventListener("click", () => {
    console.log(modalBlock);
    modalBlock.classList.add("d-block");
    playTest();
  });
  closeModal.addEventListener("click", () => {
    modalBlock.classList.remove("d-block");
  });

  const playTest = () => {
    const finalAnswers = [];
    let numberQuestion = 0;
    const renderAnswes = (index) => {
      questions[index].answers.forEach((answer) => {
        const answerItem = document.createElement("div");
        answerItem.classList.add(
          "answers-item",
          "d-flex",
          "flex-content-center"
        );
        answerItem.innerHTML = `
        <input type="${questions[index].type}" id="${answer.title}" name="answer" value="${answer.title}" class="d-none">
                <label for="${answer.title}" class="d-flex flex-column justify-content-between">
                  <img class="answerImg" src="${answer.url}"alt="burger">
                  <span>${answer.title}</span>
                </label>
        `;
        formAnswers.appendChild(answerItem);
      });
    };
    const renderQuestions = (indexQuestion) => {
      formAnswers.innerHTML = "";
      if (numberQuestion >= 0 && numberQuestion <= questions.length - 1) {
        questionTitle.textContent = `${questions[indexQuestion].question}`;
        renderAnswes(indexQuestion);
        prevBtn.classList.remove("d-none");
        nextBtn.classList.remove("d-none");
        sendBtn.classList.add("d-none");
      }
      if (numberQuestion === 0) {
        prevBtn.classList.add("d-none");
      }

      if (numberQuestion === questions.length) {
        prevBtn.classList.add("d-none");
        sendBtn.classList.add("d-block");
        nextBtn.classList.add("d-none");
        formAnswers.innerHTML = `
     <div class="input-group mb-3">
      <span class="input-group-text" id="numberPhone">номер телефона</span>
      <input type="phone" class="form-control" id='numberPhone'>
    </div>
        `;
      }
      if (numberQuestion === questions.length + 1) {
        formAnswers.textContent = "спасибо за пройденной тест";
        setTimeout(() => {
          modalBlock.classList.remove("d-block");
        }, 2000);
      }
    };
    renderQuestions(numberQuestion);

    const checkAnswer = () => {
      const obj = {};
      const inputs = [...formAnswers.elements].filter(
        (input) => input.checked || input.id === "numberPhone"
      );
      inputs.forEach((input, index) => {
        if (numberQuestion >= 0 && numberQuestion <= questions.length - 1) {
          obj[`${index}_${questions[numberQuestion].question}`] = input.value;
        }
        if (numberQuestion == questions.length) {
          obj["Номер телефона"] = input.value;
        }
      });
      finalAnswers.push(obj);
    };
    nextBtn.onclick = () => {
      checkAnswer();
      numberQuestion++;
      renderQuestions(numberQuestion);
    };
    prevBtn.onclick = () => {
      numberQuestion--;
      renderQuestions(numberQuestion);
    };
    sendBtn.onclick = () => {
      numberQuestion++;
      renderQuestions(numberQuestion);
      checkAnswer();
      console.log(finalAnswers);
    };
  };
});
