SELECT
       ct.value as type,
       uc.value as value
from user AS U
left join user_contact uc on U.id = uc.user_id
left join contact_type ct on uc.contact_type_id = ct.id
where U.external_id = ?
and u.account_enabled = 1;
