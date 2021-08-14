DROP TABLE IF EXISTS test_merchants;
DROP TABLE IF EXISTS test_transactions;

CREATE TABLE test_merchants(
    id              int PRIMARY KEY,
    display_name    varchar(255) NOT NULL,
    icon_url        text,
    funny_gif_url   text
);

CREATE TABLE test_transactions(
    id              int PRIMARY KEY, -- optional serial type if we need to autoinc
    user_id         int NOT NULL,
    merchant_id     int NOT NULL,
    date            timestamp,
    amount          numeric,
    description     text
);

INSERT INTO 
  test_merchants (id, display_name, icon_url, funny_gif_url) 
VALUES 
  (1, 'test_merchant', 'http://example.com/icon.png', 'http://example.com/funny_gif.gif'),
  (2, 'test_merchant2', 'http://example.com/icon2.png', 'http://example.com/funny_gif2.gif'),
  (3, 'test_merchant3', 'http://example.com/icon3.png', 'http://example.com/funny_gif3.gif');

INSERT INTO 
  test_transactions (id, user_id, merchant_id, date, amount, description) 
VALUES
    (1, 1, 1, '2018-01-01', 5.00, 'test1'),
    (2, 1, 1, '2018-01-02', 5.00, 'test2'),
    (3, 1, 2, '2018-01-03', 20.00, 'test3'),
    (4, 1, 2, '2018-01-04', 20.00, 'test4'),
    (5, 1, 1, '2018-01-05', 5.00, 'test5'),
    (6, 1, 1, '2018-01-06', 7.00, 'test6'),
    (7, 1, 3, '2018-01-07', 50.00, 'test7'),
    (8, 1, 3, '2018-01-01', 50.00, 'test8'),
    (9, 1, 3, '2018-01-02', 80.00, 'test9'),
    (10, 2, 1, '2018-01-01', 2.00, 'test10'),
    (11, 2, 1, '2018-01-02', 3.00, 'test11'),
    (12, 3, 1, '2018-01-02', 50.00, 'test12'),
    (13, 3, 1, '2018-01-03', 10.00, 'test13'),
    (14, 4, 1, '2018-01-03', 77.00, 'test14'),
    (15, 4, 1, '2018-01-03', 25.30, 'test15'),
    (16, 4, 3, '2018-01-04', 100.00, 'test14'),
    (17, 4, 3, '2018-01-04', 100.00, 'test15'),
    (18, 2, 2, '2018-01-03', 22.00, 'test16'),
    (19, 2, 2, '2018-01-06', 15.00, 'test17');