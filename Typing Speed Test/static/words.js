const words = [
 "practice","typing","speed","keyboard","python","flask","developer",
 "focus","accuracy","performance","learn","improve","skill","project",
 "student","computer","science","programming","logic","future"
];

function getWords(count = 35) {
    let result = [];
    for (let i = 0; i < count; i++) {
        result.push(words[Math.floor(Math.random() * words.length)]);
    }
    return result.join(" ");
}
