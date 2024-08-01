use banchan;

-- apt table
INSERT INTO apt (apt_code, addr, apartment_name, total_units) VALUES
('APT001', '123 Main St', 'Sunset Apartments', 100),
('APT002', '456 Elm St', 'Greenwood Apartments', 80),
('APT003', '789 Oak St', 'Oakwood Apartments', 150);

-- users table
INSERT INTO users (attribute_key, created_at, email, password_hash, phone, realname, role, social_type, updated_at, username) VALUES
(NULL, '2024-07-30 12:34:56.123456', 'admin@example.com', 'hashed_password_1', '123-456-7890', 'Admin User', 'ADMIN', NULL, '2024-07-31 10:20:30.123456', 'admin'),
(NULL, '2024-07-29 11:22:33.654321', 'user1@example.com', 'hashed_password_2', '234-567-8901', 'User One', 'USER', 'Facebook', '2024-07-31 09:15:20.654321', 'user1'),
(NULL, '2024-07-28 10:11:22.987654', 'user2@example.com', 'hashed_password_3', '345-678-9012', 'User Two', 'USER', 'Google', '2024-07-31 08:10:15.987654', 'user2');

-- user_apt table
INSERT INTO user_apt (building_no, unit_no, apt_code, user_id,is_granted) VALUES
('B1', '101', 'APT001', 1, 1),
('B2', '202', 'APT002', 2, 1),
('B3', '303', 'APT003', 3, 1);

-- vote table
INSERT INTO vote (content, created_at, end_date, image_url, is_active, start_date, title, created_user) VALUES
('Community meeting on new amenities.', '2024-07-31 09:00:00.000000', '2024-08-07 09:00:00.000000', 'https://example.com/image1.jpg', 1, '2024-07-31 09:00:00.000000', 'New Amenities Discussion', 1),
('Voting on the new security system.', '2024-07-25 10:00:00.000000', '2024-08-01 10:00:00.000000', 'https://example.com/image2.jpg', 1, '2024-07-25 10:00:00.000000', 'Security System Vote', 2);

-- vote_participant table
INSERT INTO vote_participant (user_id, vote_id) VALUES
(1, 1),
(2, 1),
(3, 1),
(2, 2);

-- vote_question table
INSERT INTO vote_question (question_text, vote_id) VALUES
('Do you support the installation of a new pool?', 1),
('Should we add more security cameras?', 2);

-- vote_option table
INSERT INTO vote_option (option_text, question_id) VALUES
('Yes', 1),
('No', 1),
('Yes', 2),
('No', 2);

-- vote_res table
INSERT INTO vote_res (vote_date, user_id, vote_id, option_id, question_id) VALUES
('2024-07-31 10:00:00.000000', 1, 1, 1, 1),
('2024-07-31 10:05:00.000000', 2, 1, 2, 1),
('2024-07-31 10:10:00.000000', 3, 1, 1, 1),
('2024-07-25 11:00:00.000000', 2, 2, 3, 2);