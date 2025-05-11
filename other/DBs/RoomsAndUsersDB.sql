-- create database RoomsAndUsers;

use RoomsAndUsers;
 
 create table Room(
	id int primary key not null,
    RoomType nvarchar(20) not null,
    Price int not null,
    RoomSize int not null,
    RoomDescription nvarchar(5000),
    Advantages nvarchar(1000)
 );
 
 create table RoomBeds(
	id int primary key auto_increment not null,
    idRoom int not null,
    CountBed int not null,
    BedType int not null,
    foreign key (idRoom) references room(id)
 );
 
 create table imgURL(
	id int primary key auto_increment not null,
    idRoom int not null,
    URL nvarchar(1000) not null,
    Priority int not null,
    foreign key (idRoom) references room(id)
 );
 
 create table dops(
	id int primary key auto_increment not null,
    idRoom int not null,
    conditioner nvarchar(1) not null,
    hairdryer nvarchar(1) not null,
    refrigerator nvarchar(1) not null,
    telephone nvarchar(1) not null,
    TV nvarchar(1) not null,
    Iron nvarchar(1) not null,
    foreign key (idRoom) references room(id)
 ); 
 
 create table Users(
	id int primary key auto_increment not null,
    firstName nvarchar(20) not null,
    lastName nvarchar(20) not null,
    middleName nvarchar(20),
    email nvarchar(50) not null,
    phoneNumber nvarchar(20),
    passportSeries nvarchar(4),
    passportNumber nvarchar(6)
 );
 
 UPDATE users SET email = 'lol' WHERE id = (select id from users where email = 'gleborlov780@gmail.com');
 
 insert into users( firstName, lastName, 	) values
 ('Глеб', 'Орлов', 'gleborlov770@gmail.com');
 
 delete from users
 where id=2;
 
 select * from users;
 
 create table SavedRooms(
	id int primary key auto_increment not null,
    idRoom int not null,
    idUser int not null,
    foreign key (idRoom) references room(id),
    foreign key (idUser) references Users(id)
);

insert into SavedRooms(idRoom, idUser) values
(32, 2);

select * from SavedRooms
where idRoom = 32 and idUser = 2;

create table Booking(
	id int primary key auto_increment not null,
    idRoom int not null,
    idUser int not null,
    CheckInDate date not null,
    DepartureDate date not null,
    EarlyCheckIn nvarchar(1) not null,
    LateDeparture nvarchar(1) not null,
    Meal nvarchar(1) not null,
    foreign key (idRoom) references room(id),
    foreign key (idUser) references Users(id)
);

insert into Booking(idRoom, idUser, CheckInDate, DepartureDate, EarlyCheckIn, LateDeparture, Meal) values
(22, 5, '2025-04-26', '2025-04-29', 'n', 'n', 'y'),
(32, 5, '2025-04-30', '2025-05-03', 'n', 'n', 'y'),
(32, 5, '2025-04-09', '2025-04-13', 'n', 'n', 'y') ;

select * from Booking order by CheckInDate;

select COUNT(*) as sovp
from Booking
where idRoom = 32 and(
  (CheckInDate <= '2025-04-18' and DepartureDate >= '2025-04-18')
  or 
  (CheckInDate <= '2025-04-21'and DepartureDate >= '2025-04-21')
  or
  ('2025-04-18' < CheckInDate and '2025-04-21' > DepartureDate));
  
select COUNT(*) as sovpad
from Booking
where idRoom = 32 and(
  (CheckInDate <= '2025-04-18' and DepartureDate >= '2025-04-18')
  or 
  (CheckInDate <= '2025-04-21'and DepartureDate >= '2025-04-21')
  or
  ('2025-04-18' < CheckInDate and '2025-04-21' > DepartureDate));
  
select idRoom from Booking
where
  (CheckInDate <= '2025-04-18' and DepartureDate >= '2025-04-18')
  or 
  (CheckInDate <= '2025-04-21' and DepartureDate >= '2025-04-21')
  or
  ('2025-04-18' < CheckInDate and '2025-04-21' > DepartureDate);
 
insert into Room(id, RoomType, Price, RoomSize, RoomDescription, Advantages) values
(32, 'Стандарт', 3800, 22, 'Неплохой выбор для отдыха одному с комфортом', 'Расположение номера рядом с ресепшеном'),
(21, 'Комфорт', 5400, 36, 'Хороший номер для отдыха', 'Захватывающий вид из окна'),
(22, 'Люкс', 7000, 50, 'Шикарный выбор для роскошного отдыха', 'Захватывающий вид из окна и просторный санузел');

select * from Room;

insert into RoomBeds(idRoom, CountBed, BedType) values
(32, 1, 1),
(21, 1, 2),
(22, 1, 2),
(22, 2, 1);

select * from RoomBeds;

insert into imgURL(idRoom, URL, Priority) values
(21, 'file11.png', 1),
(21, 'file12.png', 2),
(21, 'file13.png', 3),
(22, 'file21.png', 1),
(22, 'file22.png', 2),
(22, 'file23.png', 3),
(32, 'file31.png', 1),
(32, 'file32.png', 2);

select * from imgURL;

insert into dops(idRoom, conditioner, hairdryer, refrigerator, telephone, TV, Iron) values
(21, 'y', 'y', 'n', 'n', 'y', 'y'),
(32, 'y', 'n', 'n', 'n', 'y', 'n'),
(22, 'y', 'y', 'y', 'y', 'y', 'y');

select * from dops;

select RoomType, Price, RoomSize, sum(CountBed * BedType) as BedCount from Room
inner join RoomBeds on RoomBeds.idRoom = Room.id
where Room.id in (select Room.id from Room
				   inner join dops on dops.idRoom = Room.id
                   where conditioner = 'y' and hairdryer = 'y' and refrigerator = 'y' and telephone = 'y' and TV = 'y' and Iron = 'y')
group by Room.id;

select conditioner, hairdryer, refrigerator, telephone, TV from dops
where idRoom = 22;
 
select URL from imgURL
where Priority = 1 and idRoom = 22;

select room.id from room
inner join RoomBeds on RoomBeds.idRoom = Room.id
where RoomType = 'Люкс'
and Price >= 6000 
and Price <= 7000 
and RoomSize >= 40 
and RoomSize <= 70 
and Room.id in (select Room.id from Room
				inner join dops on dops.idRoom = Room.id 
                where conditioner = 'y' 
                and hairdryer = 'y' 
                and refrigerator = 'y' 
                and telephone = 'y' 
                and TV = 'y' 
                and Iron = 'y' ) 
group by Room.id 
having sum(CountBed * BedType) = 4;


