const scienceFacts = [
    {
        category: "Space",
        title: "A Very Long Day",
        text: "One day on Venus is longer than one full year on Venus."
    },
    {
        category: "Animals",
        title: "Three Hearts!",
        text: "An octopus has three hearts and blue blood."
    },
    {
        category: "Human Body",
        title: "Your Amazing Skeleton",
        text: "An adult human body normally contains 206 bones."
    },
    {
        category: "Earth",
        title: "Frozen Water Grows",
        text: "Water expands when it freezes, which is why ice floats."
    },
    {
        category: "Physics",
        title: "Speedy Sound",
        text: "Sound travels faster through water than through air."
    },
    {
        category: "Plants",
        title: "Natural Food Makers",
        text: "Plants use sunlight to make their own food through photosynthesis."
    },
    {
        category: "Animals",
        title: "The Biggest Animal",
        text: "The blue whale is the largest animal known to have lived on Earth."
    },
    {
        category: "Chemistry",
        title: "A Liquid Metal",
        text: "Mercury is a metal that stays liquid at room temperature."
    },
    {
        category: "Space",
        title: "Jupiter Is Huge",
        text: "More than 1,300 Earths could fit inside Jupiter."
    },
    {
        category: "Human Body",
        title: "A Powerful Brain",
        text: "Your brain controls your movement, memory, senses, and emotions."
    }
];

document.addEventListener("DOMContentLoaded", () => {

    requireRole("student");

    const current = getCurrent("currentUser");

    if (!current) {
        return;
    }

    const student = getUserById(current.id);

    if (!student) {
        return;
    }

    // ================= Welcome =================

    document.getElementById("studentName").textContent =
        student.fullName;

    // ================= Data =================

    const results = getResultsByStudent(student.id);

    const availableExams =
        getAvailableExamsForStudent(student.id);

    // ================= Statistics =================

    document.getElementById("completedExams").textContent =
        results.length;

    document.getElementById("availableExams").textContent =
        availableExams.length;

    let average = 0;

    if (results.length > 0) {
        const total = results.reduce((sum, result) => {
            return sum + result.score;
        }, 0);

        average = Math.round(total / results.length);
    }

    document.getElementById("averageScore").textContent =
        average + "%";

    // ================= Available Exams =================

    const examContainer =
        document.getElementById("availableExamList");

    if (availableExams.length === 0) {

        examContainer.innerHTML = `
            <div class="col-12">

                <div class="alert alert-success">
                    No available exams.
                </div>

            </div>
        `;

    } else {

        availableExams
            .slice(0, 3)
            .forEach(exam => {

                examContainer.innerHTML += `
                    <div class="col-lg-4 col-md-6">

                        <div class="exam-card">

                            <img
                                src="../assets/images/dash-exam.png"
                                class="exam-image"
                                alt="${exam.title}"
                            >

                            <div class="exam-body">

                                <h5 class="exam-title">
                                    ${exam.title}
                                </h5>

                                <div class="exam-info">

                                    <span>
                                        <i class="bi bi-calendar-event"></i>
                                        ${exam.dateTime}
                                    </span>

                                </div>

                                <div class="exam-info">

                                    <span>
                                        <i class="bi bi-clock"></i>
                                        ${exam.duration} Minutes
                                    </span>

                                    <span>
                                        <i class="bi bi-question-circle"></i>
                                        ${exam.numQuestions} Questions
                                    </span>

                                </div>

                                <a href="take-exam.html?id=${exam.id}">

                                    <button class="start-btn">
                                        Start Exam
                                    </button>

                                </a>

                            </div>

                        </div>

                    </div>
                `;
            });
    }

    // ================= Recent Results =================

    const table =
        document.getElementById("resultsTableBody");

    if (results.length === 0) {

        table.innerHTML = `
            <tr>

                <td colspan="5" class="text-center">
                    No completed exams yet.
                </td>

            </tr>
        `;

    } else {

        results
            .sort((a, b) => {
                return (
                    new Date(b.submittedAt) -
                    new Date(a.submittedAt)
                );
            })
            .slice(0, 5)
            .forEach(result => {

                const exam =
                    getExamById(result.examId);

                if (!exam) {
                    return;
                }

                table.innerHTML += `
                    <tr>

                        <td>
                            ${exam.title}
                        </td>

                        <td class="score">
                            ${result.score}%
                        </td>

                        <td>
                            ${result.grade}
                        </td>

                        <td>

                            <span
                                class="status ${
                                    result.passed
                                        ? "pass"
                                        : "fail"
                                }"
                            >
                                ${
                                    result.passed
                                        ? "Passed"
                                        : "Failed"
                                }
                            </span>

                        </td>

                        <td>

                            <a
                                href="history.html"
                                class="review-btn"
                            >
                                Review
                            </a>

                        </td>

                    </tr>
                `;
            });
    }

    // ================= Science Fact =================

    showRandomScienceFact();

    const factButton =
        document.getElementById("newScienceFactButton");

    if (factButton) {
        factButton.addEventListener(
            "click",
            showRandomScienceFact
        );
    }

});

function showRandomScienceFact() {

    const category =
        document.getElementById("scienceFactCategory");

    const title =
        document.getElementById("scienceFactTitle");

    const text =
        document.getElementById("scienceFactText");

    if (!category || !title || !text) {
        return;
    }

    const randomIndex =
        Math.floor(Math.random() * scienceFacts.length);

    const fact =
        scienceFacts[randomIndex];

    category.textContent =
        fact.category;

    title.textContent =
        fact.title;

    text.textContent =
        fact.text;
}