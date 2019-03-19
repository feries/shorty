SELECT
	url.external_id AS "externalId",
	url.source_url AS "shortedUrl",
	url.target_url AS "targetUrl",
	url.created_at AS "createdAt",
	`user`.external_id AS "authorExternalId",
	`user`.email AS "authorEmail",
	count(stat.id) AS "urlClick"
FROM url
	LEFT JOIN `user` ON `user`.id = url.author_id
	LEFT JOIN stat ON stat.url_id = url.id
WHERE target_url = ?
  AND active = 1;
