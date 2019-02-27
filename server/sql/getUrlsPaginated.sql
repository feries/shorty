SELECT
  urls.external_id AS "externalId",
  urls.source_url AS "shortedUrl",
  urls.target_url AS "targetUrl",
  urls.created_at AS "createdAt",
  users.external_id AS "authorExternalId",
  users.email AS "authorEmail",
  (SELECT COUNT(id) FROM stats WHERE stats.url_id = urls.id) AS "urlClick"
FROM urls
	LEFT JOIN users ON users.id = urls.author_id
	LEFT JOIN stats ON stats.url_id = urls.id
ORDER BY urls.created_at DESC
LIMIT ? OFFSET ?;
