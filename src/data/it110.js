// IT 110 lesson list (from IT110_Syllabus_AY2627). status: 'live' (on the site) or 'soon' (not built yet).
// Same shape as data/itc120.js, so the course page works the same way. Built in course order of need (chat 41):
// software first, then input and output, then networks (midterm), then prelim lessons and the finals.
export const course = {
  code: 'IT 110',
  title: 'Introduction to Computing',
  who: 'BSIT 1st Year · A.Y. 2026–2027, 1st Semester',
  href: '/it110/',
};

export const terms = [
  {
    id: 'prelim',
    name: 'Prelim topics',
    note: 'Weeks 1 to 6. You had these in class; the site versions are coming.',
    units: [
      { name: 'Computing and the IT profession', icon: 'people', lessons: [
        { title: 'Computing disciplines and the IT profession', href: '/it110/it-profession/', status: 'soon' },
        { title: 'IT research, applications, and impact on society', href: '/it110/it-impact/', status: 'soon' },
      ] },
      { name: 'The world of computers', icon: 'pc', lessons: [
        { title: 'Introduction to the world of computers', href: '/it110/world-of-computers/', status: 'soon' },
      ] },
      { name: 'Computer hardware: inside the box', icon: 'chip', lessons: [
        { title: 'Processing and memory', href: '/it110/processing-memory/', status: 'soon' },
        { title: 'Storage', href: '/it110/storage/', status: 'soon' },
      ] },
    ],
  },
  {
    id: 'midterm',
    open: true,
    name: 'Midterm topics',
    note: 'Weeks 8 to 12. Everything you need for the midterm exam.',
    units: [
      { name: 'Computer hardware: input and output', icon: 'io', lessons: [
        { title: 'Input and output devices', href: '/it110/input-output/', status: 'soon' },
      ] },
      { name: 'Software', icon: 'app', lessons: [
        { title: 'System software: operating systems and utility programs', href: '/it110/system-software/', status: 'live', blurb: 'What an operating system does, how it makes the computer faster, which OS runs on which device, and the utility programs that keep it healthy.' },
        { title: 'Application software', href: '/it110/application-software/', status: 'soon', blurb: 'Who owns the software, installed vs. cloud apps, and the apps you will use most: word processors, spreadsheets, databases, slides, and more.' },
      ] },
      { name: 'Networks and the Internet', icon: 'net', lessons: [
        { title: 'Computer networks', href: '/it110/networks/', status: 'soon' },
        { title: 'The Internet and the World Wide Web', href: '/it110/internet/', status: 'soon' },
      ] },
    ],
  },
  {
    id: 'final',
    name: 'Final topics',
    note: 'After the midterm: security, information systems, databases, and ethics.',
    units: [
      { name: 'Security and information systems', icon: 'shield', lessons: [
        { title: 'Network and Internet security', href: '/it110/net-security/', status: 'soon' },
        { title: 'Information systems and system development', href: '/it110/info-systems/', status: 'soon' },
        { title: 'Databases and database management systems', href: '/it110/databases/', status: 'soon' },
        { title: 'Security, privacy, intellectual property, and ethics', href: '/it110/ethics/', status: 'soon' },
      ] },
    ],
  },
];
