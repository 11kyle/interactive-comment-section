"use client"

import { useEffect, useRef, useState } from 'react'
import Card from './Card'
import Avatar from './Avatar'
import Counter from './Counter'
import { ArrowUturnLeftIcon } from "@heroicons/react/20/solid"
import Badge from './Badge'
import Button from './Button'
import Modal from './Modal'
import NewForm from './NewForm'
import EditForm from './EditForm'

const fetchedData = [
  {
    id: 1,
    author: 'amyrobson',
    body: 'Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You’ve nailed the design and the responsiveness at various breakpoints works really well.',
    replies: [],
    votes: 12,
  },
  {
    id: 2,
    author: 'maxblagun',
    body: 'Woah, your project looks awesome! How long have you been coding for? I’m still new, but think I want to dive into React as well soon. Perhaps you can give me an insight on where I can learn React? Thanks!',
    replies: [
      {
        id: 3,
        author: 'ramsesmiron',
        body: 'If you’re still new, I’d recommend focusing on the fundamentals of HTML, CSS, and JS before considering React. It’s very tempting to jump ahead but lay a solid foundation first.',
        replyTo: 'maxblagun',
        votes: 4,
      },
      {
        id: 4,
        author: 'juliusomo',
        body: 'I couldn’t agree more with this. Everything moves so fast and it always seems like everyone knows the newest library/framework. But the fundamentals are what stay constant.',
        replyTo: 'ramsesmiron',
        votes: 2,
      },
    ],
    votes: 5,
  },
]

const currentUser = 'juliusomo'
let nextId = 5

