INSERT INTO question (
    question_name, level, answer, choice_1, choice_2, choice_3, choice_4, created_at, updated_at
) VALUES
    ('What is 2 + 2?', 1, 4, '3', '4', '5', '6', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('What is the capital of France?', 2, 2, 'Berlin', 'Paris', 'Rome', 'Madrid', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Which planet is known as the Red Planet?', 3, 3, 'Earth', 'Venus', 'Mars', 'Jupiter', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('What is the square root of 16?', 1, 4, '3', '4', '6', '8', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Who wrote "Hamlet"?', 4, 1, 'Shakespeare', 'Dickens', 'Hemingway', 'Tolstoy', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
