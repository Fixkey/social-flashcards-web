import { useCallback, useContext, useEffect, useState } from "react";
import {
  Route,
  Switch,
  useHistory,
  useLocation,
  useParams,
  useRouteMatch,
} from "react-router-dom";
import { toast } from "react-toastify";
import { Loader } from "semantic-ui-react";
import {
  createCard,
  deleteCard,
  deleteDeck,
  editCard,
  loadDeckByPermaLink,
} from "../../../utils/apis/deckApi";
import { UPDATED_SUCCESSFULLY } from "../../../utils/strings";
import { CardTable } from "./CardTable";
import { DeckHeader } from "./DeckHeader";
import { EditCard } from "./EditCard";
import { UserContext } from "../../user/UserContext";
import { isOwner } from "../../../utils/helpers";

export function DeckDetails() {
  const {
    deck,
    handleDelete,
    selectedCard,
    handleEdit,
    path,
    updateCard,
    reviewDeck,
    deckOwner,
    removeDeck,
    shareLink,
    setDeck,
  } = useHooks();

  if (!deck) return <Loader active inline="centered" />;

  return (
    <Switch>
      <Route exact path={path}>
        <DeckHeader
          deck={deck}
          name={deck.name}
          privateDeck={deck.privateDeck}
          reviewDeck={reviewDeck}
          readOnly={!deckOwner}
          removeDeck={removeDeck}
          shareLink={shareLink}
          setDeck={setDeck}
        />
        <CardTable
          cards={deck.cards}
          onDelete={handleDelete}
          onEdit={handleEdit}
          readOnly={!deckOwner}
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
  const [user] = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();

  const deckOwner = isOwner(user, deck);

  const refreshDeck = useCallback(
    (permaLink) => {
      loadDeckByPermaLink(permaLink + location.search).then((newDeck) => {
        if (!newDeck.error) {
          setDeck(newDeck.data);
        } else {
          toast.error("Error " + newDeck.message);
          history.push("/decks");
        }
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [history, user, location]
  );

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
      if (newFront === "") {
        toast.error("Front cant be empty");
        return;
      }

      if (!selectedCard) {
        createCard(deck.id, {
          front: newFront,
          back: newBack,
        }).then((response) => {
          if (!response.error) {
            const { data: deck } = response;
            setDeck(deck);
            toast.success("CREATED");
            setSelectedCard({});
            setSelectedCard(null);
            // setSelectedCard(deck.cards[deck.cards.length - 1]);
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
    history.push(`/review/${deck.permaLink + location.search}`);
  }, [deck, history, location]);

  const removeDeck = useCallback(() => {
    deleteDeck(deck.id).then((res) => {
      if (res.error) {
        toast.error("Error " + res.message);
      } else {
        history.push("/decks");
        toast.success(`Deck ${deck.name} is deleted.`);
      }
    });
  }, [deck, history]);

  const shareLink = deck?.privateDeck
    ? `${document.URL.split("?")[0]}?secret=${deck?.secret}`
    : document.URL;

  return {
    deck,
    handleDelete,
    selectedCard,
    handleEdit,
    path,
    updateCard,
    reviewDeck,
    deckOwner,
    removeDeck,
    shareLink,
    setDeck,
  };
}
