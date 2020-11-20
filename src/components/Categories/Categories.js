import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { Loader } from "semantic-ui-react";
import { fetchCategories } from "../../utils/apis/subjectApi";

function Category({ category }) {
  const history = useHistory();
  return (
    <li
      onClick={() => history.push(`/categories/${category}`)}
      className="category"
    >
      <p>{category}</p>
    </li>
  );
}

export function Categories() {
  const [categories, setCategories] = useState();

  useEffect(() => {
    fetchCategories().then((response) => {
      if (response.error) {
        toast.error("Error " + response.message);
      } else {
        setCategories(response.data);
      }
    });
  }, []);

  if (!categories) return <Loader active inline="centered" />;
  return (
    <ul className="categories">
      {categories.map((cat) => (
        <Category key={cat} category={cat} />
      ))}
    </ul>
  );
}
