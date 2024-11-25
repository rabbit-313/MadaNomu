INSERT INTO question (
    question_name, question, level, answer, choice_1, choice_2, choice_3, choice_4, created_at, updated_at
) VALUES
    -- 四則演算
    ('四則演算1', '15 + 5 × 12 は？', 1, 3, '120', '85', '75', '240', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('四則演算2', '50 ÷ 5 + 10 × 3 は？', 1, 4, '30', '80', '60', '40', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

    -- 数列問題
    ('数列問題1', '1, 3, 6, 10 の次の数字は？', 2, 2, '12', '15', '20', '14', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('数列問題2', '2, 4, 8, 16 の次の数字は？', 2, 1, '32', '64', '20', '24', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

    -- 文章問題
    ('文章問題1', 'リンゴが5個あり、3個食べました。残りはいくつ？', 3, 1, '2', '3', '5', '0', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('文章問題2', '太郎さんが10kmの道を30分で走りました。平均速度は何km/h？', 3, 4, '10', '15', '5', '20', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

    -- 記憶力問題
    ('記憶力問題1', '3, 7, 9, 2, 8。この中で3番目の数字は？', 4, 1, '7', '9', '8', '2', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('記憶力問題2', '以下の順番を覚えてください：5, 10, 15, 20。最後の数字は？', 4, 4, '5', '15', '10', '20', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

    -- その他
    ('その他1', '次のアルファベットの中で「母音」はどれ？A, B, C, D', 5, 1, 'A', 'B', 'C', 'D', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('その他2', '5人の子どもがいて、全員に同じ個数のキャンディを配るために最低何個必要？（1人に2個ずつ配る場合）', 5, 4, '10', '8', '12', '10', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
