import { Role } from '@prisma/client';

export const users = [
  {
    email: 'user1@gmail.com',
    password: '$2b$12$8YBMf2OxEbG/QpXHLQ9WmOoCxLyEAFPffWOP0xDUi3TnUSBGdxNo2',
    role: Role.USER,
  },
  {
    email: 'user2@gmail.com',
    password: '$2b$12$ZsixHtdeo5EFhgoARGBg6uQ9f7ZwE1/YIKimMXFijjInstntri55K',
    role: Role.USER,
  },
  {
    email: 'editor1@gmail.com',
    password: '$2b$12$86iDoksH/6/vnRSl5tj09u1Q6q/sZxLGF3mVBpjDLhBrap9qFUR8.',
    role: Role.EDITOR,
  },
  {
    email: 'editor2@gmail.com',
    password: '$2b$12$6hzpp/VT6F62JgEMtYYijOkJC9jJRrjXGj0iFe4ohI4PP6lbmNvw2',
    role: Role.EDITOR,
  },
  {
    email: 'admin@gmail.com',
    password: '$2b$12$e0RoBaM8mkl80wo2DK2uYuJcKuum587xI27p5vbURpcEETAtvxB3C',
    role: Role.ADMIN,
  },
];
