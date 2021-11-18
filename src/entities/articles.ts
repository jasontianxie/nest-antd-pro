// CREATE TABLE articles (
//     id int(11) NOT NULL AUTO_INCREMENT,
//     user_id int(11) NOT NULL COMMENT 'userid',
//     article TEXT COMMENT 'article',
//     create_dt datetime NOT NULL DEFAULT now() COMMENT 'create time',
//     update_dt timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT 'update time',
//     audit int(1) NOT NULL COMMENT 'audit or not',
//     PRIMARY KEY (id)
//   ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;