import { Role } from '@prisma/client';

export const users = [
  {
    email: 'user1@gmail.com',
    password: '$2a$12$9GakqyJUygjQZO0wvM3Nv.LFl8pve87hY08agj1vH8ARCVl/DNnTm',
    role: Role.USER,
  },
  {
    email: 'user2@gmail.com',
    password: '$2a$12$lLWeyuPc3pWj.42cwPiPLuBRXVUrZQCppnowZVttSMoO44PWVUwZS',
    role: Role.USER,
  },
  {
    email: 'editor1@gmail.com',
    password: '$2a$12$khrXwgCB3zYfjxpXh5oUgubLyzdRYnew2e8oVUuFmfwnhLqLyv.uK',
    role: Role.EDITOR,
  },
  {
    email: 'editor2@gmail.com',
    password: '$2a$12$MMTqTO6/LjV/aKZC2X3Y3OM/B57M0YZw/x3YSkzjE3xYADWviwQ2y',
    role: Role.EDITOR,
  },
  {
    email: 'admin@gmail.com',
    password: '$2a$12$HGW3APZRdjnUUqKsPmXcM.4yg8vk.gGPHONt8mYlR81Fw1q8wphYW',
    role: Role.ADMIN,
  },
];
