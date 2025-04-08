CREATE TABLE resume (
    id SERIAL PRIMARY KEY,
    title TEXT,
    "documentId" TEXT UNIQUE,
    "userEmail" TEXT UNIQUE,
    "userName" TEXT,
    "firstName" TEXT,
    "lastName" TEXT,
    address TEXT,
    "jobTitle" TEXT,
    phone TEXT,
    email TEXT,
    summery TEXT,
    -- edu_id INTEGER REFERENCES education(id) UNIQUE,
    -- exp_id INTEGER REFERENCES experience(id) UNIQUE,
    -- skill_id INTEGER REFERENCES skills(id) UNIQUE,
    "themeColor" TEXT
);


ALTER TABLE skills
ALTER COLUMN name SET DATA TYPE TEXT[] USING ARRAY[name],
ALTER COLUMN rating SET DATA TYPE NUMERIC[] USING ARRAY[rating];

-- ALTER TABLE skills
-- ADD COLUMN name TEXT,
-- ADD COLUMN rating NUMERIC;

ALTER TABLE experience
ALTER COLUMN title SET DATA TYPE TEXT[] USING ARRAY[title],
ALTER COLUMN "companyName" SET DATA TYPE TEXT[] USING ARRAY["companyName"],
ALTER COLUMN city SET DATA TYPE TEXT[] USING ARRAY[city],
ALTER COLUMN state SET DATA TYPE TEXT[] USING ARRAY[state],
ALTER COLUMN "startDate" SET DATA TYPE DATE[] USING ARRAY["startDate"],
ALTER COLUMN "endDate" SET DATA TYPE DATE[] USING ARRAY["endDate"],
ALTER COLUMN "workSummery" SET DATA TYPE TEXT[] USING ARRAY["workSummery"];


-- ALTER TABLE experience
-- ADD COLUMN title TEXT,
-- ADD COLUMN "companyName" TEXT,
-- ADD COLUMN city TEXT,
-- ADD COLUMN state TEXT,
-- ADD COLUMN "startDate" DATE,
-- ADD COLUMN "endDate" DATE,
-- ADD COLUMN "workSummery" TEXT;
-- ADD COLUMN "documntId" TEXT,

ALTER TABLE education
ALTER COLUMN university SET DATA TYPE TEXT[] USING ARRAY[university],
ALTER COLUMN degree SET DATA TYPE TEXT[] USING ARRAY[degree],
ALTER COLUMN major SET DATA TYPE TEXT[] USING ARRAY[major],
ALTER COLUMN "startDate" SET DATA TYPE DATE[] USING ARRAY["startDate"],
ALTER COLUMN "endDate" SET DATA TYPE DATE[] USING ARRAY["endDate"],
ALTER COLUMN description SET DATA TYPE TEXT[] USING ARRAY[description];


-- ALTER TABLE education
-- ADD COLUMN university TEXT,
-- ADD COLUMN degree TEXT,
-- ADD COLUMN major TEXT,
-- ADD COLUMN "startDate" DATE,
-- ADD COLUMN "endDate" DATE,
-- ADD COLUMN description TEXT;
