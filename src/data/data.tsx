// Sidebar imports
import { BsCurrencyDollar } from 'react-icons/bs';
import { ImTicket } from 'react-icons/im';

  
  // Recent Card Imports
import img1 from '../assets/imgs/img1.png';
import img2 from '../assets/imgs/img2.png';
import img3 from '../assets/imgs/img3.png';
import { CardType } from '../types';
  
  // Sidebar Data
  
  // Analytics Cards Data
  export const cardsData: CardType[] = [
    {
      title: "Reservas",
      color: {
        background: "#FFF",
        boxShadow: "0px 10px 15px 0px #666",
      },
      barValue: 70,
      value: "25,970",
      icon: <ImTicket />,
      series: [
        {
          name: "Sales",
          data: [31, 40, 28, 51, 42, 109, 100],
        },
      ],
    },
    {
      title: "Ingressos",
      color: {
        background: "#FFF",
        boxShadow: "0px 10px 15px 0px #666",
      },
      barValue: 80,
      value: "14,270",
      icon: <BsCurrencyDollar />,
      series: [
        {
          name: "Revenue",
          data: [10, 100, 50, 70, 80, 30, 40],
        },
      ],
    },
    {
      title: "Faturamento",
      color: {
        background: "#FFF",
        boxShadow: "0px 10px 15px 0px #666",
      },
      barValue: 60,
      value: "4,270",
      icon: <BsCurrencyDollar />,
      series: [
        {
          name: "Expenses",
          data: [10, 25, 15, 30, 12, 15, 20],
        },
      ],
    },
  ];
  
  // Recent Update Card Data
  export const UpdatesData = [
    {
      img: img1,
      name: "Andrew Thomas",
      noti: "has ordered Apple smart watch 2500mh battery.",
      time: "25 seconds ago",
    },
    {
      img: img2,
      name: "James Bond",
      noti: "has received Samsung gadget for charging battery.",
      time: "30 minutes ago",
    },
    {
      img: img3,
      name: "Iron Man",
      noti: "has ordered Apple smart watch, samsung Gear 2500mh battery.",
      time: "2 hours ago",
    },
  ];

  export const GENRES: any = {
    '28': 'Action',
    '12': 'Adventure',
    '16': 'Animation',
    '35': 'Comedy',
    '80': 'Crime',
    '99': 'Documentary',
    '18': 'Drama',
    '10751': 'Family',
    '14': 'Fantasy',
    '36': 'History',
    '27': 'Horror',
    '10402': 'Music',
    '9648': 'Mystery',
    '10749': 'Romance',
    '878': 'Science Fiction',
    '10770': 'TV Movie',
    '53': 'Thriller',
    '10752': 'War',
    '37': 'Western'
}
  