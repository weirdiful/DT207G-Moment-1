const createTableSQL = `
  CREATE TABLE IF NOT EXISTS courses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    coursecode TEXT NOT NULL,
    coursename TEXT NOT NULL,
    syllabus TEXT NOT NULL,
    progression TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
`;

db.run(createTableSQL);
