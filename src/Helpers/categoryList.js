import obatObatan from "../Assets/obat-cat.png";
import nutrisi from "../Assets/nutrisi-cat.png";
import herbal from "../Assets/herbal-cat.png";
import vitamin from "../Assets/vitamin-cat.png";
import alatKesehatan from "../Assets/alat-cat.png";
import perawatan from "../Assets/perawatan-cat.png";

const categoryList = [
  { cardText: "Obat-Obatan", cardPath: "obat", cardPic: obatObatan },
  { cardText: "Nutrisi", cardPath: "nutrisi", cardPic: nutrisi },
  { cardText: "Herbal", cardPath: "herbal", cardPic: herbal },
  { cardText: "Vitamin & Suplemen", cardPath: "vitamin", cardPic: vitamin },
  {
    cardText: "Alat Kesehatan",
    cardPath: "alat-kesehatan",
    cardPic: alatKesehatan,
  },
  { cardText: "Perawatan Tubuh", cardPath: "perawatan", cardPic: perawatan },
  { cardText: "Ibu dan Anak", cardPath: "obat", cardPic: obatObatan },
];

export default categoryList;
