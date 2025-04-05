CREATE TABLE resume (
    id SERIAL PRIMARY KEY,
    title TEXT,
    "resumeId" TEXT UNIQUE,
    "userEmail" TEXT UNIQUE,
    "userName" TEXT,
    "firstName" TEXT,
    "lastName" TEXT,
    address TEXT,
    "jobTitle" TEXT,
    phone TEXT,
    email TEXT,
    summery TEXT,
    edu_id INTEGER REFERENCES education(id) UNIQUE,
    exp_id INTEGER REFERENCES experience(id) UNIQUE,
    skill_id INTEGER REFERENCES skills(id) UNIQUE,
    "themeColor" TEXT
);

ALTER TABLE skills
ADD COLUMN name TEXT,
ADD COLUMN rating NUMERIC;

ALTER TABLE experience
ADD COLUMN title TEXT,
ADD COLUMN "companyName" TEXT,
ADD COLUMN city TEXT,
ADD COLUMN state TEXT,
ADD COLUMN "startDate" DATE,
ADD COLUMN "endDate" DATE,
ADD COLUMN "workSummery" TEXT;

ALTER TABLE education
ADD COLUMN university TEXT,
ADD COLUMN degree TEXT,
ADD COLUMN major TEXT,
ADD COLUMN "startDate" DATE,
ADD COLUMN "endDate" DATE,
ADD COLUMN description TEXT;
