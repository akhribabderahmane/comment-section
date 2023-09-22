import React from 'react'
import CommentsList from './components/CommentsList';
import AddCommentForm from './components/AddCommentForm'
function App() {
  return (
    <div className="App">
       <main className=' flex flex-col items-center bg-[#f5f6fa]  min-h-screen py-6'>
       <CommentsList></CommentsList>
       <AddCommentForm></AddCommentForm>
       </main>
    </div>
  );
}
export default App;
