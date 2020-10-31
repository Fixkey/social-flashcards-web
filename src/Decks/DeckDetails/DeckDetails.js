import { useCallback, useEffect, useState } from "react";
import {
  Route,
  Switch,
  useHistory,
  useParams,
  useRouteMatch,
} from "react-router-dom";
import { toast } from "react-toastify";
import { Header, Icon, Loader } from "semantic-ui-react";
import { deleteCard, editCard, loadDeckByPermaLink } from "../../utils/apis";
import { CardTable } from "./CardTable";
import { EditCard } from "./EditCard";

export function DeckDetails() {
  const {
    deck,
    handleDelete,
    selectedCard,
    setSelectedCard,
    handleEdit,
    path,
    updateCard,
  } = useHooks();

  if (!deck) return <Loader active inline="centered" />;

  return (
    <Switch>
      <Route exact path={path}>
        <Header as="h3" icon textAlign="center">
          <Icon name="folder" circular />
          <Header.Content>{deck.name}</Header.Content>
        </Header>
        <CardTable
          cards={deck.cards}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      </Route>
      <Route paath={`${path}/edit`}>
        <EditCard
          deck={deck}
          selectedCard={selectedCard}
          handleDelete={handleDelete}
          editCard={updateCard}
        />
      </Route>
    </Switch>
  );
}

function useHooks() {
  const [deck, setDeck] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const { permaLink } = useParams();
  const { path, url } = useRouteMatch();
  const history = useHistory();

  const refreshDeck = useCallback((permaLink) => {
    loadDeckByPermaLink(permaLink).then((newDeck) => {
      setDeck(newDeck);
    });
  }, []);

  useEffect(() => {
    refreshDeck(permaLink);
  }, [permaLink, refreshDeck]);

  const handleDelete = useCallback(
    (card) => {
      deleteCard(deck.id, card.id).then((ok) => {
        if (ok) {
          console.log(card);
          refreshDeck(deck.permaLink);
          toast.success(`Card id ${card.id} (${card.front}) is deleted.`);
        }
      });
    },
    [deck, refreshDeck]
  );

  const handleEdit = useCallback(
    (card) => {
      setSelectedCard(card);
      history.push(url + "/edit");
    },
    [history, url]
  );

  const updateCard = useCallback(
    (newFront, newBack) => {
      console.log(selectedCard);
      editCard(deck.id, {
        ...selectedCard,
        front: newFront,
        back: newBack,
      }).then(({ card, error }) => {
        // error
        refreshDeck(permaLink);
      });
    },
    [selectedCard, permaLink, deck, refreshDeck]
  );

  return {
    deck,
    handleDelete,
    selectedCard,
    setSelectedCard,
    handleEdit,
    path,
    updateCard,
  };
}
