// This file is used to share data between the main process and the Ai model to avoid circular dependency.
export let dataForAts = {
    buffer: null,
    score: 0,
    fetched: false
};

export function setBuffer(buffer) {
    dataForAts.buffer = buffer;
    dataForAts.score = 0; // Resetting score when setting a new buffer;
    dataForAts.fetched = false; // Reset fetched to false when setting a new buffer
}

export function setScore(score) {
    dataForAts.score = score;
    dataForAts.fetched = true; // Set fetched to true when score is set
}

