use News;

create table posts(
	id int primary key auto_increment not null,
    Txt nvarchar(10000) not null,
    PostDate datetime not null,
    WithImg nvarchar(1) not null
);

create table postimgs(
	id int primary key auto_increment not null,
    idPost int not null,
    FileName nvarchar(40) not null,
    foreign key (idPost) references posts(id)
);

select * from posts;

select * from postimgs;

select posts.id, Txt, PostDate, WithImg, FileName from posts
inner join postimgs on postimgs.idPost = posts.id
union
select  posts.id, Txt, PostDate, WithImg, '' as FileName from posts
where WithImg ='n'
order by PostDate desc;

delete from postimgs where idPost = 2;
delete from posts where id = 2;




