const SELECTORS = {
    backButton: '.game-controls-secondary-button-icon.icon-font-chess.chevron-left',
    shareButton: '.game-controls-secondary-button-icon.icon-font-chess.share',
    closeButton: '.icon-font-chess.x.ui_outside-close-icon',
    fenInputField: '.share-menu-tab-pgn-section > .ui_v5-input-component',
};

function clickElement(selector) {
    const element = document.querySelector(selector);
    element?.click();
}

async function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function goBackOneMove() {
    clickElement(SELECTORS.backButton);
}

function openFENmodal() {
    clickElement(SELECTORS.shareButton);
}

function closeFENmodal() {
    clickElement(SELECTORS.closeButton);
}

async function grabFEN() {
    goBackOneMove();
    openFENmodal();

    await wait(200);

    const fenInputField = document.querySelector(SELECTORS.fenInputField);
    const fenValue = fenInputField?.value;

    closeFENmodal();

    return fenValue;
}

const body = document.querySelector('body');
const ankiButton = document.createElement('button');
ankiButton.id = "ankiButton";
ankiButton.textContent = "Analyse";

ankiButton.addEventListener('click', async function () {
    const FEN = await grabFEN();

    if(!FEN) return alert('Failed to retrieve FEN.');

    window.open(`https://lichess.org/analysis/standard/${FEN}`, '_blank')
});

body.appendChild(ankiButton);
