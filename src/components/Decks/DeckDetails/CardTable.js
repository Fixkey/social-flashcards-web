/* eslint-disable jsx-a11y/anchor-is-valid */
import { Button, Icon, Table } from "semantic-ui-react";

export function CardTable({ cards, onEdit, onDelete, readOnly }) {
  return (
    <Table compact="very" selectable striped singleLine fixed size="large">
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Id</Table.HeaderCell>
          <Table.HeaderCell>Front</Table.HeaderCell>
          <Table.HeaderCell>Back</Table.HeaderCell>
          {!readOnly && <Table.HeaderCell></Table.HeaderCell>}
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {cards.map((card) => (
          <Table.Row key={card.id}>
            <Table.Cell title={card.id}>{card.id}</Table.Cell>
            <Table.Cell title={card.front}>{card.front}</Table.Cell>
            <Table.Cell title={card.back}>{card.back}</Table.Cell>
            {!readOnly && (
              <Table.Cell textAlign="right">
                <a className="hover-pointer" onClick={() => onEdit(card)}>
                  EDIT
                </a>
                <a
                  onClick={() => onDelete(card)}
                  className="ml-05 hover-pointer"
                >
                  DELETE
                </a>
              </Table.Cell>
            )}
          </Table.Row>
        ))}
      </Table.Body>

      {!readOnly && (
        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell></Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
            <Table.HeaderCell>
              <Button floated="right" onClick={() => onEdit()}>
                <Icon.Group>
                  <Icon name="file" />
                  <Icon corner name="add" />
                </Icon.Group>{" "}
                Add card
              </Button>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      )}
    </Table>
  );
}
