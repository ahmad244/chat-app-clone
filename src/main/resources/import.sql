INSERT INTO webchat.`role` (id, description, name) VALUES   (1, 'basic permission to use the app', 'ROLE_BASIC_USER');
INSERT INTO webchat.`role` (id, description, name) VALUES   (2, 'permission to add data ', 'ROLE_DATA_ENTRY');
INSERT INTO webchat.`user` (enabled,email,first_name,last_name,password,username) VALUES	 (1,'ahmad@hotmail.com','ahmad','meh','$2a$10$JYJAnHaSjkZJc7QnffaUne7dwC1jCaZFs.axGCEDouh9U3TH/nufG','ahmad.meh');
INSERT INTO webchat.user_role (role_id,user_id) VALUES	 (1,1);
INSERT INTO webchat.user_role (role_id,user_id) VALUES	 (2,1);

