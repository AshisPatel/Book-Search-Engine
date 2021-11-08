import React from 'react';
import { Jumbotron, Container, CardColumns, Card, Button } from 'react-bootstrap';
import { removeBookId } from '../utils/localStorage';

import { useQuery, useMutation } from "@apollo/client";
import { GET_ME } from "../utils/queries";
import { DELETE_BOOK } from '../utils/mutations';

const SavedBooks = () => {

  // query for the user's information
  const { loading, data } = useQuery(GET_ME);

  // import DELETE_BOOK mutation
  const [deleteBook] = useMutation(DELETE_BOOK);

  // Check to see if the query GET_ME is completed, and if it is access the "me" object from data
  const userData = data?.me || {};
  // create function that accepts the book's mongo _id value as param and deletes the book from the database
  const handleDeleteBook = async (bookId) => {
    try {
      // call removeBook mutation that takes in the bookId parameter 
      await deleteBook({
        variables: {bookId: bookId}
      });

      // upon success, remove book's id from localStorage
      removeBookId(bookId);
    } catch (err) {
      console.error(err);
    }
  };

   // if data isn't here yet, say so
   if (loading) {
    return <h2>LOADING...</h2>;
  }

  // safe guard the /saved route by displaying a generic message when the user is not signed in
  if (!userData?.username) {
    return <h5>You need to be logged in to access your saved books list. Please login or sign-up using the navbar above!</h5>
  } 

 

  return (
    <>
      <Jumbotron fluid className='text-light bg-dark'>
        <Container>
          <h1>Viewing saved books!</h1>
        </Container>
      </Jumbotron>
      <Container>
        <h2>
          {userData.savedBooks.length
            ? `Viewing ${userData.savedBooks.length} saved ${userData.savedBooks.length === 1 ? 'book' : 'books'}:`
            : 'You have no saved books!'}
        </h2>
        <CardColumns>
          {userData.savedBooks.map((book) => {
            return (
              <Card key={book.bookId} border='dark'>
                {book.image ? <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant='top' /> : null}
                <Card.Body>
                  <Card.Title>{book.title}</Card.Title>
                  <p className='small'>Authors: {book.authors}</p>
                  <Card.Text>{book.description}</Card.Text>
                  <Button className='btn-block btn-danger' onClick={() => handleDeleteBook(book.bookId)}>
                    Delete this Book!
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};

export default SavedBooks;