export default function Comments() {
  const [open, setOpen] = useState(false)
  const [comments, setComments] = useState(null)
  const [currentComment, setCurrentComment] = useState(null)
  const [isEditing, setIsEditing] = useState(false)

  const deleteRef = useRef(null)

  useEffect(() => {
    setComments(fetchedData)
  },[])

  const openModal = (index) => {
    // save index to ref for use in deleteCommentBy
    deleteRef.current = index
    setOpen(true)
  }

  const deleteCommentBy = (index) => {
    for (let i = 0; i < comments.length; i++) {
      // check if first level id is not equal to deleteRef.current
      if (comments[i].id !== deleteRef.current) {
        // check if comment.replies is an array
        if (Array.isArray(comments[i].replies)) {
          // check if replies id is equal to deleteRef
          for (let j = 0; j < comments[i].replies.length; j++) {
            if (comments[i].replies[j].id === deleteRef.current) {
              // delete reply
              let newState = comments
              let replies = comments[i].replies.filter(
                reply => reply.id !== deleteRef.current
              )
              newState[i].replies = replies

              setComments([...newState])
            }
          }
        }
      } else {
        // delete comment
        setComments(prevComments => prevComments.filter(comment => comment.id !== deleteRef.current))
      }
    }
    // close modal
    setOpen(false)
  }

  const replyTo = (comment) => {
    // scroll to textarea
    // document.getElementById('textarea').scrollIntoView()
    // pull cursor in textarea
    // document.getElementById('comment').focus()


    setCurrentComment(comment)
  }

  const addComment = (text) => {
    // new comment
    let newComment = {
      id: nextId,
      author: currentUser,
      body: text,
      replies: [],
      votes: 0,
    }

    // make sure isEditing is false to prevent error
    setIsEditing(false)

    // check if ref.current is null
    if (!currentComment) {
      setComments([...comments, newComment])
    } else {
      // new reply
      let newReply = {
        id: nextId,
        author: currentUser,
        body: text,
        replyTo: currentComment.author,
        votes: 0,
      }

      for (let i = 0; i < comments.length; i++) {
        // check if first level id is not equal to index
        if (comments[i].id !== currentComment.id) {
          // check if comment.replies is an array
          if (Array.isArray(comments[i].replies)) {
            // check if replies id is equal to index
            for (let j = 0; j < comments[i].replies.length; j++) {
              if (comments[i].replies[j].id === currentComment.id) {
                // add reply
                let newState = comments
                newState[i].replies.push(newReply)

                setComments([...newState])
              }
            }
          }
        } else {
          // add reply
          let newState = comments
          newState[i].replies.push(newReply)

          setComments([...newState])
        }
      }
    }
  
    // increase id
    nextId++

    // clear currentComment so textarea hides
    setCurrentComment(null)
  }

  const editComment = (comment) => {
    // 
    setCurrentComment(comment)
    
    // editing
    setIsEditing(true)
  }

  const updateComment = (text) => {
    // update comment with new body text
    let newComment = {...currentComment, body: text}

    for (let i = 0; i < comments.length; i++) {
      // check if first level id is not equal to index
      if (comments[i].id !== currentComment.id) {
        // check if comment.replies is an array
        if (Array.isArray(comments[i].replies)) {
          // check if replies id is equal to index
          for (let j = 0; j < comments[i].replies.length; j++) {
            if (comments[i].replies[j].id === currentComment.id) {
              // add reply
              let newState = comments
              newState[i].replies[j] = newComment

              setComments([...newState])
            }
          }
        }
      } else {
        // update reply
        let newState = comments
        newState[i] = newComment

        setComments([...newState])
      }
    }

    // set isEditing to false
    setIsEditing(false)
    // clear currentComment so textarea hides
    setCurrentComment(null)
  }

  return (
    <section aria-label="comments">
      {!comments 
        ? <Card>
            <h3 className="heading-md">Loading comments...</h3>
          </Card>
        :
      <>
      {comments.map(comment => (
        <div key={comment.id}>
          <Card>
            <div className="md:flex md:gap-6">
              {/* Tablet */}
              <div className="hidden md:block">
                <Counter count={comment.votes} />
              </div>
              <article className="w-full">
                <div className="w-full inline-flex items-center flex-wrap">
                  <Avatar />
                  <div className="inline-flex items-center gap-2">
                    <h4 className="text-dark-blue heading-md ml-4">{comment.author}</h4>
                    {currentUser === comment.author && <Badge />}
                  </div>
                  <span className="text-grayish-blue body-md ml-4">1 month ago</span>
                  {currentUser === comment.author
                    ? <div className="hidden md:inline-flex items-center gap-4 md:ml-auto">
                        <Button onClick={() => openModal(comment.id)} variant="delete" icon="delete">Trash</Button>
                        <Button onClick={() => editComment(comment)} variant="edit" icon="edit">Edit</Button>
                      </div>
                    : <button 
                        className="hidden md:inline-flex justify-center items-center gap-2 text-moderate-blue body-md font-bold hover:text-light-grayish-blue md:ml-auto"
                        onClick={() => replyTo(comment)}
                      >
                        <ArrowUturnLeftIcon className="h-5 w-5" aria-hidden="true" />
                        Reply
                      </button>
                  }
                </div>
                {isEditing && currentComment.id === comment.id
                  ? <EditForm text={comment.body} updateComment={updateComment} />
                  : <p className="text-grayish-blue body-md py-4">{comment.body}</p>
                }
              </article>
              {/* Mobile */}
              <div className="md:hidden w-full inline-flex justify-between items-center gap-y-4 flex-wrap">
                <Counter count={comment.votes} />
                {currentUser === comment.author
                  ? <div className="inline-flex items-center gap-4">
                      <Button onClick={() => openModal(comment.id)} variant="delete" icon="delete">Trash</Button>
                      <Button onClick={() => editComment(comment)} variant="edit" icon="edit">Edit</Button>
                    </div>
                  : <button 
                      className="inline-flex justify-center items-center gap-2 text-moderate-blue body-md font-bold"
                      onClick={() => replyTo(comment)}
                    >
                      <ArrowUturnLeftIcon className="h-5 w-5" aria-hidden="true" />
                      Reply
                    </button>
                }
              </div>
            </div>
          </Card>
          {currentComment?.id === comment.id && !isEditing
            ? <Card>
                <NewForm addComment={addComment} />
              </Card>
            : <></>
          }

          {/* Replies */}
          <div className="ml-4 border-l-2 border-light-gray md:ml-[52px] md:pl-5">
          {comment.replies?.map(reply => (
            <div key={reply.id}>
              <Card>
                <div className="md:flex md:gap-6">
                  {/* Tablet */}
                  <div className="hidden md:block">
                    <Counter count={reply.votes} />
                  </div>
                  <article className="w-full">
                    <div className="w-full inline-flex items-center flex-wrap">
                      <Avatar />
                      <div className="inline-flex items-center gap-2">
                        <h4 className="text-dark-blue heading-md ml-4">{reply.author}</h4>
                        {currentUser === reply.author && <Badge />}
                      </div>
                      <span className="text-grayish-blue body-md ml-4">1 week ago</span>
                      {currentUser === reply.author
                        ? <div className="hidden md:inline-flex items-center gap-4 md:ml-auto">
                            <Button onClick={() => openModal(reply.id)} variant="delete" icon="delete">Trash</Button>
                            <Button onClick={() => editComment(reply)} variant="edit" icon="edit">Edit</Button>
                          </div>
                        : <button 
                            className="hidden md:inline-flex justify-center items-center gap-2 text-moderate-blue body-md font-bold md:ml-auto"
                            onClick={() => replyTo(reply)}  
                          >
                            <ArrowUturnLeftIcon className="h-5 w-5" aria-hidden="true" />
                            Reply
                          </button>
                      }
                    </div>
                    {isEditing && currentComment.id === reply.id
                      ? <EditForm text={reply.body} updateComment={updateComment} />
                      : <p className="text-grayish-blue body-md py-4"><span className="text-moderate-blue font-medium">@{reply.replyTo}</span> {reply.body}</p>
                    }
                  </article>
                  {/* Mobile */}
                  <div className="md:hidden w-full inline-flex justify-between items-center gap-y-4 flex-wrap">
                    <Counter count={reply.votes} />
                    {currentUser === reply.author
                      ? <div className="inline-flex items-center gap-4">
                          <Button onClick={() => openModal(reply.id)} variant="delete" icon="delete">Trash</Button>
                          <Button onClick={() => editComment(reply)} variant="edit" icon="edit">Edit</Button>
                        </div>
                      : <button 
                          className="inline-flex justify-center items-center gap-2 text-moderate-blue body-md font-bold"
                          onClick={() => replyTo(reply)}
                        >
                          <ArrowUturnLeftIcon className="h-5 w-5" aria-hidden="true" />
                          Reply
                        </button>
                    }
                  </div>
                </div>
              </Card>
              {currentComment?.id === reply.id && !isEditing
                ? <Card>
                    <NewForm addComment={addComment} />
                  </Card>
                : <></>
              }
            </div>
          ))}
          </div>
        </div>
      ))}

      {/* Add a comment */}
      <Card>
        <NewForm addComment={addComment} />
      </Card>

      {/* Modal */}
      <Modal 
        open={open} 
        setOpen={setOpen}
        deleteCommentBy={deleteCommentBy}
      />
      </>}
    </section>
  )
}
