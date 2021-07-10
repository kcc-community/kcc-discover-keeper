module.exports = function (sequelize, DataTypes) {
    return sequelize.define("event", {
        id:          {
            autoIncrement: true,
            type:          DataTypes.BIGINT.UNSIGNED,
            allowNull:     false,
            primaryKey:    true,
        },
        chain:       {
            type:      DataTypes.STRING(32),
            allowNull: false,
        },
        address:     {
            type:      DataTypes.STRING(64),
            allowNull: false,
        },
        blockHash:   {
            type:      DataTypes.STRING(128),
            allowNull: false,
            field:     "block_hash",
        },
        blockNumber: {
            type:      DataTypes.BIGINT.UNSIGNED,
            allowNull: false,
            field:     "block_number",
        },
        version:     {
            type:         DataTypes.INTEGER.UNSIGNED,
            allowNull:    false,
            defaultValue: 0,
        },
        txHash:      {
            type:      DataTypes.STRING(128),
            allowNull: false,
            field:     "tx_hash",
        },
        txIndex:     {
            type:      DataTypes.INTEGER,
            allowNull: false,
            field:     "tx_index",
        },
        logIndex:    {
            type:      DataTypes.INTEGER,
            allowNull: false,
            field:     "log_index",
        },
        event:       {
            type:      DataTypes.STRING(128),
            allowNull: false,
        },
        args:        {
            type:      DataTypes.JSON,
            allowNull: true,
        },
        status:      {
            type:      DataTypes.TINYINT.UNSIGNED,
            allowNull: true,
        },
        createTime:  {
            type:      DataTypes.DATE(3),
            allowNull: true,
            field:     "create_time",
        },
        updateTime:  {
            type:      DataTypes.DATE(3),
            allowNull: true,
            field:     "update_time",
        },
        comment:     {
            type:      DataTypes.STRING(512),
            allowNull: true,
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
