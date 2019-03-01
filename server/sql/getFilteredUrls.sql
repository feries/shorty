SELECT
  urls.external_id AS "externalId",
  urls.source_url AS "shortedUrl",
  urls.target_url AS "targetUrl",
  urls.created_at AS "createdAt",
  users.external_id AS "authorExternalId",
  users.email AS "authorEmail",
  (SELECT COUNT(id) FROM stats WHERE stats.url_id = urls.id) AS "urlClick",
  hosts.short_url AS "shortHost"
FROM urls
	LEFT JOIN users ON users.id = urls.author_id
	LEFT JOIN stats ON stats.url_id = urls.id
	LEFT JOIN hosts ON hosts.id = urls.host_id
WHERE ? LIKE CONCAT('%', ?, '%')
  AND active = 1
ORDER BY urls.created_at DESC;
