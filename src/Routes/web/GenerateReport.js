const {Router} = require('express');
const router =  Router();
const fs = require("fs");
const path = require('path');
const ejs = require("ejs");
const User = require('../../Models/User')
const Information = require('../../Models/Information')
const pdf = require("html-pdf");

const usersP= [
  {
    role: 'veterinary',
    _id: '60a5fdc65581cc3038a73bae',
    name: 'Tom',
    last_name: 'Vaga Gozo',
    vet: 'SALUD CANINA',
    email: 'tom@gmail.com',
    phone: '72568012',
    direction: 'Av Urtado y colon',
    urlImg: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_iIE5FiVia84_7Ewg0-P8Um_9IVDcY3hgMQ&usqp=CAU',
    password: '$2a$10$pv/rg5UYWI8bhB/Izleg7uhyF05BfZ12i.UUB70we8F5QeL72N.hK',
    createdAt: '2021-06-20T05:02:51.326Z',
    updatedAt: '2021-06-20T05:02:51.326Z',
    __v: 0
  },
  {
    role: 'veterinary',
    _id: '60a5fdc65581cc3038a73baf',
    name: 'Jerry',
    last_name: 'Illanes Conde',
    vet: 'PERRITO AMIGO',
    email: 'jerry@gmail.com',
    phone: '62305458',
    direction: 'Sacaba huayllani',
    urlImg: 'https://inafe.es/wp-content/uploads/517.jpg',
    password: '$2a$10$ANHNDPMCMuqG5Vca9Ed8F.qmtUGxHRHMKRfA5twD9ZfsLm2AKT7Ay',
    createdAt: '2021-06-20T05:02:51.326Z',
    updatedAt: '2021-06-20T05:02:51.326Z',
    __v: 0
  },
  {
    role: 'admin',
    _id: '60a5fdc65581cc3038a73bb0',
    name: 'admin',
    last_name: 'Lozada Motes',
    email: 'admin@gmail.com',
    phone: '74526312',
    direction: 'molinos de someti',
    urlImg: '/adfsfsdf',
    password: '$2a$10$Ax/SytXlCLxxjYaS4lAVReu8ayR41extgs4G78sc3cKuvQ3uhdKq.',
    createdAt: '2021-06-20T05:02:51.326Z',
    updatedAt: '2021-06-20T05:02:51.326Z',
    __v: 0
  },
  {
    role: 'veterinary',
    _id: '60a66c31a6de4400159cc4c7',
    name: 'juan',
    last_name: 'Damian',
    vet: 'Directito al cielo',
    email: 'admin@admin.com',
    phone: '45656542',
    direction: 'calle juntas',
    urlImg: 'https://firebasestorage.googleapis.com/v0/b/myfirebase-acd6a.appspot.com/o/Veterinary%2Fchicote.png?alt=media&token=f3943b90-a14c-4c30-8003-cf22393509eb',
    password: '$2a$10$aJli.VMJnr2h/NUcDcVeCOyHdIMfbmhysiSOnetGSgMCvJycJeZLW',
    createdAt: '2021-06-20T05:02:51.326Z',
    updatedAt: '2021-06-20T05:02:51.326Z',
    __v: 0
  },
  {
    role: 'veterinary',
    _id: '60a6b97b39674600154c350f',
    name: 'lucas',
    last_name: 'alvares',
    vet: 'alvares',
    email: 'lucasalvares@gmail.com',
    phone: '12345678',
    direction: 'plaza sucre',
    urlImg: 'https://firebasestorage.googleapis.com/v0/b/myfirebase-acd6a.appspot.com/o/Veterinary%2F941aaedab69653ef7f5fd99c01e1e5d1.jpg?alt=media&token=48e7c7aa-cb49-4451-8879-52efe9940572',
    password: '$2a$10$0ZbiFm6x.sdnUuCOPW1l2em2dz4nJIzda5.fvMFkaVqBkWcSZK76q',
    createdAt: '2021-06-20T05:02:51.326Z',
    updatedAt: '2021-06-20T05:02:51.326Z',
    __v: 0
  },
  {
    role: 'veterinary',
    _id: '60c4d8004662eb0015243f14',
    name: 'Yonslfjfsjjjjjjjjjjjjjjjj',
    last_name: '##$',
    vet: 'asitos',
    email: 'ositos@gmail.com',
    phone: '9823442122222222222222222',
    direction: 'Cercado',
    urlImg: 'https://firebasestorage.googleapis.com/v0/b/myfirebase-acd6a.appspot.com/o/Veterinary%2F8ea26c00-99fc-4022-b6d1-d5fa6f453e48.jpg?alt=media&token=19642114-d94a-4267-90f3-7731ffefe5be',
    password: '$2a$10$fotK96iavgmyTBdLzCxWVuj.WBhvanG.gUFs0zOEs8c/q8J3w4BAO',
    createdAt: '2021-06-20T05:02:51.326Z',
    updatedAt: '2021-06-20T05:02:51.326Z',
    __v: 0
  },
  {
    role: 'veterinary',
    _id: '60c4ea3b4662eb0015243f18',
    name: 'Yolanda',
    last_name: 'Pascual',
    vet: 'pelusas',
    email: 'ositosss@gmail.com',
    phone: '2222222222',
    direction: 'Cercado',
    urlImg: 'https://firebasestorage.googleapis.com/v0/b/myfirebase-acd6a.appspot.com/o/Veterinary%2F%401.jpg?alt=media&token=753ae029-3416-4da6-8f54-0b35f0922b0d',
    password: '$2a$10$ST5dht4H4HcVSTtdAy0InObEwnVYZy3EdraaVZyEYQ7fDe1dB9n8W',
    createdAt: '2021-06-20T05:02:51.326Z',
    updatedAt: '2021-06-20T05:02:51.326Z',
    __v: 0
  },
  {
    role: 'veterinary',
    _id: '60c4fab590a2b40015e52735',
    name: 'Edson',
    last_name: 'Rosas',
    vet: 'Edson',
    email: 'edsonrosas321@gmail.com',
    phone: '63906568',
    direction: 'Sacaba-huayllai',
    urlImg: 'https://firebasestorage.googleapis.com/v0/b/myfirebase-acd6a.appspot.com/o/Veterinary%2FIMG-20210605-WA0000.jpg?alt=media&token=41fcefff-92df-4b7f-be1c-2f61a68c26a6',
    password: '$2a$10$Lx2Den8cj4/HQLna.3yKM.UK.CnU3P/GcAbDBI20zfM4wO5JRuH0S',
    createdAt: '2021-06-20T05:02:51.326Z',
    updatedAt: '2021-06-20T05:02:51.326Z',
    __v: 0
  },
  {
    role: 'veterinary',
    _id: '60c50ef689640300155baef5',
    name: 'Prueba',
    last_name: 'Prueba',
    vet: 'Perritos y gatitos',
    email: 'prueba@prueba.com',
    phone: '77497879',
    direction: 'calle juntas',
    urlImg: 'https://firebasestorage.googleapis.com/v0/b/myfirebase-acd6a.appspot.com/o/Veterinary%2Factivate.png?alt=media&token=96902f3d-812f-4f01-847a-20d951bbdb3a',
    password: '$2a$10$vhlRDFpC3r91h6c80UkBUuNRU3FmCMp7iIQPMi0s1pqroYZUVEdmy',
    createdAt: '2021-06-20T05:02:51.326Z',
    updatedAt: '2021-06-20T05:02:51.326Z',
    __v: 0
  },
  {
    role: 'veterinary',
    _id: '60c5108389640300155baef6',
    name: 'test',
    last_name: 'test',
    vet: 'test',
    email: 'testtt@test.com',
    phone: '12314212',
    direction: 'test',
    urlImg: 'https://firebasestorage.googleapis.com/v0/b/myfirebase-acd6a.appspot.com/o/Veterinary%2FahiViene.png?alt=media&token=fc28b2b8-9b3f-47c4-850b-cca0dc8ba024',
    password: '$2a$10$kHw39C/aqw5EItMkicDY5ewA7f0c4evypRwiJJzdasW6P4Utrj1l.',
    createdAt: '2021-06-20T05:02:51.326Z',
    updatedAt: '2021-06-20T05:02:51.326Z',
    __v: 0
  },
  {
    role: 'veterinary',
    _id: '60c567a44b74b100152c54fc',
    name: 'TEST',
    last_name: 'TEST',
    vet: 'TEST',
    email: '201703988@est.umss.edu',
    phone: '12345678',
    direction: 'TEST',
    urlImg: 'https://firebasestorage.googleapis.com/v0/b/myfirebase-acd6a.appspot.com/o/Veterinary%2FScreenshot_20210611-172616_Facebook.jpg?alt=media&token=a1098641-bb22-4c88-8ff8-f50336d41124',
    password: '$2a$10$Xensu2zNtBieepcmdfcQQeEfssMSYi.ycVIWg8ZymcwspnZ/6dDuW',
    createdAt: '2021-06-20T05:02:51.326Z',
    updatedAt: '2021-06-20T05:02:51.326Z',
    __v: 0
  }
]
const informationsP = [
  {
    state: 'Aceptado',
    _id: '60a5fe0bdaf46c0584100634',
    title: 'La sdfaf fsfesfe',
    category: 'Enfermedades',
    description: 'asdfsaf dasfdsfadf adsfasdf adsfasf sdfsdfsdfsdfsdfsdfsdfdsfsdfdsfsdfsd sdfsdfsdfdf',
    urlFoto: 'https://i2.wp.com/thehappening.com/wp-content/uploads/2018/12/sombreros-perritos-7.jpg?fit=1024%2C694&ssl=1',
    veterinary: {
      role: 'veterinary',
      _id: '60a5fdc65581cc3038a73bae',
      name: 'Tom',
      last_name: 'Vaga Gozo',
      vet: 'SALUD CANINA',
      email: 'tom@gmail.com',
      phone: '72568012',
      direction: 'Av Urtado y colon',
      urlImg: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_iIE5FiVia84_7Ewg0-P8Um_9IVDcY3hgMQ&usqp=CAU',
      password: '$2a$10$pv/rg5UYWI8bhB/Izleg7uhyF05BfZ12i.UUB70we8F5QeL72N.hK',
      createdAt: '2021-06-20T05:02:51.326Z',
      updatedAt: '2021-06-20T05:02:51.326Z',
      __v: 0
    },
    createdAt: '2021-06-20T05:01:15.751Z',
    updatedAt: '2021-06-20T05:01:15.751Z',
    __v: 0
  },
  {
    state: 'Aceptado',
    _id: '60a5fe0bdaf46c0584100635',
    title: 'una sdfaf asdfsfesfe',
    category: 'Vacunas',
    description: 'asdfsaf adsfasdf adsfasf asdfdsfsdfsdfdssdfdsfdsfsdfsdfsdfdsffsdfdsfdf',
    urlFoto: 'https://www.webconsultas.com/sites/default/files/styles/rrss_wide/public/temas/vacunacion_perros_domesticos_p.jpg',
    veterinary: {
      role: 'veterinary',
      _id: '60a5fdc65581cc3038a73baf',
      name: 'Jerry',
      last_name: 'Illanes Conde',
      vet: 'PERRITO AMIGO',
      email: 'jerry@gmail.com',
      phone: '62305458',
      direction: 'Sacaba huayllani',
      urlImg: 'https://inafe.es/wp-content/uploads/517.jpg',
      password: '$2a$10$ANHNDPMCMuqG5Vca9Ed8F.qmtUGxHRHMKRfA5twD9ZfsLm2AKT7Ay',
      createdAt: '2021-06-20T05:02:51.326Z',
      updatedAt: '2021-06-20T05:02:51.326Z',
      __v: 0
    },
    createdAt: '2021-06-20T05:01:15.751Z',
    updatedAt: '2021-06-20T05:01:15.751Z',
    __v: 0
  },
  {
    state: 'Aceptado',
    _id: '60a5fe0bdaf46c058410063f',
    title: 'ooooooasdfadf addddfdsfd',
    category: 'Enfermedades',
    description: 'dsdsdsdsdfdsfa dgdfsgfsd sdfdsfdfsdfsdfdsf asdfdsfdsfadsadsfasffafdsffadsddsdsdsfsdf adsfasf df',
    urlFoto: 'https://soyunperro.com/wp-content/uploads/2016/05/poner-gotas-en-ojo-de-perro.jpg',
    veterinary: {
      role: 'veterinary',
      _id: '60a5fdc65581cc3038a73bae',
      name: 'Tom',
      last_name: 'Vaga Gozo',
      vet: 'SALUD CANINA',
      email: 'tom@gmail.com',
      phone: '72568012',
      direction: 'Av Urtado y colon',
      urlImg: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_iIE5FiVia84_7Ewg0-P8Um_9IVDcY3hgMQ&usqp=CAU',
      password: '$2a$10$pv/rg5UYWI8bhB/Izleg7uhyF05BfZ12i.UUB70we8F5QeL72N.hK',
      createdAt: '2021-06-20T05:02:51.326Z',
      updatedAt: '2021-06-20T05:02:51.326Z',
      __v: 0
    },
    createdAt: '2021-06-20T05:01:15.751Z',
    updatedAt: '2021-06-20T05:01:15.751Z',
    __v: 0
  },
  {
    state: 'Rechazado',
    _id: '60c4ee0d4662eb0015243f1a',
    title: 'La sonora dinamita',
    category: 'Cuidado alimenticio',
    description: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    urlFoto: 'https://firebasestorage.googleapis.com/v0/b/myfirebase-acd6a.appspot.com/o/Veterinary%2Fchicote.png?alt=media&token=7aa971a0-da67-4276-8f28-811be5470466',
    veterinary: {
      role: 'veterinary',
      _id: '60a5fdc65581cc3038a73baf',
      name: 'Jerry',
      last_name: 'Illanes Conde',
      vet: 'PERRITO AMIGO',
      email: 'jerry@gmail.com',
      phone: '62305458',
      direction: 'Sacaba huayllani',
      urlImg: 'https://inafe.es/wp-content/uploads/517.jpg',
      password: '$2a$10$ANHNDPMCMuqG5Vca9Ed8F.qmtUGxHRHMKRfA5twD9ZfsLm2AKT7Ay',
      createdAt: '2021-06-20T05:02:51.326Z',
      updatedAt: '2021-06-20T05:02:51.326Z',
      __v: 0
    },
    createdAt: '2021-06-20T05:01:15.751Z',
    updatedAt: '2021-06-20T05:01:15.751Z',
    __v: 0
  },
  {
    state: 'Aceptado',
    _id: '60c4eed24662eb0015243f1c',
    title: 'skdjhfjksdhafkjhksdafkjlklsdf',
    category: 'Cuidado alimenticio',
    description: 'jlkñjlkjkljkl',
    urlFoto: 'https://firebasestorage.googleapis.com/v0/b/myfirebase-acd6a.appspot.com/o/Veterinary%2Fchicote.png?alt=media&token=7aa971a0-da67-4276-8f28-811be5470466',
    veterinary: {
      role: 'veterinary',
      _id: '60a5fdc65581cc3038a73baf',
      name: 'Jerry',
      last_name: 'Illanes Conde',
      vet: 'PERRITO AMIGO',
      email: 'jerry@gmail.com',
      phone: '62305458',
      direction: 'Sacaba huayllani',
      urlImg: 'https://inafe.es/wp-content/uploads/517.jpg',
      password: '$2a$10$ANHNDPMCMuqG5Vca9Ed8F.qmtUGxHRHMKRfA5twD9ZfsLm2AKT7Ay',
      createdAt: '2021-06-20T05:02:51.326Z',
      updatedAt: '2021-06-20T05:02:51.326Z',
      __v: 0
    },
    createdAt: '2021-06-20T05:01:15.751Z',
    updatedAt: '2021-06-20T05:01:15.751Z',
    __v: 0
  },
  {
    state: 'Aceptado',
    _id: '60c50df989640300155baef3',
    title: 'la kñajsdjsadlkj',
    category: 'Vacunas',
    description: 'fdgvbfgdhgrfhertfawefwefnbcvbnnvbc',
    urlFoto: 'https://firebasestorage.googleapis.com/v0/b/myfirebase-acd6a.appspot.com/o/Veterinary%2F164390037_717817185554681_259082134993261236_n.jpg?alt=media&token=e587f5d0-840e-43ca-90b7-8427679a1a5b',
    veterinary: {
      role: 'veterinary',
      _id: '60a66c31a6de4400159cc4c7',
      name: 'juan',
      last_name: 'Damian',
      vet: 'Directito al cielo',
      email: 'admin@admin.com',
      phone: '45656542',
      direction: 'calle juntas',
      urlImg: 'https://firebasestorage.googleapis.com/v0/b/myfirebase-acd6a.appspot.com/o/Veterinary%2Fchicote.png?alt=media&token=f3943b90-a14c-4c30-8003-cf22393509eb',
      password: '$2a$10$aJli.VMJnr2h/NUcDcVeCOyHdIMfbmhysiSOnetGSgMCvJycJeZLW',
      createdAt: '2021-06-20T05:02:51.326Z',
      updatedAt: '2021-06-20T05:02:51.326Z',
      __v: 0
    },
    createdAt: '2021-06-20T05:01:15.751Z',
    updatedAt: '2021-06-20T05:01:15.751Z',
    __v: 0
  },
  {
    state: 'Rechazado',
    _id: '60c50e5a89640300155baef4',
    title: 'aaaa',
    category: 'Enfermedades',
    description: 'aaaaaaaaaaaa',
    urlFoto: 'https://firebasestorage.googleapis.com/v0/b/myfirebase-acd6a.appspot.com/o/Veterinary%2FawaLogo.jpg?alt=media&token=771e021f-b984-4037-b0be-b9b14eb985d2',
    veterinary: {
      role: 'veterinary',
      _id: '60a66c31a6de4400159cc4c7',
      name: 'juan',
      last_name: 'Damian',
      vet: 'Directito al cielo',
      email: 'admin@admin.com',
      phone: '45656542',
      direction: 'calle juntas',
      urlImg: 'https://firebasestorage.googleapis.com/v0/b/myfirebase-acd6a.appspot.com/o/Veterinary%2Fchicote.png?alt=media&token=f3943b90-a14c-4c30-8003-cf22393509eb',
      password: '$2a$10$aJli.VMJnr2h/NUcDcVeCOyHdIMfbmhysiSOnetGSgMCvJycJeZLW',
      createdAt: '2021-06-20T05:02:51.326Z',
      updatedAt: '2021-06-20T05:02:51.326Z',
      __v: 0
    },
    createdAt: '2021-06-20T05:01:15.751Z',
    updatedAt: '2021-06-20T05:01:15.751Z',
    __v: 0
  },
  {
    state: 'Rechazado',
    _id: '60c5147989640300155baef8',
    title: 'asdasdasdasd',
    category: 'Enfermedades',
    description: 'asdsadasdsadsad',
    urlFoto: 'https://firebasestorage.googleapis.com/v0/b/myfirebase-acd6a.appspot.com/o/Veterinary%2FEstructura-Organica-Universidad-Mayor-de-San-Sim%C3%B3n.jpg?alt=media&token=39ea439b-5b2a-4b74-8f29-cb0fb277cdf3',
    veterinary: {
      role: 'veterinary',
      _id: '60a66c31a6de4400159cc4c7',
      name: 'juan',
      last_name: 'Damian',
      vet: 'Directito al cielo',
      email: 'admin@admin.com',
      phone: '45656542',
      direction: 'calle juntas',
      urlImg: 'https://firebasestorage.googleapis.com/v0/b/myfirebase-acd6a.appspot.com/o/Veterinary%2Fchicote.png?alt=media&token=f3943b90-a14c-4c30-8003-cf22393509eb',
      password: '$2a$10$aJli.VMJnr2h/NUcDcVeCOyHdIMfbmhysiSOnetGSgMCvJycJeZLW',
      createdAt: '2021-06-20T05:02:51.326Z',
      updatedAt: '2021-06-20T05:02:51.326Z',
      __v: 0
    },
    createdAt: '2021-06-20T05:01:15.751Z',
    updatedAt: '2021-06-20T05:01:15.751Z',
    __v: 0
  },
  {
    state: 'Rechazado',
    _id: '60c571ca4b74b100152c54fe',
    title: 'Prueba Solicitud',
    category: 'Vacunas',
    description: 'Esta es una pequeña descripción de prueba',
    urlFoto: 'https://firebasestorage.googleapis.com/v0/b/myfirebase-acd6a.appspot.com/o/Veterinary%2Fcastle-crashers-remastered-switch-hero.jpg?alt=media&token=fe1de5d6-57aa-48d8-951c-331dfc89422d',
    veterinary: {
      role: 'veterinary',
      _id: '60c567a44b74b100152c54fc',
      name: 'TEST',
      last_name: 'TEST',
      vet: 'TEST',
      email: '201703988@est.umss.edu',
      phone: '12345678',
      direction: 'TEST',
      urlImg: 'https://firebasestorage.googleapis.com/v0/b/myfirebase-acd6a.appspot.com/o/Veterinary%2FScreenshot_20210611-172616_Facebook.jpg?alt=media&token=a1098641-bb22-4c88-8ff8-f50336d41124',
      password: '$2a$10$Xensu2zNtBieepcmdfcQQeEfssMSYi.ycVIWg8ZymcwspnZ/6dDuW',
      createdAt: '2021-06-20T05:02:51.326Z',
      updatedAt: '2021-06-20T05:02:51.326Z',
      __v: 0
    },
    createdAt: '2021-06-20T05:01:15.751Z',
    updatedAt: '2021-06-20T05:01:15.751Z',
    __v: 0
  },
  {
    state: 'Aceptado',
    _id: '60c571d04b74b100152c54ff',
    title: 'Prueba Solicitud',
    category: 'Vacunas',
    description: 'Esta es una pequeña descripción de prueba',
    urlFoto: 'https://firebasestorage.googleapis.com/v0/b/myfirebase-acd6a.appspot.com/o/Veterinary%2Fcastle-crashers-remastered-switch-hero.jpg?alt=media&token=67aca1db-de32-4ef6-82b2-2f46803f3754',
    veterinary: {
      role: 'veterinary',
      _id: '60c567a44b74b100152c54fc',
      name: 'TEST',
      last_name: 'TEST',
      vet: 'TEST',
      email: '201703988@est.umss.edu',
      phone: '12345678',
      direction: 'TEST',
      urlImg: 'https://firebasestorage.googleapis.com/v0/b/myfirebase-acd6a.appspot.com/o/Veterinary%2FScreenshot_20210611-172616_Facebook.jpg?alt=media&token=a1098641-bb22-4c88-8ff8-f50336d41124',
      password: '$2a$10$Xensu2zNtBieepcmdfcQQeEfssMSYi.ycVIWg8ZymcwspnZ/6dDuW',
      createdAt: '2021-06-20T05:02:51.326Z',
      updatedAt: '2021-06-20T05:02:51.326Z',
      __v: 0
    },
    createdAt: '2021-06-20T05:01:15.751Z',
    updatedAt: '2021-06-20T05:01:15.751Z',
    __v: 0
  },
  {
    state: 'Aceptado',
    _id: '60c7845b7e07c90015818d69',
    title: 'skdjhfjksdhafkjhksdafkjlklsdf',
    category: 'Cuidado alimenticio',
    description: 'jlkñjlkjkljkl',
    urlFoto: 'https://firebasestorage.googleapis.com/v0/b/myfirebase-acd6a.appspot.com/o/Veterinary%2Fchicote.png?alt=media&token=7aa971a0-da67-4276-8f28-811be5470466',
    veterinary: {
      role: 'veterinary',
      _id: '60a5fdc65581cc3038a73baf',
      name: 'Jerry',
      last_name: 'Illanes Conde',
      vet: 'PERRITO AMIGO',
      email: 'jerry@gmail.com',
      phone: '62305458',
      direction: 'Sacaba huayllani',
      urlImg: 'https://inafe.es/wp-content/uploads/517.jpg',
      password: '$2a$10$ANHNDPMCMuqG5Vca9Ed8F.qmtUGxHRHMKRfA5twD9ZfsLm2AKT7Ay',
      createdAt: '2021-06-20T05:02:51.326Z',
      updatedAt: '2021-06-20T05:02:51.326Z',
      __v: 0
    },
    createdAt: '2021-06-20T05:01:15.751Z',
    updatedAt: '2021-06-20T05:01:15.751Z',
    __v: 0
  },
  {
    state: 'Aceptado',
    _id: '60cbf72a91688c001511e672',
    title: 'holas  gelen ',
    category: 'Enfermedades',
    description: 'fkewhgeufemewheqwrewroqe erqwuerereqwiorjeq ewreworjewqirje ewrweroeiwjrqewirjewi erweorjewoiqjr',
    urlFoto: 'https://firebasestorage.googleapis.com/v0/b/myfirebase-acd6a.appspot.com/o/Veterinary%2F941aaedab69653ef7f5fd99c01e1e5d1.jpg?alt=media&token=09fd6b0d-b0bb-4aaf-9836-cd35d52a8ea0',
    veterinary: {
      role: 'veterinary',
      _id: '60a6b97b39674600154c350f',
      name: 'lucas',
      last_name: 'alvares',
      vet: 'alvares',
      email: 'lucasalvares@gmail.com',
      phone: '12345678',
      direction: 'plaza sucre',
      urlImg: 'https://firebasestorage.googleapis.com/v0/b/myfirebase-acd6a.appspot.com/o/Veterinary%2F941aaedab69653ef7f5fd99c01e1e5d1.jpg?alt=media&token=48e7c7aa-cb49-4451-8879-52efe9940572',
      password: '$2a$10$0ZbiFm6x.sdnUuCOPW1l2em2dz4nJIzda5.fvMFkaVqBkWcSZK76q',
      createdAt: '2021-06-20T05:02:51.326Z',
      updatedAt: '2021-06-20T05:02:51.326Z',
      __v: 0
    },
    createdAt: '2021-06-20T05:01:15.751Z',
    updatedAt: '2021-06-20T05:01:15.751Z',
    __v: 0
  },
  {
    state: 'Aceptado',
    _id: '60cbf72b91688c001511e673',
    title: 'holas  gelen ',
    category: 'Enfermedades',
    description: 'fkewhgeufemewheqwrewroqe erqwuerereqwiorjeq ewreworjewqirje ewrweroeiwjrqewirjewi erweorjewoiqjr',
    urlFoto: 'https://firebasestorage.googleapis.com/v0/b/myfirebase-acd6a.appspot.com/o/Veterinary%2F941aaedab69653ef7f5fd99c01e1e5d1.jpg?alt=media&token=aa6c4e76-da92-4887-a0a1-8c90075e656a',
    veterinary: {
      role: 'veterinary',
      _id: '60a6b97b39674600154c350f',
      name: 'lucas',
      last_name: 'alvares',
      vet: 'alvares',
      email: 'lucasalvares@gmail.com',
      phone: '12345678',
      direction: 'plaza sucre',
      urlImg: 'https://firebasestorage.googleapis.com/v0/b/myfirebase-acd6a.appspot.com/o/Veterinary%2F941aaedab69653ef7f5fd99c01e1e5d1.jpg?alt=media&token=48e7c7aa-cb49-4451-8879-52efe9940572',
      password: '$2a$10$0ZbiFm6x.sdnUuCOPW1l2em2dz4nJIzda5.fvMFkaVqBkWcSZK76q',
      createdAt: '2021-06-20T05:02:51.326Z',
      updatedAt: '2021-06-20T05:02:51.326Z',
      __v: 0
    },
    createdAt: '2021-06-20T05:01:15.751Z',
    updatedAt: '2021-06-20T05:01:15.751Z',
    __v: 0
  },
  {
    state: 'Aceptado',
    _id: '60cbfa9e91688c001511e674',
    title: 'qwertyutqewrtyu',
    category: 'Enfermedades',
    description: 'eqrtyuiolkjhgfdsaXCZVBNMHIUYTDAEQWRIUOLKJHGFDSZXCVBNVJKTREWDS',
    urlFoto: 'https://firebasestorage.googleapis.com/v0/b/myfirebase-acd6a.appspot.com/o/Veterinary%2F941aaedab69653ef7f5fd99c01e1e5d1.jpg?alt=media&token=5d595f67-c83d-4cef-9764-144424f3813f',
    veterinary: {
      role: 'veterinary',
      _id: '60a6b97b39674600154c350f',
      name: 'lucas',
      last_name: 'alvares',
      vet: 'alvares',
      email: 'lucasalvares@gmail.com',
      phone: '12345678',
      direction: 'plaza sucre',
      urlImg: 'https://firebasestorage.googleapis.com/v0/b/myfirebase-acd6a.appspot.com/o/Veterinary%2F941aaedab69653ef7f5fd99c01e1e5d1.jpg?alt=media&token=48e7c7aa-cb49-4451-8879-52efe9940572',
      password: '$2a$10$0ZbiFm6x.sdnUuCOPW1l2em2dz4nJIzda5.fvMFkaVqBkWcSZK76q',
      createdAt: '2021-06-20T05:02:51.326Z',
      updatedAt: '2021-06-20T05:02:51.326Z',
      __v: 0
    },
    createdAt: '2021-06-20T05:01:15.751Z',
    updatedAt: '2021-06-20T05:01:15.751Z',
    __v: 0
  },
  {
    state: 'Rechazado',
    _id: '60cbfa9f91688c001511e675',
    title: 'qwertyutqewrtyu',
    category: 'Enfermedades',
    description: 'eqrtyuiolkjhgfdsaXCZVBNMHIUYTDAEQWRIUOLKJHGFDSZXCVBNVJKTREWDS',
    urlFoto: 'https://firebasestorage.googleapis.com/v0/b/myfirebase-acd6a.appspot.com/o/Veterinary%2F941aaedab69653ef7f5fd99c01e1e5d1.jpg?alt=media&token=3e133c33-ab52-4e59-b413-050081c849b2',
    veterinary: {
      role: 'veterinary',
      _id: '60a6b97b39674600154c350f',
      name: 'lucas',
      last_name: 'alvares',
      vet: 'alvares',
      email: 'lucasalvares@gmail.com',
      phone: '12345678',
      direction: 'plaza sucre',
      urlImg: 'https://firebasestorage.googleapis.com/v0/b/myfirebase-acd6a.appspot.com/o/Veterinary%2F941aaedab69653ef7f5fd99c01e1e5d1.jpg?alt=media&token=48e7c7aa-cb49-4451-8879-52efe9940572',
      password: '$2a$10$0ZbiFm6x.sdnUuCOPW1l2em2dz4nJIzda5.fvMFkaVqBkWcSZK76q',
      createdAt: '2021-06-20T05:02:51.326Z',
      updatedAt: '2021-06-20T05:02:51.326Z',
      __v: 0
    },
    createdAt: '2021-06-20T05:01:15.751Z',
    updatedAt: '2021-06-20T05:01:15.751Z',
    __v: 0
  },
  {
    state: 'Rechazado',
    _id: '60cc06ac91688c001511e676',
    title: 'churrito caliente',
    category: 'Cuidado alimenticio',
    description: 'ofrece alimentos a domicilio ',
    urlFoto: 'https://firebasestorage.googleapis.com/v0/b/myfirebase-acd6a.appspot.com/o/Veterinary%2F941aaedab69653ef7f5fd99c01e1e5d1.jpg?alt=media&token=9fd85450-9b07-4f5f-9e69-64138386698a',
    veterinary: {
      role: 'veterinary',
      _id: '60a6b97b39674600154c350f',
      name: 'lucas',
      last_name: 'alvares',
      vet: 'alvares',
      email: 'lucasalvares@gmail.com',
      phone: '12345678',
      direction: 'plaza sucre',
      urlImg: 'https://firebasestorage.googleapis.com/v0/b/myfirebase-acd6a.appspot.com/o/Veterinary%2F941aaedab69653ef7f5fd99c01e1e5d1.jpg?alt=media&token=48e7c7aa-cb49-4451-8879-52efe9940572',
      password: '$2a$10$0ZbiFm6x.sdnUuCOPW1l2em2dz4nJIzda5.fvMFkaVqBkWcSZK76q',
      createdAt: '2021-06-20T05:02:51.326Z',
      updatedAt: '2021-06-20T05:02:51.326Z',
      __v: 0
    },
    createdAt: '2021-06-20T05:01:15.751Z',
    updatedAt: '2021-06-20T05:01:15.751Z',
    __v: 0
  },
  {
    state: 'Pendiente',
    _id: '60ccc3ed2b47940015de72e3',
    title: 'asdsadasdsad',
    category: 'Enfermedades',
    description: 'sadsadsadasdasdsad',
    urlFoto: 'https://firebasestorage.googleapis.com/v0/b/myfirebase-acd6a.appspot.com/o/Veterinary%2Ffrases-de-arquitectura.jpg?alt=media&token=0bb21724-db00-49b6-b179-e6fa2a170fa9',
    veterinary: {
      role: 'veterinary',
      _id: '60a66c31a6de4400159cc4c7',
      name: 'juan',
      last_name: 'Damian',
      vet: 'Directito al cielo',
      email: 'admin@admin.com',
      phone: '45656542',
      direction: 'calle juntas',
      urlImg: 'https://firebasestorage.googleapis.com/v0/b/myfirebase-acd6a.appspot.com/o/Veterinary%2Fchicote.png?alt=media&token=f3943b90-a14c-4c30-8003-cf22393509eb',
      password: '$2a$10$aJli.VMJnr2h/NUcDcVeCOyHdIMfbmhysiSOnetGSgMCvJycJeZLW',
      createdAt: '2021-06-20T05:02:51.326Z',
      updatedAt: '2021-06-20T05:02:51.326Z',
      __v: 0
    },
    createdAt: '2021-06-20T05:01:15.751Z',
    updatedAt: '2021-06-20T05:01:15.751Z',
    __v: 0
  },
  {
    state: 'Rechazado',
    _id: '60ccc4052b47940015de72e4',
    title: 'sadsadsadasd',
    category: 'Vacunas',
    description: 'asdasdasdsadasd',
    urlFoto: 'https://firebasestorage.googleapis.com/v0/b/myfirebase-acd6a.appspot.com/o/Veterinary%2FahiViene.png?alt=media&token=b81c33a3-20c5-4073-850e-61be927986d0',
    veterinary: {
      role: 'veterinary',
      _id: '60a66c31a6de4400159cc4c7',
      name: 'juan',
      last_name: 'Damian',
      vet: 'Directito al cielo',
      email: 'admin@admin.com',
      phone: '45656542',
      direction: 'calle juntas',
      urlImg: 'https://firebasestorage.googleapis.com/v0/b/myfirebase-acd6a.appspot.com/o/Veterinary%2Fchicote.png?alt=media&token=f3943b90-a14c-4c30-8003-cf22393509eb',
      password: '$2a$10$aJli.VMJnr2h/NUcDcVeCOyHdIMfbmhysiSOnetGSgMCvJycJeZLW',
      createdAt: '2021-06-20T05:02:51.326Z',
      updatedAt: '2021-06-20T05:02:51.326Z',
      __v: 0
    },
    createdAt: '2021-06-20T05:01:15.751Z',
    updatedAt: '2021-06-20T05:01:15.751Z',
    __v: 0
  },
  {
    state: 'Pendiente',
    _id: '60cec66eaf327a29b86cd0ae',
    title: 'Titulo informacion #5',
    category: 'Enfermedades',
    description: 'asdfadf asdfadf asdfadf asdfadfa adfadfasdf aadfadf asdfadfadfa adfadf',
    urlFoto: '/public/publications',
    veterinary: {
      role: 'veterinary',
      _id: '60a66c31a6de4400159cc4c7',
      name: 'juan',
      last_name: 'Damian',
      vet: 'Directito al cielo',
      email: 'admin@admin.com',
      phone: '45656542',
      direction: 'calle juntas',
      urlImg: 'https://firebasestorage.googleapis.com/v0/b/myfirebase-acd6a.appspot.com/o/Veterinary%2Fchicote.png?alt=media&token=f3943b90-a14c-4c30-8003-cf22393509eb',
      password: '$2a$10$aJli.VMJnr2h/NUcDcVeCOyHdIMfbmhysiSOnetGSgMCvJycJeZLW',
      createdAt: '2021-06-20T05:02:51.326Z',
      updatedAt: '2021-06-20T05:02:51.326Z',
      __v: 0
    },
    createdAt: '2021-06-20T05:01:15.751Z',
    updatedAt: '2021-06-20T05:01:15.751Z',
    __v: 0
  },
  {
    state: 'Pendiente',
    _id: '60cecb9b0f653b3118b1dbec',
    title: 'Titulo informacion #6',
    category: 'Enfermedades',
    description: 'asdfadf asdfadf asdfadf asdfadfa adfadfasdf aadfadf asdfadfadfa adfadf',
    urlFoto: '/public/publications',
    veterinary: {
      role: 'veterinary',
      _id: '60a66c31a6de4400159cc4c7',
      name: 'juan',
      last_name: 'Damian',
      vet: 'Directito al cielo',
      email: 'admin@admin.com',
      phone: '45656542',
      direction: 'calle juntas',
      urlImg: 'https://firebasestorage.googleapis.com/v0/b/myfirebase-acd6a.appspot.com/o/Veterinary%2Fchicote.png?alt=media&token=f3943b90-a14c-4c30-8003-cf22393509eb',
      password: '$2a$10$aJli.VMJnr2h/NUcDcVeCOyHdIMfbmhysiSOnetGSgMCvJycJeZLW',
      createdAt: '2021-06-20T05:02:51.326Z',
      updatedAt: '2021-06-20T05:02:51.326Z',
      __v: 0
    },
    createdAt: '2021-06-20T05:01:15.751Z',
    updatedAt: '2021-06-20T05:01:15.751Z',
    __v: 0
  },
  {
    state: 'Rechazado',
    _id: '60cece2199af420e414c21fd',
    title: 'sadsadsadasd',
    category: 'Vacunas',
    description: 'asdasdasdsadasd',
    urlFoto: 'https://firebasestorage.googleapis.com/v0/b/myfirebase-acd6a.appspot.com/o/Veterinary%2FahiViene.png?alt=media&token=b81c33a3-20c5-4073-850e-61be927986d0',
    veterinary: {
      role: 'veterinary',
      _id: '60a66c31a6de4400159cc4c7',
      name: 'juan',
      last_name: 'Damian',
      vet: 'Directito al cielo',
      email: 'admin@admin.com',
      phone: '45656542',
      direction: 'calle juntas',
      urlImg: 'https://firebasestorage.googleapis.com/v0/b/myfirebase-acd6a.appspot.com/o/Veterinary%2Fchicote.png?alt=media&token=f3943b90-a14c-4c30-8003-cf22393509eb',
      password: '$2a$10$aJli.VMJnr2h/NUcDcVeCOyHdIMfbmhysiSOnetGSgMCvJycJeZLW',
      createdAt: '2021-06-20T05:02:51.326Z',
      updatedAt: '2021-06-20T05:02:51.326Z',
      __v: 0
    },
    createdAt: '2021-06-20T05:01:15.751Z',
    updatedAt: '2021-06-20T05:01:15.751Z',
    __v: 0
  }
]
router.get('/generatev0', async(req,res)=>{
  const users = await User.find();
  const informations = await Information.find().populate({ path: 'veterinary', model: 'User' }).exec();
  const TOTAL_VETERIANRIOS=users.length;
  const TOTAL_PUBLICACIONES = informations.length;
  const info_aceptados = [];
  const info_rechazados = [];
  const info_pendientes = [];
  informations.forEach(info => {
    if(info.state=="Aceptado"){
      info_aceptados.push(info);
    }
    if(info.state=="Rechazado"){
      info_rechazados.push(info);
    }
    if(info.state=="Pendiente"){
      info_pendientes.push(info);
    }
  });
  const total_aceptados = info_aceptados.length;
  const total_rechazados = info_rechazados.length;
  const total_pendientes = info_pendientes.length;
  const datas={
    users,
    informations,
    TOTAL_VETERIANRIOS,TOTAL_PUBLICACIONES,
    info_aceptados,info_rechazados,info_pendientes,
    total_aceptados,total_rechazados,total_pendientes
  }

  ejs.renderFile(path.join(__dirname, './views/', "report-template.ejs"), {datas: datas}, (err, data) => {
    if (err) {
          res.send(err);
    } else {
        let options = {
            "height": "11.25in",
            "width": "8.5in",
            "header": {
                "height": "20mm"
            },
            "footer": {
                "height": "20mm",
            },
        };
        pdf.create(data, options).toFile(path.join(__dirname,'report.pdf'), function (err, data) {
            if (err) {
                res.json({message:"Error"});
            } else {
                res.json({message:"File report created successfully"});
            }
        });
    }
 });
});

