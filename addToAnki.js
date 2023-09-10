async function sendToAnki(PGN) {
  const response = await fetch("http://127.0.0.1:8765", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      action: "addNote",
      version: 6,
      params: {
        note: {
          deckName: "Chess (flip=false)",
          modelName: "Chess 2.0 flip false",
          fields: {
            PGN,
          },
          options: {
            allowDuplicate: false,
            duplicateScope: "deck",
            duplicateScopeOptions: {
              deckName: "Chess (flip=false)",
              checkChildren: false,
              checkAllModels: false,
            },
          },
        },
      },
    }),
  });

  const responseData = await response.json();
  return responseData.result;
}

const body = document.querySelector("body");
const ankiButton = document.createElement("button");

ankiButton.id = "ankiButton";
ankiButton.textContent = "Add to Anki";

ankiButton.addEventListener("click", async () => {
  const PGN = document.querySelector(".pgn .copyable").value;

  await sendToAnki(PGN);
  window.close();
});

body.append(ankiButton);
