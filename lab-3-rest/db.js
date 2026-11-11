const users = [
    { id: 1, username: "admin", password: "admin123" },
    { id: 2, username: "student", password: "student123" },

];

const books = [
    { id: 1, title: "The Pragmatic Programmer", author: "Andrew Hunt", year: 1999 },
    { id: 2, title: "Clean code", author: "Robert C. Martin", year: 2008 },
    { id: 3, title: "You don't know JS", author: "Kyle Simpson", year: 2004 },
]

/// Used to generate ids for new books
let nextBookId = 4;

function getNextBookId() {
    return nextBookId++;
}

module.exports = { users, books, getNextBookId };
