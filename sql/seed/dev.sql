insert into `user` (external_id, email, password, created_at, last_login, account_enabled, refresh_token, activation_token)
values ('9aa07999-dc64-4358-b76e-20c9eb3613d7', 'admin1@feries.it', '$argon2id$v=19$m=65536,t=2,p=1$8YqsMHktj6ZhpK9ySqtzeA$LGcTPQDxmx4Fc7zr6EP/3xsmP8SgUbKPP1K9j7EWodU', now(), null, 1, null, 'token1'),
       ('d5df98b8-40f9-4233-899e-83277cf2ff5f', 'admin2@feries.it', '$argon2id$v=19$m=65536,t=2,p=1$8YqsMHktj6ZhpK9ySqtzeA$LGcTPQDxmx4Fc7zr6EP/3xsmP8SgUbKPP1K9j7EWodU', now(), null, 1, null, 'token2');
