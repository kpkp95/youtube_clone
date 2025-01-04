import { MdOutlineSportsKabaddi } from "react-icons/md";
import {
  FaHome,
  FaVideo,
  FaBroadcastTower,
  FaMusic,
  FaGamepad,
  FaFilm,
  FaTv,
} from "react-icons/fa";

export const YOUTUBE_IMG_URL =
  "https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg";

export const SEARCH_API_URL =
  "https://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q=";

//kp94
export const YOUTUBE_VIDEO_URL = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=US&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`;

//kp7
export const YOUTUBE_VIDEO_URL_2 = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=US&key=${process.env.REACT_APP_YOUTUBE_API_KEY2}`;

//pandey.kunal.k
export const YOUTUBE_VIDEO_URL_3 = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=US&key=${process.env.REACT_APP_YOUTUBE_API_KEY3}`;

//pandey.k
export const YOUTUBE_VIDEO_URL_4 = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=US&key=${process.env.REACT_APP_YOUTUBE_API_KEY4}`;

export const menuItems = [
  { name: "Home", icon: <FaHome /> },
  { name: "Short", icon: <FaVideo /> },
  { name: "Videos", icon: <FaTv /> },
  { name: "Live", icon: <FaBroadcastTower /> },
];

export const subscriptions = [
  { name: "Music", icon: <FaMusic /> },
  { name: "Gaming", icon: <FaGamepad /> },
  { name: "Sports", icon: <MdOutlineSportsKabaddi /> },
  { name: "Movies", icon: <FaFilm /> },
];

export const BTN_NAME_LIST = [
  "All",
  "Music",
  "Podcast",
  "Gaming",
  "News",
  "Live",
  "Fashion",
  "Learning",

  "Cricket",
  "Football",
  "Naruto",

  "One Piece",
  "Tennis",
  "Thrillers",

  "Test Cricket",
  "Comedy",
  "Drama",
  "Action",
  "Adventure",
  "Horror",
  "Romance",
  "Sci-Fi",
  "Fantasy",
  "Mystery",
];

export const COMMENT_DATA = [
  {
    name: "John Doe",
    id: 1,
    text: "This is a parent comment",
    replies: [
      {
        name: "Emily Blunt",
        id: 2,
        text: "This is a reply to the parent comment",
        replies: [
          {
            name: "Robery Downey Jr.",
            id: 3,
            text: "This is a reply to the reply",
            replies: [], // This can continue indefinitely
          },
        ],
      },
    ],
  },
  {
    name: "Akshay Kumar",
    id: 4,
    text: "This is a comment 2",
    replies: [
      {
        name: "Ranbir Kumar",
        id: 5,
        text: "This is a reply to the parent comment2",
        replies: [
          {
            name: "Ranbir Kapoor",
            id: 6,
            text: "This is a reply to the reply",
            replies: [], // This can continue indefinitely
          },
          {
            name: "Harshad Mehta",
            id: 7,
            text: "This is a reply to the reply",
            replies: [
              {
                name: "Jessica Johansson",
                id: 8,
                text: "This is a reply to the reply",
                replies: [], // This can continue indefinitely
              },
            ], // This can continue indefinitely
          },
        ],
      },
    ],
  },
  {
    name: "Akshay Kumar",
    id: 9,
    text: "This is a comment 2",
    replies: [
      {
        name: "Ranbir Kumar",
        id: 10,
        text: "This is a reply to the parent comment2",
        replies: [
          {
            name: "Ranbir Kapoor",
            id: 11,
            text: "This is a reply to the reply",
            replies: [], // This can continue indefinitely
          },
          {
            name: "Harshad Mehta",
            id: 12,
            text: "This is a reply to the reply",
            replies: [
              {
                name: "Jessica Johansson",
                id: 13,
                text: "This is a reply to the reply",
                replies: [
                  {
                    name: "Jessica Johansson",
                    id: 14,
                    text: "This is a reply to the reply",
                    replies: [], // This can continue indefinitely
                  },
                ], // This can continue indefinitely
              },
            ], // This can continue indefinitely
          },
        ],
      },
    ],
  },
  {
    name: "Akshay Kumar",
    id: 15,
    text: "This is a comment 2",
    replies: [
      {
        name: "Ranbir Kumar",
        id: 16,
        text: "This is a reply to the parent comment2",
        replies: [
          {
            name: "Ranbir Kapoor",
            id: 17,
            text: "This is a reply to the reply",
            replies: [], // This can continue indefinitely
          },
          {
            name: "Harshad Mehta",
            id: 18,
            text: "This is a reply to the reply",
            replies: [
              {
                name: "Jessica Johansson",
                id: 19,
                text: "This is a reply to the reply",
                replies: [
                  {
                    name: "Jessica Johansson",
                    id: 20,
                    text: "This is a reply to the reply",
                    replies: [], // This can continue indefinitely
                  },
                ], // This can continue indefinitely
              },
            ], // This can continue indefinitely
          },
        ],
      },
    ],
  },
];
