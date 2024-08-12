BEGIN;

-- Ajout des condition
INSERT INTO "condition" ("condition_name") VALUES 
  ('Acceptable'),
  ('Bon'),
  ('Parfait');

-- Ajout des role
INSERT INTO "role" ("role_name") VALUES 
  ('Admin'),
  ('User');

-- Ajout des category
INSERT INTO "category" ("category_name") VALUES 
('Shōnen'), 
('Seinen'), 
('Shōjo'), 
('Josei'),
('Kodomo'), 
('Seijin');

-- Ajout des user
INSERT INTO public.user ("lastname", "firstname", "pseudo", "birthdate", "address", "zip_code", "city", "phone_number", "email", "password", "role_id", "created_at", "updated_at")
VALUES
('Monkey', 'D. Luffy', 'luffy', '1994-05-05', '1 Rue de la Plage', '93200', 'Saint-Denis', '111222333', 'luffy@email.com', 'hashed_password', 1, '2023-12-06 16:43:25.328904+00', NULL),
('Light', 'Yagami', 'kira', '1992-12-21', '2 Rue des Ombres', '93270', 'Sevran', '444555666', 'kira@email.com', 'hashed_password', 2, '2023-12-06 16:43:25.328904+00', NULL),
('Naruto', 'Uzumaki', 'naruto', '1997-10-10', '3 Rue des Hokages', '93370', 'Montfermeil', '777888999', 'naruto@email.com', 'hashed_password', 2, '2023-12-06 16:43:25.328904+00', NULL),
('Sasuke', 'Uchiha', 'sasuke', '1994-07-23', '9 Rue des Vengeurs', '93370', 'Montfermeil', '666555444', 'sasuke@email.com', 'hashed_password', 2, '2023-12-06 16:43:25.328904+00', NULL),
(NULL, NULL, 'YsT', NULL, NULL, NULL, NULL, NULL, 'tanguy.huart@oclock.school', 'coucou', 1, '2023-12-06 22:43:29.061945+00', NULL),
('Anthony', 'Trujillo', 'anthony_theversus', '1901-05-10', NULL, NULL, 'dunkerque', NULL, 'qsdqsdqsd@ilqdqsdfa.com', 'jmEsLint<3', 1, '2023-12-07 02:04:25.910611+00', NULL),
('Olivier', 'Séné', 'Olivier_Fan2Rock', '1941-05-10', NULL, NULL, 'London', NULL, 'qsdqsqsdqsdfsdqsd@ilqdqsdfa.com', 'TelegraphRoad', 1, '2023-12-07 02:06:30.491988+00', NULL),
('Houd', 'Alami', 'HoudChef2projet', '2001-05-10', NULL, NULL, 'Konoha', NULL, 'qsdqsqsdqsdqsd@ilqdqsdfa.com', 'Liveshare', 1, '2023-12-07 02:05:33.483537+00', NULL),
(NULL, NULL, 'test', NULL, NULL, NULL, NULL, NULL, 'test@test.test', '$2b$10$gi8TlcIwgEwKqOFjlIu5kOX5Nnb0SfhRwzZKWesLyGqQAIO/ByNk2', 1, '2023-12-15 02:05:33.483537+00', NULL);