router.get('/generate', async(req,res)=>{
  const users = await User.find();
  const informations = await Information.find().populate({ path: 'veterinary', model: 'User' }).exec();
  const TOTAL_VETERIANRIOS=users.length;
  const TOTAL_PUBLICACIONES = informations.length;
  const info_aceptados = [];
  const info_rechazados = [];
  const info_pendientes = [];
  informations.forEach(info => {
    if(info.state=="Aceptado"){
      info_aceptados.push(info);
    }
    if(info.state=="Rechazado"){
      info_rechazados.push(info);
    }
    if(info.state=="Pendiente"){
      info_pendientes.push(info);
    }
  });
  const total_aceptados = info_aceptados.length;
  const total_rechazados = info_rechazados.length;
  const total_pendientes = info_pendientes.length;
  const datas={
    users,
    informations,
    TOTAL_VETERIANRIOS,TOTAL_PUBLICACIONES,
    info_aceptados,info_rechazados,info_pendientes,
    total_aceptados,total_rechazados,total_pendientes
  }

  ejs.renderFile(path.join(__dirname, './views/', "v2report-template.ejs"), {datas: datas}, (err, data) => {
    if (err) {
          res.send(err);
    } else {
        let options = {
            "height": "11.25in",
            "width": "8.5in",
            "header": {
                "height": "20mm"
            },
            "footer": {
                "height": "20mm",
            },
        };
        pdf.create(data, options).toFile(path.join(__dirname,'report.pdf'), function (err, data) {
            if (err) {
                res.json({message:"Error"});
            } else {
                res.json({message:"File report created successfully"});
            }
        });
    }
 });
});



router.get('/view',(req,res)=>{
  var filePath = path.join(__dirname,"report.pdf");
  fs.readFile(filePath,function(err,data){
      res.contentType("application/pdf");
      res.send(data);
  })
});
router.get('/dowload',(req,res)=>{
  var file = path.join(__dirname,"report.pdf");
  res.download(file, function (err) {
     if (err) {
         console.log("Error");
         console.log(err);
     } else {
         console.log("Success");
     }
 });
});


module.exports = router;



