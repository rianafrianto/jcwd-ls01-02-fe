import axios from "axios";
import { useEffect, useState } from "react";
import API_URL from "./API_URL";
import Cookies from "js-cookie";

export default function useProductsSearch(terms, page, isOpen) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [products, setProducts] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  let token = Cookies.get("token");
  const order = "ORDER BY name ASC";
  const limit = 5;
  const category = "semua";
  let cancel;

  useEffect(() => {
    if (isOpen) {
      setProducts([]);
      setLoading(true);
      setError(false);
      axios({
        method: "GET",
        url: `${API_URL}/admin/filter-products`,
        headers: { authentication: token },
        params: { terms, page, order, limit, category },
        cancelToken: new axios.CancelToken((c) => (cancel = c)),
      })
        .then((res) => {
          setProducts((prev) => [...prev, ...res.data.data.map((val) => val)]);
          setHasMore(res.data.data.length > 0);
          setLoading(false);
        })
        .catch((e) => {
          if (axios.isCancel(e)) return;
          setError(true);
          console.log(e);
        });
      if (!terms) {
        cancel();
      }

      return () => cancel();
    }
  }, [terms, page]);

  return { loading, error, products, hasMore };
}
