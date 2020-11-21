import { useEffect, useState } from "react";
import {
  Route,
  Switch,
  useHistory,
  useParams,
  useRouteMatch,
} from "react-router-dom";
import { toast } from "react-toastify";
import { Header, Loader } from "semantic-ui-react";
import { fetchSubjects } from "../../utils/apis/subjectApi";
import { SubjectDecks } from "./SubjectDecks";

function Subject({ subject }) {
  const history = useHistory();
  return (
    <li
      onClick={() =>
        history.push(`/categories/${subject.category}/${subject.id}`)
      }
      className="category subject"
    >
      <p>{subject.name}</p>
    </li>
  );
}

export function Subjects() {
  const { category } = useParams();
  const [subjects, setSubjects] = useState(null);
  const { path } = useRouteMatch();

  useEffect(() => {
    fetchSubjects(category).then((response) => {
      if (response.error) {
        toast.error("Error " + response.message);
      } else {
        setSubjects(response.data.sort((a, b) => (a.name > b.name ? 1 : -1)));
      }
    });
  }, [category]);

  if (!subjects) return <Loader active inline="centered" />;

  return (
    <div>
      <Switch>
        <Route exact path={path}>
          <Header as="h2" textAlign="center" className="capitalize">
            {category}
          </Header>
          <ul className="categories">
            {subjects.map((sub) => (
              <Subject key={sub.id} subject={sub} />
            ))}
          </ul>
        </Route>
        <Route path={`${path}/:subjectId`}>
          <SubjectDecks />
        </Route>
      </Switch>
    </div>
  );
}
