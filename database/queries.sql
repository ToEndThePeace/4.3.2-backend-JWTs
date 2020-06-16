-- GET ALL USERS
SELECT U.id, U.username, D.name AS [department], U.password
  FROM users AS U
  JOIN departments AS D ON D.id = U.dept_id
  ORDER BY U.id;
