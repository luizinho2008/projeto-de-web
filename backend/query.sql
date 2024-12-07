CREATE DATABASE SEP;
USE SEP;

CREATE TABLE usuarios (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(250),
    email VARCHAR(100),
    senha TEXT
);

INSERT INTO usuarios(nome, email, senha) VALUES
('Zigmunt Bauman', 'zigmuntbauman@gmail.com', 'senha123'),
('Maria Oliveira', 'mariaoliveira@gmail.com', 'senha456'),
('Carlos Moreira', 'carlospereira@gmail.com', 'senha789'),
('Ana Souza', 'anasouza@gmail.com', 'senha101'),
('Lucas Costa', 'lucascosta@gmail.com', 'senha202');


CREATE TABLE torcedores (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100),
    telefone VARCHAR(15),
    imagem VARCHAR(255)
);

INSERT INTO torcedores (nome, email, telefone, imagem) VALUES
('Felipe Simaoka', 'felipe.simaoka@gmail.com', '(11) 98765-4321', 'https://firebasestorage.googleapis.com/v0/b/torcedoresverdes.appspot.com/o/1666361959097.jpg?alt=media&token=7896b6a3-df8a-4bfa-a723-88cc9144308d'),
('Cleison da Silva Santos', 'cleison.santos@gmail.com', '(21) 91234-5678', 'https://firebasestorage.googleapis.com/v0/b/torcedoresverdes.appspot.com/o/image.jpg?alt=media&token=feabe11f-3b75-4ca8-bac4-7b412996a52e'),
('Ana Paula Silva', 'ana.silva@gmail.com', '(31) 99876-5432', 'https://firebasestorage.googleapis.com/v0/b/torcedoresverdes.appspot.com/o/103-plq2x9czrpuv0mqacdeldw7m2dbnh26wrc64cj5f2o.jpg?alt=media&token=b7d3ff04-62bb-4bb1-b2a3-05d371fad22b'),
('Carlos Eduardo Santos', 'carlos.santos@gmail.com', '(41) 95678-1234', 'https://firebasestorage.googleapis.com/v0/b/torcedoresverdes.appspot.com/o/52406-1580201414.webp?alt=media&token=ca42862d-cfc6-4306-bde3-191ea8774b32'),
('Mariana Oliveira', 'mariana.oliveira@gmail.com', '(51) 92345-6789', 'https://firebasestorage.googleapis.com/v0/b/torcedoresverdes.appspot.com/o/images.jpg?alt=media&token=86d83388-35ee-4515-b147-d8ccbd3482e4');