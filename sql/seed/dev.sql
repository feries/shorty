insert into `user` (external_id, email, password, created_at, last_login, account_enabled, refresh_token, activation_token)
values ('9aa07999-dc64-4358-b76e-20c9eb3613d7', 'admin1@feries.it', '$2a$10$0t.urD4KwYpmmOKjhKLSEe7DYdvOqjitm5wymjuHsUbmJZUna6d7K', now(), null, 1, null, 'token1'),
       ('d5df98b8-40f9-4233-899e-83277cf2ff5f', 'admin2@feries.it', '$2a$10$0t.urD4KwYpmmOKjhKLSEe7DYdvOqjitm5wymjuHsUbmJZUna6d7K', now(), null, 1, null, 'token2');

insert into `user_contact` (user_id, contact_type_id, value)
values (1, 1, 'Gino'), (1, 2, 'Amministratore'), (1, 3, 'ADMIN'),
       (2, 1, 'Luiggio'), (2, 2, 'L\'utente'), (2, 3, 'USER');
