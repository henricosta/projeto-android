DELETE FROM users;
DELETE FROM events;

-- Insert mock data into the users table
INSERT INTO users (id, name, email, password)
VALUES
    (1, 'Alice Johnson', 'alice.johnson@example.com', 'password123'),
    (2, 'Bob Smith', 'bob.smith@example.com', 'securePass!'),
    (3, 'Charlie Davis', 'charlie.davis@example.com', 'passw0rd'),
    (4, 'Dana Lee', 'dana.lee@example.com', 'mySecret123'),
    (5, 'Evan Brown', 'evan.brown@example.com', 'letmein');

-- Insert mock data into the events table
INSERT INTO events (id, name, description, location, date, is_online, created_by)
VALUES
    (1, 'Event Alpha', 'An amazing event with something for everyone.', 'New York', '2024-12-01', 0, 1),
    (2, 'Mystery Gathering', 'An event shrouded in mystery and excitement.', 'San Francisco', '2024-12-15', 1, 1),
    (3, 'Fun Expo', 'A day filled with fun activities and exhibitions.', 'Online', '2025-01-05', 1, 1),
    (4, 'Code Camp', 'Learn to code in a weekend!', 'Austin', '2025-01-20', 0, 1),
    (5, 'Tech Conference', 'Explore the latest in tech with industry leaders.', 'Online', '2025-02-10', 1, 1),
    (6, 'Science Fair', 'Showcasing innovations in science and technology.', 'Chicago', '2025-03-15', 0, 1),
    (7, 'Health & Wellness Retreat', 'A refreshing retreat to focus on health and well-being.', 'Miami', '2025-04-01', 0, 2),
    (8, 'Startup Pitch Night', 'Pitch your startup idea to top investors.', 'Online', '2025-04-12', 1, 3),
    (9, 'Food Festival', 'Enjoy a variety of food from around the world.', 'Los Angeles', '2025-05-05', 0, 4),
    (10, 'Art and Culture Fair', 'Celebrate diverse cultures and art forms.', 'San Diego', '2025-05-20', 0, 5),
    (11, 'Cybersecurity Workshop', 'Learn the latest in cybersecurity practices.', 'Online', '2025-06-15', 1, 3),
    (12, 'Entrepreneurship Summit', 'Inspire, innovate, and network with entrepreneurs.', 'New York', '2025-07-10', 0, 2),
    (13, 'Gaming Convention', 'Dive into the world of gaming and technology.', 'Seattle', '2025-08-25', 0, 4),
    (14, 'Music Festival', 'A weekend of live music performances.', 'Nashville', '2025-09-05', 0, 1),
    (15, 'AI & Robotics Conference', 'Explore the future of AI and robotics.', 'Online', '2025-10-12', 1, 2),
    (16, 'Film Screening', 'An exclusive preview of upcoming films.', 'Boston', '2025-10-25', 0, 5),
    (17, 'Yoga and Meditation Workshop', 'Experience inner peace and wellness.', 'Denver', '2025-11-05', 0, 3),
    (18, 'Sustainable Living Seminar', 'Learn about sustainable practices for everyday life.', 'Online', '2025-11-20', 1, 2),
    (19, 'Literature Conference', 'Meet authors and explore the world of books.', 'Portland', '2025-12-15', 0, 4),
    (20, 'Blockchain for Beginners', 'Introduction to blockchain and cryptocurrency.', 'Online', '2025-12-30', 1, 5);
