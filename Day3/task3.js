function calculateMarks(marks) {
    let total = 0;
    for (let i = 0; i < marks.length; i++) {
        total += marks[i];
    }

    let average = total / marks.length;
    let grade = '';

    if (average >= 90) {
        grade = 'A';
    } else if (average >= 75) {
        grade = 'B';
    } else if (average >= 60) {
        grade = 'C';
    } else if (average >= 40) {
        grade = 'D';
    } else {
        grade = 'F';
    }

    return {
        total: total,
        average: average,
        grade: grade
    };
}

