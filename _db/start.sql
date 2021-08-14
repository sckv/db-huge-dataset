CREATE TABLE users(
    id           int PRIMARY KEY,
    first_name   varchar(25) NOT NULL,
    last_name    varchar(25) NOT NULL
);

CREATE TABLE merchants(
    id              int PRIMARY KEY,
    display_name    varchar(255) NOT NULL,
    icon_url        text,
    funny_gif_url   text
);

CREATE TABLE transactions(
    id              bigint PRIMARY KEY, -- optional serial type if we need to autoinc
    user_id         int NOT NULL,
    merchant_id     int NOT NULL,
    date            timestamp,
    amount          numeric,
    description     text
);

COPY users(id, first_name, last_name)
FROM '/home/sqls/users.csv'
DELIMITER ';'
CSV HEADER;

COPY merchants(id, display_name, icon_url)
FROM '/home/sqls/merchants.csv'
DELIMITER ';'
CSV HEADER;

COPY transactions_n(id, user_id, date, amount, description, merchant_id)
FROM '/home/sqls/transactions.csv'
DELIMITER ';'
CSV HEADER;

CREATE INDEX idx_user_id ON transactions(user_id);
CREATE INDEX idx_merchant_id ON transactions(merchant_id);
CREATE INDEX idx_date ON transactions USING brin (date);
ALTER INDEX idx_date set (pages_per_range = 64, autosummarize = 1);
CREATE INDEX idx_user_date_n ON transactions (user_id, date);