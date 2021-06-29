module.exports = function (sequelize, DataTypes) {
    return sequelize.define("gas_price", {
        id:         {
            autoIncrement: true,
            type:          DataTypes.BIGINT.UNSIGNED,
            allowNull:     false,
            primaryKey:    true,
            comment:       "主键",
        },
        chain:      {
            type:      DataTypes.STRING(32),
            allowNull: false,
            comment:   "币种链名",
        },
        fastest:    {
            type:         DataTypes.DECIMAL(65, 30),
            allowNull:    false,
            defaultValue: 0,
            comment:      "极快费用",
        },
        fast:       {
            type:         DataTypes.DECIMAL(65, 30),
            allowNull:    false,
            defaultValue: 0,
            comment:      "快速费用",
        },
        source:     {
            type:      DataTypes.STRING(128),
            allowNull: false,
            comment:   "数据来源",
        },
        status:     {
            type:      DataTypes.TINYINT.UNSIGNED,
            allowNull: true,
            comment:   "业务状态,0-废弃\/1-激活",
        },
        createTime: {
            type:      DataTypes.DATE(3),
            allowNull: true,
            comment:   "创建时间",
            field:     "create_time",
        },
        updateTime: {
            type:      DataTypes.DATE(3),
            allowNull: true,
            comment:   "更新时间",
            field:     "update_time",
        },
        comment:    {
            type:      DataTypes.STRING(512),
            allowNull: true,
            comment:   "业务备注",
        },
    }, {
        sequelize,
        tableName:  "gas_price",
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
                name:   "unique_chain_source",
                unique: true,
                using:  "BTREE",
                fields: [
                    {name: "chain"},
                    {name: "source"},
                ],
            },
        ],
    });
};
