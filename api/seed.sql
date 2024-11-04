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
INSERT INTO events (id, name, description, location, date, is_online)
VALUES
    (1, 'Event Alpha', 'An amazing event with something for everyone.', 'New York', '2024-12-01', 0),
    (2, 'Mystery Gathering', 'An event shrouded in mystery and excitement.', 'San Francisco', '2024-12-15', 1),
    (3, 'Fun Expo', 'A day filled with fun activities and exhibitions.', 'Online', '2025-01-05', 1),
    (4, 'Code Camp', 'Learn to code in a weekend!', 'Austin', '2025-01-20', 0),
    (5, 'Tech Conference', 'Explore the latest in tech with industry leaders.', 'Online', '2025-02-10', 1),
    (6, 'Science Fair', 'Showcasing innovations in science and technology.', 'Chicago', '2025-03-15', 0);
