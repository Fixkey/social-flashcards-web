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
import {
  createCard,
  deleteCard,
  editCard,
  loadDeckByPermaLink,
} from "../../utils/apis";
import { UPDATED_SUCCESSFULLY } from "../../utils/strings";
import { CardTable } from "./CardTable";
import { EditCard } from "./EditCard";

export function DeckDetails() {
  const {
    deck,
    handleDelete,
    selectedCard,
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
      <Route path={`${path}/edit`}>
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
      if (!selectedCard) {
        createCard(deck.id, {
          front: newFront,
          back: newBack,
        }).then(({ deck: newDeck, error }) => {
          // error
          if (!error) {
            setDeck(newDeck);
            toast.success("CREATED");
            setSelectedCard(newDeck.cards[newDeck.cards.length - 1]);
          } else {
            toast.error(error);
          }
        });
      } else {
        editCard(deck.id, {
          ...selectedCard,
          front: newFront,
          back: newBack,
        }).then(({ deck: newDeck, error }) => {
          // error
          if (!error) {
            setDeck(newDeck);
            toast.success(UPDATED_SUCCESSFULLY);
          } else {
            toast.error(error);
          }
        });
      }
    },
    [selectedCard, deck]
  );

  return {
    deck,
    handleDelete,
    selectedCard,
    handleEdit,
    path,
    updateCard,
  };
}
