export interface User {
  accountNumber: string;
  name: string;
  country: string;
  dateJoined: Date;
  email: string;
  postalAddress: string;
  phoneNumber: string;
  favoriteBand: string;
  postsPerWeek: number[];
}

const NAMES = [
    'Alice',
    'Bob',
    'Carol',
    'David',
    'Eve',
    'Frank',
    'Grace',
    'Harold',
    'Ivy',
    'James',
    'Kate',
    'Larry',
    'Mary',
    'Nick',
    'Olive',
    'Paul',
    'Quinn',
    'Roger',
    'Sarah',
    'Tom',
    'Ursula',
    'Victor',
    'Wendy',
    'Xander',
    'Yvonne',
    'Zack',
  ],
  COUNTRIES = ['England', 'Ireland', 'Scotland', 'Wales'],
  EMAIL_DOMAINS = ['gmail.com', 'hotmail.com', 'mail.com'],
  BANDS = ['The Beatles', 'The Rolling Stones'];

function randomNumber(max: number) {
  return Math.floor(Math.random() * max);
}
function randomEntry(arr: any[]) {
  return arr[randomNumber(arr.length)];
}
function zeroPad(num: number, length: number = 4) {
  return ('' + num).padStart(length, '0');
}

let nextAccountNumber = 0;
function generateDummyUser() {
  const firstName = randomEntry(NAMES),
    lastName = `${randomEntry(NAMES)}son`,
    country = randomEntry(COUNTRIES);
  return {
    accountNumber: `555-${zeroPad((nextAccountNumber += 1 + randomNumber(5)))}`,
    name: `${firstName} ${lastName}`,
    country,
    dateJoined: new Date(
      2000 + randomNumber(20),
      randomNumber(12),
      randomNumber(28)
    ),
    email: `${firstName}@${randomEntry([
      ...EMAIL_DOMAINS,
      `${country}.com`,
      `${lastName}.com`,
    ])}`.toLowerCase(),
    postalAddress: `${randomNumber(99) + 1} Main Street, ${country}`,
    phoneNumber: `1800-${zeroPad(randomNumber(999), 3)}-${zeroPad(
      randomNumber(9999),
      4
    )}`,
    favoriteBand: randomEntry(BANDS),
    postsPerWeek: Array.from({ length: 6 }, () => randomNumber(300)),
  };
}

export function generateDummyUsers(length: number = 100) {
  return Array.from({ length }, generateDummyUser);
}
