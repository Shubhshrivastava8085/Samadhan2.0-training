function findhighestmarks(marks) {
    if (marks.length === 0) return null;

    let highest = marks[0];
    for (let i = 1; i < marks.length; i++) {
        if (marks[i] > highest) {
            highest = marks[i];
        }
    }
    return highest;
}
