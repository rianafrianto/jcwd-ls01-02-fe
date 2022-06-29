import obatObatan from "../Assets/obat-cat.png";
import nutrisi from "../Assets/nutrisi-cat.png";
import herbal from "../Assets/herbal-cat.png";
import vitamin from "../Assets/vitamin-cat.png";
import alatKesehatan from "../Assets/alat-cat.png";
import perawatan from "../Assets/perawatan-cat.png";

const categoryList = [
  { cardText: "Obat-Obatan", cardPath: "obat-obatan", cardPic: obatObatan },
  { cardText: "Nutrisi", cardPath: "nutrisi", cardPic: nutrisi },
  { cardText: "Herbal", cardPath: "herbal", cardPic: herbal },
  {
    cardText: "Vitamin & Suplemen",
    cardPath: "vitamin_&_suplemen",
    cardPic: vitamin,
  },
  {
    cardText: "Alat Kesehatan",
    cardPath: "alat_kesehatan",
    cardPic: alatKesehatan,
  },
  {
    cardText: "Perawatan Tubuh",
    cardPath: "perawatan_tubuh",
    cardPic: perawatan,
  },
  { cardText: "Ibu & Anak", cardPath: "ibu_&_anak", cardPic: obatObatan },
];

export default categoryList;
