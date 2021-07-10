module.exports = function (sequelize, DataTypes) {
    return sequelize.define("record", {
        id:                {
            autoIncrement: true,
            type:          DataTypes.BIGINT.UNSIGNED,
            allowNull:     false,
            primaryKey:    true,
        },
        chain:             {
            type:      DataTypes.STRING(32),
            allowNull: false,
        },
        event:             {
            type:      DataTypes.STRING(128),
            allowNull: false,
        },
        steps:             {
            type:      DataTypes.INTEGER,
            allowNull: false,
        },
        keeperBlockNumber: {
            type:      DataTypes.BIGINT,
            allowNull: false,
            field:     "keeper_block_number",
        },
        latestBlockNumber: {
            type:      DataTypes.BIGINT,
            allowNull: false,
            field:     "latest_block_number",
        },
        status:            {
            type:      DataTypes.TINYINT.UNSIGNED,
            allowNull: true,
        },
        createTime:        {
            type:      DataTypes.DATE(3),
            allowNull: true,
            field:     "create_time",
        },
        updateTime:        {
            type:      DataTypes.DATE(3),
            allowNull: true,
            field:     "update_time",
        },
        comment:           {
            type:      DataTypes.STRING(512),
            allowNull: true,
        },
    }, {
        sequelize,
        tableName:  "record",
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
                name:   "unique_chain_event_status",
                unique: true,
                using:  "BTREE",
                fields: [
                    {name: "chain"},
                    {name: "event"},
                    {name: "status"},
                ],
            },
            {
                name:   "index_chain_block_block_number",
                using:  "BTREE",
                fields: [
                    {name: "chain"},
                    {name: "keeper_block_number"},
                ],
            },
        ],
    });
};
