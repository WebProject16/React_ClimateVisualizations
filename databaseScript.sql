CREATE DATABASE db16;
USE db16;
CREATE TABLE Users (
    userID int not null auto_increment,
    username varchar(255) not null unique,
    password varchar(255) not null,
    primary key(userID),
    unique(username)
);
CREATE TABLE Views (
	ID int not null auto_increment,
    url varchar(255) not null,
    isParallel boolean not null,
    visualizations varchar(255) not null,
    constraint urlID primary key (ID, url)
);
CREATE TABLE V1A (
	v1aID int not null auto_increment,
	yy int not null,
    globalA double(11,10) not null,
    northA double(11,10) not null,
    southA double(11,10) not null,
    primary key(v1aID)
);
CREATE TABLE V1M (
	v1mID int not null auto_increment,
	yymm int not null,
    globalA double(11,10) not null,
    northA double(11,10) not null,
    southA double(11,10) not null,
    primary key(v1mID)
);
CREATE TABLE V2A (
	v2aID int not null auto_increment,
	yy int not null,
    tempA double(11,10) not null,
    primary key(v2aID)
);
CREATE TABLE V3A (
	v3aID int not null auto_increment,
	yy int not null,
    co2 double(11,10) not null,
    primary key(v3aID)
);
CREATE TABLE V3M (
	v3mID int not null auto_increment,
	yymm int not null,
    co2 double(11,10) not null,
    primary key(v3mID)
    );
CREATE TABLE V4A (
	v4aID int not null auto_increment,
	yy int not null,
    globalA double(11,10) not null,
    northA double(11,10) not null,
    southA double(11,10) not null,
    primary key(v4aID)
);
CREATE TABLE V6A (
	v6aID int not null auto_increment,
	yy int not null,
    globalA double(11,10) not null,
    northA double(11,10) not null,
    southA double(11,10) not null,
    primary key(v6aID)
);
