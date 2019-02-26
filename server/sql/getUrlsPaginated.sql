SELECT 
  urls.external_id AS "externalId", 
  urls.source_url AS "shortedUrl",
  urls.target_url AS "targetUrl",
  users.external_id AS "authorExternalId",
  users.email AS "authorEmail"
FROM urls 
	LEFT JOIN users ON users.id = urls.author_id
LIMIT ?, ?;