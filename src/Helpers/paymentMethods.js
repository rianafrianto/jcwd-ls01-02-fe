import bcaIcon from "../Assets/bca-icon.png";
import mandiriIcon from "../Assets/mandiri-icon.png";
import permataIcon from "../Assets/permata-icon.png";
import ovoIcon from "../Assets/ovo-icon.png";
import gopayIcon from "../Assets/gopay-icon.png";
import shopeepayIcon from "../Assets/shopeepay-icon.png";

export const paymentMethods = [
  {
    value: "BCA",
    image: bcaIcon,
    name: "BCA",
    list: ["ATM BCA", "m-BCA (BCA Mobile)", "Internet Banking BCA"],
  },

  {
    value: "MANDIRI",
    image: mandiriIcon,
    name: "Mandiri",
    list: [
      "ATM Mandiri",
      "m-Banking Mandiri (Mandiri Livin)",
      "Internet Banking Mandiri",
    ],
  },

  {
    value: "PERMATA",
    image: permataIcon,
    name: "Permata",
    list: [
      "ATM Permata Bank",
      "m-Banking Permata Bank (PermataMobile X)",
      "Internet Banking Mandiri",
    ],
  },
  {
    value: "GOPAY",
    image: gopayIcon,
    name: "Gopay",
    list: ["GoPay"],
  },
  {
    value: "OVO",
    image: ovoIcon,
    name: "OVO",
    list: ["OVO"],
  },
  {
    value: "SHOPEEPAY",
    image: shopeepayIcon,
    name: "ShopeePay",
    list: ["ShopeePay"],
  },
];