-- Ajout des manga
INSERT INTO "manga" ("code_isbn", "title", "volume", "year_publication", "author", "description", "cover_url", "category_id", "created_at", "updated_at")
VALUES
(9782368529904, 'Fullmetal Alchemist Perfect Tome 1', 1, 2020, 'Hiromu Arakawa',NULL, 'https://manga-samas.onrender.com/images/9782368529904', 1, '2023-12-06 18:26:38.13109+00', NULL),
(9782871294146, 'Naruto Tome 1', 1, 2002, 'Masashi Kishimoto',NULL, 'https://manga-samas.onrender.com/images/9782871294146', 1, '2023-12-06 18:36:26.663483+00', NULL),
(9782871294177, 'Naruto Tome 2', 2, 2002, 'Masashi Kishimoto',NULL, 'https://manga-samas.onrender.com/images/9782871294177', 1, '2023-12-06 18:37:33.044962+00', NULL),
(9782871294276, 'Naruto Tome 3', 3, 2002, 'Masashi Kishimoto',NULL, 'https://manga-samas.onrender.com/images/9782871294276', 1, '2023-12-06 18:38:09.126115+00', NULL),
(9782871294412, 'Naruto Tome 4', 4, 2002, 'Masashi Kishimoto',NULL, 'https://manga-samas.onrender.com/images/9782871294412', 1, '2023-12-06 18:38:25.987421+00', NULL),
(9782871294917, 'Naruto Tome 5', 5, 2003, 'Masashi Kishimoto',NULL, 'https://manga-samas.onrender.com/images/9782871294917', 1, '2023-12-06 18:38:37.555219+00', NULL),
(9782871292661, 'Hunter X Hunter Tome 1', 1, 2000, 'Yoshihiro Togashi',NULL, 'https://manga-samas.onrender.com/images/9782871292661', 1, '2023-12-06 18:42:22.498405+00', NULL),
(9782871292678, 'Hunter X Hunter Tome 2', 2, 2000, 'Yoshihiro Togashi',NULL, 'https://manga-samas.onrender.com/images/9782871292678', 1, '2023-12-06 18:42:37.382854+00', NULL),
(9782871292685, 'Hunter X Hunter Tome 3', 3, 2000, 'Yoshihiro Togashi',NULL, 'https://manga-samas.onrender.com/images/9782871292685', 1, '2023-12-06 18:42:50.484008+00', NULL),
(9782871292692, 'Hunter X Hunter Tome 4', 4, 2000, 'Yoshihiro Togashi', NULL, 'https://manga-samas.onrender.com/images/9782871292692', 1, '2023-12-06 18:43:01.120813+00', NULL),
(9782871292708, 'Hunter X Hunter Tome 5', 5, 2000, 'Yoshihiro Togashi', NULL, 'https://manga-samas.onrender.com/images/9782871292708', 1, '2023-12-06 18:43:13.624908+00', NULL),
(9782505000327, 'Death Note Tome 1', 1, 2007, 'Tsugumi Ohba, Takeshi Obata',NULL, 'https://manga-samas.onrender.com/images/9782505000327', 2, '2023-12-06 18:45:28.309458+00', NULL),
(9782915513585, 'Ubel Blatt Tome 0', 0, 2007, 'Etorouji Shiono',NULL, 'https://manga-samas.onrender.com/images/9782915513585', 2, '2023-12-06 22:41:02.00121+00', NULL),
(9782723455862, 'Reborn !', 1, 2006, 'Akira Amano',NULL, 'https://manga-samas.onrender.com/images/9782723455862', 2, '2023-12-07 00:21:01.661045+00', NULL),
(9782505009993, 'Monster Intégrale', 1, 2010, 'Naoki Urasawa',NULL, 'https://manga-samas.onrender.com/images/9782505009993', 2, '2023-12-07 00:27:38.38979+00', NULL),
(9782811679811, E'L\'attaque des titans', 1, 2023, 'Hajime Isayama', NULL, 'https://manga-samas.onrender.com/images/9782811679811', 2, '2023-12-07 00:28:52.227401+00', NULL),
(9782344020685, 'Berserk', 1, 2017, 'Kentaro Miura', NULL, 'https://manga-samas.onrender.com/images/9782344020685', 2, '2023-12-07 00:29:36.565223+00', NULL),
(9782380710243, 'Spy X Family', 1, 2020, 'Tatsuya Endo',NULL, 'https://manga-samas.onrender.com/images/9782380710243', 1, '2023-12-07 00:31:54.126432+00', NULL);

