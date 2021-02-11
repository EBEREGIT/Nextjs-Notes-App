import Link from "next/link";
import fetch from "isomorphic-unfetch";
import { Button, Card } from "semantic-ui-react";

const Index = ({ notes }) => {
  return (
    <div className="notes-container">
      <h1>Notes</h1>

      <div className="grid wrapper">
        {/* map through the note */}
        {notes.map((note) => {
          return (
            <div key={note._id}>
              {/* each note */}
              <Card>
                {/* note header */}
                <Card.Content>
                  <Card.Header>
                    <Link href={`/${note._id}`}>
                      <a>{note.title}</a>
                    </Link>
                  </Card.Header>
                </Card.Content>

                {/* note links */}
                <Card.Content extra>
                  <Link href={`/${note._id}`}>
                    <Button primary>View</Button>
                  </Link>

                  <Link href={`/${note._id}/edit`}>
                    <Button primary>Edit</Button>
                  </Link>
                </Card.Content>
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// get the notes before the app loads
Index.getInitialProps = async () => {
  const res = await fetch("http://localhost:3000/api/notes");
  const data = await res.json();

  return { notes: data.date };
};

export default Index;
