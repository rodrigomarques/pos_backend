create table usuario(
    id int auto_increment primary key,
    cpf varchar(20) not null unique,
    tipo varchar(40)
);

create table vendedor(
    id int auto_increment primary key,
    usuario_id int,
    descricao text
);

create table localizacao(
    usuario_id int primary key,
    latitude decimal not null,
    longitude decimal not null,
    atualizacao timestamp,
    foreign key(usuario_id) references usuario(id)
);