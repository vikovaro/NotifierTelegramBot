import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({ tableName: 'users' })
export class User extends Model implements IUser {
    @Column({
        type: DataType.BIGINT,
        primaryKey: true,
        allowNull: false,
    })
    chatId: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    username: string;

    @Column({
        type: DataType.DATE,
        defaultValue: DataType.NOW,
    })
    lastActivity: Date;
}

export interface IUser {
    chatId: number;
    username: string;
    lastActivity: Date;
}