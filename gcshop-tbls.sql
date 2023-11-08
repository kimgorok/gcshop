use webdb2023;
/*******************************************************/
create table person (
loginid varchar(10) not null,
password varchar(10) not null,
name varchar(20) not null,
address varchar(50) null,
tel varchar(13) not null, 
birth varchar(8) not null, 
class varchar(2) not null, /*00 : CEO, 01 : 관리자, 02 : 일반고객 */
point int, 
PRIMARY KEY(loginid)
);

insert into person
values('bhwang99','bhwang99','왕보현','서울','010-8340-3779','00000000','01',0);

insert into person
values('khj','khj','김현중','성남','010-1234-5678','00000000','02',0);
/****************************************************/
drop table code_tbl;
select * from code_tbl ;
delete from code_tbl where main_id = '';

create table code_tbl (
main_id varchar(4) not null,
sub_id varchar(4) not null,
main_name varchar(100) not null,
sub_name varchar(100) not null,
start varchar(8) not null,
end varchar(8) not null,
PRIMARY KEY(main_id,sub_id,start,end)
);
insert into code_tbl
values('0000','0001','상품','의류','20231001','20301231'); 

/****************************************************/
use webdb2023;
drop table merchandise;
commit;
create table merchandise (
mer_id int NOT NULL auto_increment,
category varchar(4) not null,
name varchar(100) not null,
price int not null,
stock int not null, 
brand varchar(100) not null, 
supplier varchar(100) not null, 
image varchar(50), 
sale_yn varchar(1),
sale_price int,
PRIMARY KEY(mer_id)
);

insert into merchandise (category, name, price, stock,brand, supplier, image,sale_yn, sale_price)
value('0001','티셔츠',2000,1,'마이더스비','마이더스비','/images/womenCloth1.png','Y',0);

select * from merchandise;
/****************************************************/
select * from code_tbl;
commit;