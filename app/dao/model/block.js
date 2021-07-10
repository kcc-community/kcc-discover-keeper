module.exports = function (sequelize, DataTypes) {
    return sequelize.define("block", {
        id:                {
            autoIncrement: true,
            type:          DataTypes.BIGINT.UNSIGNED,
            allowNull:     false,
            primaryKey:    true,
            comment:       "主键",
        },
        chain:             {
            type:      DataTypes.STRING(32),
            allowNull: false,
            comment:   "币种链名",
        },
        steps:             {
            type:      DataTypes.INTEGER,
            allowNull: false,
            comment:   "同步区块步长",
        },
        keeperBlockNumber: {
            type:      DataTypes.BIGINT,
            allowNull: false,
            comment:   "当前区块高度",
            field:     "keeper_block_number",
        },
        latestBlockNumber: {
            type:      DataTypes.BIGINT,
            allowNull: false,
            comment:   "节点区块高度",
            field:     "latest_block_number",
        },
        status:            {
            type:      DataTypes.TINYINT.UNSIGNED,
            allowNull: true,
            comment:   "业务状态,0-废弃\/1-激活",
        },
        createTime:        {
            type:      DataTypes.DATE(3),
            allowNull: true,
            comment:   "创建时间",
            field:     "create_time",
        },
        updateTime:        {
            type:      DataTypes.DATE(3),
            allowNull: true,
            comment:   "更新时间",
            field:     "update_time",
        },
        comment:           {
            type:      DataTypes.STRING(512),
            allowNull: true,
            comment:   "业务备注",
        },
    }, {
        sequelize,
        tableName:  "block",
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
                name:   "unique_chain_status",
                unique: true,
                using:  "BTREE",
                fields: [
                    {name: "chain"},
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
