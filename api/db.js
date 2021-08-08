import { Sequelize, DataTypes } from 'sequelize'

export const db = new Sequelize({
    dialect: 'sqlite',
    storage: 'db.sqlite'
})

export const SubDivisions = db.define('SubDivisions', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    },
    data: {
        type: DataTypes.TEXT,
        get() {
            return JSON.parse(this.getDataValue('data'))
        },
        set(value) {
            this.setDataValue('data', JSON.stringify(value))
        }
    },
}, {
    timestamps: false
})

export const Groups = db.define('Groups', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    subDivisionId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING
    },
    timeTable: {
        type: DataTypes.TEXT,
        get() {
            return JSON.parse(this.getDataValue('timeTable'))
        },
        set(value) {
            this.setDataValue('timeTable', JSON.stringify(value))
        }
    },
    replacements: {
        type: DataTypes.TEXT,
        get() {
            return JSON.parse(this.getDataValue('replacements'))
        },
        set(value) {
            this.setDataValue('replacements', JSON.stringify(value))
        }
    },
    lastUpdatedAt: {
        type: DataTypes.DATE,
    }
}, {
    timestamps: false
})

export const Teachers = db.define('Teachers', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    subDivisionId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING
    },
    timeTable: {
        type: DataTypes.TEXT,
        get() {
            return JSON.parse(this.getDataValue('timeTable'))
        },
        set(value) {
            this.setDataValue('timeTable', JSON.stringify(value))
        }
    },
    replacements: {
        type: DataTypes.TEXT,
        get() {
            return JSON.parse(this.getDataValue('replacements'))
        },
        set(value) {
            this.setDataValue('replacements', JSON.stringify(value))
        }
    },
    lastUpdatedAt: {
        type: DataTypes.DATE,
    }
}, {
    timestamps: false
})
db.sync()