import { Button, Icon, Table } from "semantic-ui-react";

export function CardTable({ cards }) {
  return (
    <Table compact="very" selectable>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Card number</Table.HeaderCell>
          <Table.HeaderCell>Front</Table.HeaderCell>
          <Table.HeaderCell>Back</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {cards.map((card) => (
          <Table.Row
            key={card.id}
            onClick={() => console.log(card.id)}
            className="hover-pointer"
          >
            <Table.Cell>{card.id}</Table.Cell>
            <Table.Cell>{card.front}</Table.Cell>
            <Table.Cell>{card.back}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>

      <Table.Footer fullWidth>
        <Table.Row>
          <Table.HeaderCell>Total cards: {cards.length}</Table.HeaderCell>
          <Table.HeaderCell colSpan="10" className="add-card-cell">
            {/* <Button
              floated="right"
              icon
              // labelPosition="left"
              primary
              size="small"
            >
              <Icon.Group>
                <Icon name="file" />
                <Icon corner name="add" />
              </Icon.Group>
              <span className="ml-2">Add Card</span>
            </Button> */}
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
    </Table>
  );
}
