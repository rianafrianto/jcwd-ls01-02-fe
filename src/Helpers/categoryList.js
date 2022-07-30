import obatObatan from "../Assets/obat-cat.png";
import nutrisi from "../Assets/nutrisi-cat.png";
import herbal from "../Assets/herbal-cat.png";
import vitamin from "../Assets/vitamin-cat.png";
import alatKesehatan from "../Assets/alat-cat.png";
import perawatan from "../Assets/perawatan-cat.png";

export const categoryList = [
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

export const printCategory = (cat) => {
  if (cat === "all") {
    return "Semua";
  }
  if (cat.split("_").length === 1) {
    cat = cat.split("-");
    cat = cat
      .map((val) => {
        val = val.split("");
        val[0] = val[0].toUpperCase();
        val = val.join("");
        return val;
      })
      .join("-");
    return cat;
  }
  cat = cat.split("_");
  cat = cat
    .map((val) => {
      val = val.split("");
      val[0] = val[0].toUpperCase();
      val = val.join("");
      return val;
    })
    .join(" ");
  return cat;
};

export const printCategoryParams = (cat) => {
  return cat.split(" ").join("_");
};

export const golonganList = [
  { content: "Obat Bebas", value: 1 },
  {
    content: "Obat Keras",
    value: 2,
  },
  {
    content: "Obat Bebas Terbatas",
    value: 3,
  },
  {
    content: "Medical Device & Consumable",
    value: 4,
  },
  {
    content: "Lain-lain",
    value: 5,
  },
];

export const satuanList = [
  { content: "Botol", value: 1 },
  { content: "Box", value: 2 },
  { content: "Kaleng", value: 3 },
  { content: "Kit", value: 4 },
  { content: "Piece", value: 5 },
  { content: "Sachet", value: 6 },
  { content: "Strip", value: 7 },
  { content: "Tube", value: 8 },
];
