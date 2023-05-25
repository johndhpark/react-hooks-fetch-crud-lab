import React from "react";

function QuestionItem({ question, setQuestions }) {
  const { id, prompt, answers, correctIndex } = question;

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  const onCorrectAnswerChange = (e) => {
    const { value } = e.target;

    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        correctIndex: parseInt(value),
      }),
    })
      .then((res) => res.json())
      .then((updatedQuestion) => {
        setQuestions((prevQuestions) =>
          prevQuestions.map((currQuestion) => {
            if (currQuestion.id !== question.id) return currQuestion;
            return {
              ...currQuestion,
              correctIndex: value,
            };
          })
        );
      });
  };

  const onQuestionDeleteClick = (e) => {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        setQuestions((prevQuestions) =>
          prevQuestions.filter(
            (currQuestion) => currQuestion.id !== question.id
          )
        );
      });
  };

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex} onChange={onCorrectAnswerChange}>
          {options}
        </select>
      </label>
      <button onClick={onQuestionDeleteClick}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