-- Ajout des article
INSERT INTO "article" ("title", "description","price","transaction_id","date_transaction","state_completion","image_url","condition_id")
VALUES
  ('Fullmetal Alchemist Perfect Tome 1', NULL, 10, NULL, NULL,'En ligne', 'https://manga-samas.onrender.com/images/9782368529904', 2),
  ('Naruto Tome 1', NULL, 15, 6546546554, NULL,'Achat en cours', 'https://manga-samas.onrender.com/images/9782871294146', 1),
  ('Naruto Tome 2', NULL, 12, 6524654654, NULL,'Achat en cours', 'https://manga-samas.onrender.com/images/9782871294177', 3),
  ('Naruto Tome 3', NULL, 18, 6254654654, NULL,'Achat en cours', 'https://manga-samas.onrender.com/images/9782871294276', 1),
  ('Naruto Tome 4', NULL, 20, 6514654654, NULL,'Achat en cours', 'https://manga-samas.onrender.com/images/9782871294412', 2),
  ('Naruto Tome 5', NULL, 15, 6554654654, NULL,'Achat en cours', 'https://manga-samas.onrender.com/images/9782871294917', 3),
  ('Hunter X Hunter Tome 1', NULL, 10, NULL, NULL,'En ligne', 'https://manga-samas.onrender.com/images/9782871292661', 2),
  ('Hunter X Hunter Tome 2', NULL, 15, NULL, NULL,'En ligne', 'https://manga-samas.onrender.com/images/9782871292678', 1),
  ('Hunter X Hunter Tome 3', NULL, 12, NULL, NULL,'En ligne', 'https://manga-samas.onrender.com/images/9782871292685', 3),
  ('Hunter X Hunter Tome 4', NULL, 14, NULL, NULL,'En ligne', 'https://manga-samas.onrender.com/images/9782871292692', 1),
  ('Hunter X Hunter Tome 5', NULL, 16, NULL, NULL,'En ligne', 'https://manga-samas.onrender.com/images/9782871292708', 2),
  ('Death Note Tome 1', NULL, 18, NULL, NULL,'En ligne', 'https://manga-samas.onrender.com/images/9782505000327', 3),
  ('Ubel Blatt Tome 0', NULL, 10, NULL, NULL,'En ligne', 'https://localhost:3001/images/9782915513585', 2),
  ('Reborn !', NULL, 15, NULL, NULL,'En ligne', 'https://manga-samas.onrender.com/images/9782723455862', 1),
  ('Monster Intégrale', NULL, 20, NULL, NULL,'En ligne', 'https://manga-samas.onrender.com/images/9782505009993', 2),
  (E'L\'attaque des titans',NULL, 15, NULL, NULL,'En ligne', 'https://manga-samas.onrender.com/images/9782811679811', 3),
  ('Berserk',NULL, 18, NULL, NULL,'En ligne', 'https://manga-samas.onrender.com/images/9782344020685', 1),
  ('Spy X Family',NULL, 16, NULL, NULL,'En ligne', 'https://manga-samas.onrender.com/images/9782380710243', 2);

-- Ajout de manga_has_article
INSERT INTO "manga_has_article" ("manga_code_isbn", "article_id")
VALUES
  ('9782368529904', 1),
  ('9782871294146', 2),
  ('9782871294177', 3),
  ('9782871294276', 4),
  ('9782871294412', 5),
  ('9782871294917', 6),
  ('9782871292661', 7),
  ('9782871292678', 8),
  ('9782871292685', 9),
  ('9782871292692', 10),
  ('9782871292708', 11),
  ('9782505000327', 12),
  ('9782915513585', 13),
  ('9782723455862', 14),
  ('9782505009993', 15),
  ('9782811679811', 16),
  ('9782344020685', 17),
  ('9782380710243', 18); 

-- Ajout de user_has_article
INSERT INTO "user_has_article" ("user_id", "article_id")
VALUES
(1,17),
(1,12),
(2,1),
(2,7),
(3,8),
(4,9),
(4,10),
(6,11),
(6,16),
(9,5),
(9,2),
(9,3),
(9,4),
(9,6),
(8,14),
(5,18),
(5,13),
(6,15);

COMMIT;