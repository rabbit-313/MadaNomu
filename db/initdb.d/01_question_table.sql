CREATE TABLE question (
    id SERIAL PRIMARY KEY,
    question_name VARCHAR(256) NOT NULL,
    question VARCHAR(256) NOT NULL,
    level INTEGER,
    answer INTEGER NOT NULL,
    choice_1 VARCHAR(256) NOT NULL,
    choice_2 VARCHAR(256) NOT NULL,
    choice_3 VARCHAR(256) NOT NULL,
    choice_4 VARCHAR(256) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL

);
