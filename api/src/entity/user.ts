import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    Unique,
    CreateDateColumn,
} from 'typeorm';
import { Length, IsEmail, IsDate } from 'class-validator';
import * as bcrypt from 'bcryptjs';

export class Name {
    @Column({ nullable: true })
    firstName: string;

    @Column({ nullable: true })
    lastName: string;
}

export class Profile {
    @Column(type => Name)
    name: Name;

    @Column({ nullable: true })
    birth: Date;
}

export class EmailPreferences {
    @Column({ default: true })
    promotions: boolean;

    @Column({ default: true })
    news: boolean;
}

@Entity()
@Unique(['email'])
export class User extends Profile {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsEmail()
    email: string;

    @Column()
    @Length(4, 100)
    password: string;

    @Column()
    @CreateDateColumn()
    createdAt: Date;

    @Column()
    @CreateDateColumn()
    updatedAt: Date;

    @Column({ default: true })
    active: boolean;

    @Column(type => EmailPreferences)
    emailPreferences: EmailPreferences

    hashPassword() {
        this.password = bcrypt.hashSync(this.password, 8);
    }

    checkIfPasswordIsValid(password: string) {
        return bcrypt.compareSync(password, this.password);
    }
}
