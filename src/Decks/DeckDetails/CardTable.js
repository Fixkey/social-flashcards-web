import { Button, Icon, Table } from "semantic-ui-react";

export function CardTable({ cards, onEdit, onDelete }) {
  return (
    <Table compact="very" selectable striped singleLine fixed size="large">
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Id</Table.HeaderCell>
          <Table.HeaderCell>Front</Table.HeaderCell>
          <Table.HeaderCell>Back</Table.HeaderCell>
          <Table.HeaderCell></Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {cards.map((card) => (
          <Table.Row
            key={card.id}
            // onClick={() => console.log(card.id)}
            // className="hover-pointer"
          >
            <Table.Cell title={card.id}>{card.id}</Table.Cell>
            <Table.Cell title={card.front}>{card.front}</Table.Cell>
            <Table.Cell title={card.back}>{card.back}</Table.Cell>
            <Table.Cell textAlign="right">
              <Button onClick={() => onEdit(card)}>EDIT</Button>
              <Button onClick={() => onDelete(card)}>DELETE</Button>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
      <Table.Footer>
        <Table.Row>
          <Table.HeaderCell></Table.HeaderCell>
          <Table.HeaderCell></Table.HeaderCell>
          <Table.HeaderCell></Table.HeaderCell>
          <Table.HeaderCell>
            <Button floated="right">
              <Icon.Group>
                <Icon name="file" />
                <Icon corner name="add" />
              </Icon.Group>{" "}
              Add card
            </Button>
          </Table.HeaderCell>
        </Table.Row>
      </Table.Footer>

      {/* <Table.Footer fullWidth>
        <Table.Row>
          <Table.HeaderCell>Total cards: {cards.length}</Table.HeaderCell>
          <Table.HeaderCell colSpan="10" className="add-card-cell">
            <Button floated="right">
              <Icon.Group>
                <Icon name="file" />
                <Icon corner name="add" />
              </Icon.Group>{" "}
              Add card
            </Button>
          </Table.HeaderCell>
        </Table.Row>
      </Table.Footer> */}
    </Table>
  );
}
