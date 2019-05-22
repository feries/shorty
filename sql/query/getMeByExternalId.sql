SELECT uc.value
FROM `user_contact` AS UC
    JOIN `contact_type` AS CT ON CT.value = 'name'
    JOIN `user` U ON uc.user_id = U.id
WHERE UC.contact_type_id = CT.id
    AND U.external_id = ?;
