SELECT
  url.external_id AS "externalId",
  url.source_url AS "shortedUrl",
  url.target_url AS "targetUrl",
  url.created_at AS "createdAt",
  `user`.external_id AS "authorExternalId",
  `user`.email AS "authorEmail",
  (SELECT COUNT(id) FROM stat WHERE stats.url_id = urls.id) AS "urlClick",
  host.short_url AS "shortHost"
FROM url
	LEFT JOIN `user` ON users.id = urls.author_id
	LEFT JOIN `stat` ON stats.url_id = urls.id
  LEFT JOIN `host` ON hosts.id = urls.host_id
WHERE active = 1
ORDER BY url.created_at DESC
LIMIT ? OFFSET ?;
