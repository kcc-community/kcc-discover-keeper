  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '主键',
  `chain` varchar(32) NOT NULL COMMENT '币种链名',
  `address` varchar(64) NOT NULL COMMENT '合约地址',
  `block_hash` varchar(128) NOT NULL COMMENT '区块哈希',
  `block_number` bigint(20) unsigned NOT NULL COMMENT '区块高度',
  `version` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '版本控制',
  `tx_hash` varchar(128) NOT NULL COMMENT '交易哈希',
  `tx_index` int(11) NOT NULL COMMENT '交易索引',
  `log_index` int(11) NOT NULL COMMENT '事件索引',
  `event` varchar(128) NOT NULL COMMENT '事件名称',
  `args` json DEFAULT NULL COMMENT '事件参数',
  `status` tinyint(3) unsigned NOT NULL DEFAULT '1' COMMENT '业务状态,0-废弃/1-激活',
  `create_time` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) COMMENT '创建时间',
  `update_time` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3) COMMENT '更新时间',
  `comment` varchar(512) NOT NULL DEFAULT '' COMMENT '业务备注',
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_chain_tx_hash_tx_index_log_index` (`chain`,`tx_hash`,`tx_index`,`log_index`),
  KEY `index_event_name` (`event`),
  KEY `index_event_block_number` (`block_number`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='事件信息';

CREATE TABLE `gas_price` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '主键',
  `chain` varchar(32) NOT NULL COMMENT '币种链名',
  `fastest` decimal(65,30) NOT NULL DEFAULT '0.000000000000000000000000000000' COMMENT '极快费用',
  `fast` decimal(65,30) NOT NULL DEFAULT '0.000000000000000000000000000000' COMMENT '快速费用',
  `source` varchar(128) NOT NULL COMMENT '数据来源',
  `status` tinyint(3) unsigned NOT NULL DEFAULT '1' COMMENT '业务状态,0-废弃/1-激活',
  `create_time` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) COMMENT '创建时间',
  `update_time` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3) COMMENT '更新时间',
  `comment` varchar(512) NOT NULL DEFAULT '' COMMENT '业务备注',
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_chain_source` (`chain`,`source`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='当前燃料报价';