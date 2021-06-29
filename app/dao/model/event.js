module.exports = function (sequelize, DataTypes) {
    return sequelize.define("event", {
        id:          {
            autoIncrement: true,
            type:          DataTypes.BIGINT.UNSIGNED,
            allowNull:     false,
            primaryKey:    true,
            comment:       "主键",
        },
        chain:       {
            type:      DataTypes.STRING(32),
            allowNull: false,
            comment:   "币种链名",
        },
        address:     {
            type:      DataTypes.STRING(64),
            allowNull: false,
            comment:   "合约地址",
        },
        blockHash:   {
            type:      DataTypes.STRING(128),
            allowNull: false,
            comment:   "区块哈希",
            field:     "block_hash",
        },
        blockNumber: {
            type:      DataTypes.BIGINT.UNSIGNED,
            allowNull: false,
            comment:   "区块高度",
            field:     "block_number",
        },
        version:     {
            type:         DataTypes.INTEGER.UNSIGNED,
            allowNull:    false,
            defaultValue: 0,
            comment:      "版本控制",
        },
        txHash:      {
            type:      DataTypes.STRING(128),
            allowNull: false,
            comment:   "交易哈希",
            field:     "tx_hash",
        },
        txIndex:     {
            type:      DataTypes.INTEGER,
            allowNull: false,
            comment:   "交易索引",
            field:     "tx_index",
        },
        logIndex:    {
            type:      DataTypes.INTEGER,
            allowNull: false,
            comment:   "事件索引",
            field:     "log_index",
        },
        event:       {
            type:      DataTypes.STRING(128),
            allowNull: false,
            comment:   "事件名称",
        },
        args:        {
            type:      DataTypes.JSON,
            allowNull: true,
            comment:   "事件参数",
        },
        status:      {
            type:      DataTypes.TINYINT.UNSIGNED,
            allowNull: true,
            comment:   "业务状态,0-废弃\/1-激活",
        },
        createTime:  {
            type:      DataTypes.DATE(3),
            allowNull: true,
            comment:   "创建时间",
            field:     "create_time",
        },
        updateTime:  {
            type:      DataTypes.DATE(3),
            allowNull: true,
            comment:   "更新时间",
            field:     "update_time",
        },
        comment:     {
            type:      DataTypes.STRING(512),
            allowNull: true,
            comment:   "业务备注",
        },
    }, {
        sequelize,
        tableName:  "event",
        timestamps: false,
        indexes:    [
            {
                name:   "PRIMARY",
                unique: true,
                using:  "BTREE",
                fields: [
                    {name: "id"},
                ],
            },
            {
                name:   "unique_chain_block_number_version",
                unique: true,
                using:  "BTREE",
                fields: [
                    {name: "chain"},
                    {name: "block_number"},
                    {name: "version"},
                ],
            },
            {
                name:   "unique_chain_tx_hash_tx_index_log_index",
                unique: true,
                using:  "BTREE",
                fields: [
                    {name: "chain"},
                    {name: "tx_hash"},
                    {name: "tx_index"},
                    {name: "log_index"},
                ],
            },
            {
                name:   "index_event_name",
                using:  "BTREE",
                fields: [
                    {name: "name"},
                ],
            },
        ],
    });
};
