import { useCallback, useEffect, useState } from "react";
import {
  Route,
  Switch,
  useHistory,
  useParams,
  useRouteMatch,
} from "react-router-dom";
import { toast } from "react-toastify";
import { Loader } from "semantic-ui-react";
import {
  createCard,
  deleteCard,
  editCard,
  loadDeckByPermaLink,
} from "../../../utils/apis/deckApi";
import { UPDATED_SUCCESSFULLY } from "../../../utils/strings";
import { CardTable } from "./CardTable";
import { DeckHeader } from "./DeckHeader";
import { EditCard } from "./EditCard";

export function DeckDetails() {
  const {
    deck,
    handleDelete,
    selectedCard,
    handleEdit,
    path,
    updateCard,
    reviewDeck,
  } = useHooks();

  if (!deck) return <Loader active inline="centered" />;

  return (
    <Switch>
      <Route exact path={path}>
        <DeckHeader name={deck.name} reviewDeck={reviewDeck} />
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
      if (!newDeck.error) {
        setDeck(newDeck.data);
      } else {
        toast.error("Error " + newDeck.message);
      }
    });
  }, []);

  useEffect(() => {
    refreshDeck(permaLink);
  }, [permaLink, refreshDeck]);

  const handleDelete = useCallback(
    (card) => {
      deleteCard(deck.id, card.id).then((response) => {
        if (!response.error) {
          refreshDeck(deck.permaLink);
          toast.success(`Card id ${card.id} (${card.front}) is deleted.`);
        } else {
          toast.error("Error " + response.message);
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
        }).then((response) => {
          if (!response.error) {
            const { data: deck } = response;
            setDeck(deck);
            toast.success("CREATED");
            setSelectedCard(deck.cards[deck.cards.length - 1]);
          } else {
            toast.error("Error " + response.message);
          }
        });
      } else {
        editCard(deck.id, {
          ...selectedCard,
          front: newFront,
          back: newBack,
        }).then((response) => {
          // error
          if (!response.error) {
            setDeck(response.data);
            toast.success(UPDATED_SUCCESSFULLY);
          } else {
            toast.error("Error " + response.message);
          }
        });
      }
    },
    [selectedCard, deck]
  );

  const reviewDeck = useCallback(() => {
    history.push(`/review/${deck.permaLink}`);
  }, [deck, history]);

  return {
    deck,
    handleDelete,
    selectedCard,
    handleEdit,
    path,
    updateCard,
    reviewDeck,
  };
}
