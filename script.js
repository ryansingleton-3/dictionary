const body = document.querySelector("body");
const inputDiv = document.getElementById("input-div");
const inputField = document.querySelector("input");
const APIKey = "1a157763-6e12-40f7-811b-025097dc0395";

inputField.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    let word = inputField.value;
    getDictionaryData(word);
    inputField.value = "";
  }
});

async function getDictionaryData(word) {
  const resp = await fetch(
    `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=${APIKey}`
  );
  const data = await resp.json();
  addData(data, word);
}

const addData = (data, word) => {
  function capitalizeFirstLetterOfString(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  word = capitalizeFirstLetterOfString(word);

  const partSpeech = capitalizeFirstLetterOfString(data[0].fl);
  const definition = data[0].shortdef[0];

  const contentSection = document.getElementById("words");

  const wordCard = document.createElement("div");
  wordCard.classList.add(
    "mx-auto",
    "text-left",
    "text-cyan-300",
    "border-white",
    "border-4",
    "p-4",
    "mb-4",
    "rounded-md",
    "text-white",
    "shadow-md",
    "rounded-lg",
    "word-card"
  );

  const wordHeader = document.createElement("h2");
  wordHeader.classList.add("text-xl", "font-bold");
  wordHeader.textContent = word;
  wordHeader.style.color = "white";

  const partSpeechDiv = document.createElement("div");
  partSpeechDiv.classList.add("text-white", "text-lg", "font-bold", "mb-2");
  partSpeechDiv.textContent = `Part of Speech: ${partSpeech}`;

  const defDiv = document.createElement("div");
  defDiv.classList.add("text-white", "text-lg");
  defDiv.textContent = definition;

  wordCard.appendChild(wordHeader);
  wordCard.appendChild(partSpeechDiv);
  wordCard.appendChild(defDiv);

  contentSection.appendChild(wordCard);

  console.log(data);
  console.log(`Part of Speech: ${data[0].fl}`);
};
